import { withAuth } from "next-auth/middleware"

// This middleware protects our admin routes. 
// If someone tries to visit /admin/... and isn't logged in, they are redirected to /admin/login
export default withAuth({
  pages: {
    signIn: '/admin/login',
  },
})

// Specify which routes should be protected by the middleware
export const config = { 
  matcher: ["/admin/:path*"] 
}
