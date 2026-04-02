'use client'
export const dynamic = 'force-dynamic'
import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import Logo from '@/components/Logo'

export default function StudentLogin() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const { error: otpError } = await supabase.auth.signInWithOtp({ email })
    if (otpError) { setError(otpError.message); setLoading(false); return }
    router.push(`/auth/verify?email=${encodeURIComponent(email)}&role=student`)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8"><Logo href="/" size="md" /></div>
        <div className="card p-8">
          <h1 className="font-display text-2xl font-bold text-black mb-1">Student sign in</h1>
          <p className="text-gray-500 text-sm mb-6">We'll send a verification code to your email.</p>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="label">Email address</label>
              <input type="email" className="input-field" placeholder="you@email.com" required value={email} onChange={e=>setEmail(e.target.value)}/>
            </div>
            {error && <p className="text-red-500 text-xs">{error}</p>}
            <button type="submit" disabled={loading} className="btn-primary w-full py-3">
              {loading ? 'Sending code...' : 'Send Verification Code'}
            </button>
          </form>
          <p className="text-center text-sm text-gray-500 mt-4">Don't have an account?{' '}<Link href="/auth/student/signup" className="text-black font-semibold hover:underline">Sign up free</Link></p>
        </div>
        <p className="text-center text-sm text-gray-400 mt-4">
          <Link href="/auth/employer/login" className="hover:text-black">Employer</Link>{' · '}
          <Link href="/auth/college/login" className="hover:text-black">College</Link>
        </p>
      </div>
    </div>
  )
}
