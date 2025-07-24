# Mini-Blog

A full-stack blogging platform built with Next.js, TypeScript, MongoDB, and NextAuth. Users can sign up, sign in, create, edit, and delete blog posts. The app features authentication, a dashboard for managing posts, and a modern UI.

## Features

- User authentication (sign up, sign in, sign out) with NextAuth
- Create, read, update, and delete (CRUD) blog posts
- Dashboard to manage your posts
- Responsive, modern UI with Tailwind CSS
- MongoDB for data storage (via Mongoose)
- Toast notifications for user feedback

## Tech Stack

- [Next.js](https://nextjs.org/) 15+
- [React](https://react.dev/) 19+
- [TypeScript](https://www.typescriptlang.org/)
- [MongoDB](https://www.mongodb.com/) & [Mongoose](https://mongoosejs.com/)
- [NextAuth.js](https://next-auth.js.org/) for authentication
- [Tailwind CSS](https://tailwindcss.com/)
- [Sonner](https://sonner.emilkowal.ski/) for notifications

## Getting Started

### Prerequisites
- Node.js 18+
- MongoDB instance (local or cloud)

### Installation

1. **Clone the repository:**
   ```bash
   git clone <repo-url>
   cd mini-blog
   ```
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Configure environment variables:**
   - Create a `.env.local` file in the root directory.
   - Add the following variables:
     ```env
     MONGODB_URI=your_mongodb_connection_string
     NEXTAUTH_SECRET=your_nextauth_secret
     NEXTAUTH_URL=http://localhost:3000
     ```
4. **Run the development server:**
   ```bash
   npm run dev
   ```
   The app will be available at [http://localhost:3000](http://localhost:3000).

## Usage

- **Home Page:** View all blog posts.
- **Sign Up / Sign In:** Register or log in to your account.
- **Dashboard:** Manage your posts (create, edit, delete).
- **Create Post:** Add a new blog post from the dashboard.
- **Edit/Delete:** Update or remove your posts from the dashboard.

## Folder Structure

```
mini-blog/
├── lib/            # Database and auth config
├── models/         # Mongoose models (User, Post)
├── src/
│   └── app/
│       ├── api/    # API routes (Next.js Route Handlers)
│       ├── components/ # Reusable UI components
│       ├── dashboard/  # Dashboard pages
│       ├── editPost/   # Edit post pages
│       ├── signin/     # Sign in page
│       ├── signup/     # Sign up page
│       └── ...         # Other pages and utilities
├── public/         # Static assets
├── types/          # TypeScript type definitions
├── package.json    # Project metadata and scripts
└── README.md       # Project documentation
```

## Scripts

- `npm run dev` — Start the development server
- `npm run build` — Build for production
- `npm start` — Start the production server
- `npm run lint` — Run ESLint

## License

This project is licensed under the MIT License.
