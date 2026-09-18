'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'

export default function AdminLogin() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const res = await signIn('credentials', {
      redirect: false,
      username,
      password
    })

    if (res?.error) {
      setError('Invalid credentials')
      setLoading(false)
    } else {
      router.push('/admin') // Redirect to dashboard on success
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: 'var(--paper)', color: 'var(--ink)' }}>
      <div className="max-w-md w-full p-8 rounded-2xl border" style={{ borderColor: 'rgba(0,0,0,0.1)' }}>
        <h1 className="text-3xl font-bold mb-2">Command Center</h1>
        <p className="opacity-60 mb-8">Restricted access.</p>
        
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          {error && (
            <div className="p-3 text-sm text-red-700 bg-red-100 rounded-lg">
              {error}
            </div>
          )}
          
          <div className="flex flex-col gap-2">
            <label htmlFor="username" className="text-sm font-medium opacity-80">Username</label>
            <input 
              id="username"
              type="text" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="p-3 rounded-lg border outline-none focus:ring-2"
              style={{ borderColor: 'rgba(0,0,0,0.1)', backgroundColor: 'transparent' }}
              required
            />
          </div>
          
          <div className="flex flex-col gap-2">
            <label htmlFor="password" className="text-sm font-medium opacity-80">Password</label>
            <input 
              id="password"
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="p-3 rounded-lg border outline-none focus:ring-2"
              style={{ borderColor: 'rgba(0,0,0,0.1)', backgroundColor: 'transparent' }}
              required
            />
          </div>
          
          <button 
            type="submit" 
            disabled={loading} 
            className="mt-4 p-4 rounded-xl text-white font-bold tracking-wide transition-opacity hover:opacity-90 disabled:opacity-50"
            style={{ backgroundColor: 'var(--ink)' }}
          >
            {loading ? 'Authenticating...' : 'Enter Dashboard'}
          </button>
        </form>
      </div>
    </div>
  )
}
