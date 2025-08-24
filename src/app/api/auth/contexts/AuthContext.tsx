// api/auth/contexts/AuthContext.tsx
'use client'
import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

interface User {
  email: string
}

interface AuthContextType {
  user: User | null
  isLoggedIn: boolean
  login: (userData: User) => void
  logout: () => void
  loading: boolean
  checkAuthStatus: () => Promise<void> // ✅ Added this function
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  const isLoggedIn = !!user

  // Check if user is logged in on mount
  useEffect(() => {
    checkAuthStatus()
  }, [])

  const checkAuthStatus = async () => {
    try {
      setLoading(true) // ✅ Set loading when checking
      
      const response = await fetch('/api/auth/verify', {
        method: 'GET',
        credentials: 'include',
      })

      if (response.ok) {
        const data = await response.json()
        setUser({ email: data.email })
        console.log('Auth status: Logged in as', data.email) // Debug log
      } else {
        setUser(null)
        console.log('Auth status: Not logged in') // Debug log
      }
    } catch (error) {
      console.error('Auth check failed:', error)
      setUser(null)
    } finally {
      setLoading(false)
    }
  }

  // login function
  const login = (userData: User) => {
    setUser(userData)
    console.log('User logged in:', userData.email) // Debug log
  }

  // logout function
  const logout = async () => {
    try {
      setLoading(true)
      
      await fetch('/api/auth/logout', {
        method: 'POST',
        credentials: 'include',
      })
    } catch (error) {
      console.error('Logout failed:', error)
    } finally {
      setUser(null)
      setLoading(false)
      window.location.href = '/'
    }
  }


  return (
    <AuthContext.Provider value={{ 
      user, 
      isLoggedIn, 
      login, 
      logout, 
      loading, 
      checkAuthStatus // ✅ Expose this function
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
