import { getServerSession } from "next-auth/next"
import { redirect } from "next/navigation"

export default async function AdminDashboard() {
  // Verify session on the server side just in case
  const session = await getServerSession()
  
  if (!session) {
    redirect('/admin/login')
  }

  return (
    <div className="min-h-screen p-8 md:p-16" style={{ backgroundColor: 'var(--paper)', color: 'var(--ink)' }}>
      <header className="flex justify-between items-center mb-12 pb-6 border-b" style={{ borderColor: 'rgba(0,0,0,0.1)' }}>
        <h1 className="text-4xl font-bold">Admin Dashboard</h1>
        <div className="flex items-center gap-4">
          <span className="opacity-60 text-sm">Logged in as {process.env.ADMIN_USERNAME}</span>
          <a href="/api/auth/signout" className="text-sm font-medium underline">Sign Out</a>
        </div>
      </header>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="col-span-2">
          <h2 className="text-2xl font-semibold mb-6">Your Projects</h2>
          <div className="p-12 text-center border border-dashed rounded-2xl" style={{ borderColor: 'rgba(0,0,0,0.2)' }}>
            <p className="opacity-60">Projects will be loaded from MongoDB here.</p>
          </div>
        </div>
        
        <div>
          <h2 className="text-2xl font-semibold mb-6">Quick Actions</h2>
          <button 
            className="w-full p-4 rounded-xl text-white font-bold transition-opacity hover:opacity-90 mb-4"
            style={{ backgroundColor: 'var(--ink)' }}
          >
            + Create New Project
          </button>
          <a 
            href="/" 
            target="_blank"
            className="w-full block text-center p-4 rounded-xl font-bold transition-opacity hover:opacity-80 border"
            style={{ borderColor: 'var(--ink)' }}
          >
            View Live Site ↗
          </a>
        </div>
      </div>
    </div>
  )
}
