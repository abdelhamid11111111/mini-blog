
// utils/jwt.ts - Updated to use Web Crypto API while keeping your function names
import * as Cookie from 'cookie';

export interface JwtPayload {
    email: string;
    password: string;
    iat?: number;
    exp?: number;
}

// Helper functions for base64url encoding/decoding
function base64urlEscape(str: string) {
    return str.replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
}

function base64urlUnescape(str: string) {
    str += new Array(5 - (str.length % 4)).join('=');
    return str.replace(/\-/g, '+').replace(/_/g, '/');
}

// Extract token from cookie (UNCHANGED - keeping your exact function)
export function parseAuthCookie(cookieHeader: string | null | undefined): string | null {
    if (!cookieHeader) {
        return null
    }

    const cookies = Cookie.parse(cookieHeader)
    return cookies.authToken || null
}

// Verify and decode token (UPDATED to use Web Crypto API but keeping your function name)
export async function verifyJwt(token: string): Promise<JwtPayload | null> {
    try {
        const parts = token.split('.');
        if (parts.length !== 3) {
            return null;
        }

        const [encodedHeader, encodedPayload, encodedSignature] = parts;
        
        // Verify signature using Web Crypto API
        const data = `${encodedHeader}.${encodedPayload}`;
        const key = await crypto.subtle.importKey(
            'raw',
            new TextEncoder().encode(process.env.JWT_SECRET!),
            { name: 'HMAC', hash: 'SHA-256' },
            false,
            ['verify']
        );

        const signature = new Uint8Array(
            atob(base64urlUnescape(encodedSignature))
                .split('')
                .map(char => char.charCodeAt(0))
        );

        const isValid = await crypto.subtle.verify(
            'HMAC',
            key,
            signature,
            new TextEncoder().encode(data)
        );

        if (!isValid) {
            return null;
        }

        // Decode payload
        const payload = JSON.parse(atob(base64urlUnescape(encodedPayload))) as JwtPayload;
        
        // Check expiration
        if (payload.exp && payload.exp < Math.floor(Date.now() / 1000)) {
            return null;
        }

        return payload;
    } catch (error) {
        // Log any verification errors for debugging
        console.error('JWT verification failed:', error);
        // Return null if verification fails
        return null;
    }
}

// Create JWT using Web Crypto API (NEW function for creating tokens)
export async function createJwt(payload: Omit<JwtPayload, 'iat' | 'exp'>): Promise<string> {
    const header = {
        alg: 'HS256',
        typ: 'JWT'
    };

    const now = Math.floor(Date.now() / 1000);
    const jwtPayload = {
        ...payload,
        iat: now,
        exp: now + (24 * 60 * 60) // 24 hours
    };

    const encodedHeader = base64urlEscape(btoa(JSON.stringify(header)));
    const encodedPayload = base64urlEscape(btoa(JSON.stringify(jwtPayload)));
    
    const data = `${encodedHeader}.${encodedPayload}`;
    
    const key = await crypto.subtle.importKey(
        'raw',
        new TextEncoder().encode(process.env.JWT_SECRET!),
        { name: 'HMAC', hash: 'SHA-256' },
        false,
        ['sign']
    );

    const signature = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(data));
    const encodedSignature = base64urlEscape(btoa(String.fromCharCode(...new Uint8Array(signature))));

    return `${data}.${encodedSignature}`;
}

// Updated middleware that works with your existing function names
// src/middleware.ts
