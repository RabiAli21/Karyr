'use client'
export const dynamic = 'force-dynamic'
import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import Logo from '@/components/Logo'

export default function CollegeLogin() {
  const router = useRouter()
  const [form, setForm] = useState({ name:'', college:'', email:'' })
  const set = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }))
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    const { error: otpError } = await supabase.auth.signInWithOtp({
      email: form.email,
      options: { data: { name: form.name, role: 'college', college: form.college }, shouldCreateUser: true }
    })
    if (otpError) { setError(otpError.message); setLoading(false); return }
    router.push(`/auth/verify?email=${encodeURIComponent(form.email)}&role=college&name=${encodeURIComponent(form.name)}&college=${encodeURIComponent(form.college)}`)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8"><Logo href="/" size="md"/></div>
        <div className="card p-8">
          <h1 className="font-display text-2xl font-bold text-black mb-1">College admin sign in</h1>
          <p className="text-gray-500 text-sm mb-6">We'll verify your email with a one-time code.</p>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div><label className="label">Your name</label><input className="input-field" placeholder="Admin name" required value={form.name} onChange={e=>set('name',e.target.value)}/></div>
            <div><label className="label">College name</label><input className="input-field" placeholder="Your college / university" required value={form.college} onChange={e=>set('college',e.target.value)}/></div>
            <div><label className="label">College email</label><input type="email" className="input-field" placeholder="admin@college.edu" required value={form.email} onChange={e=>set('email',e.target.value)}/></div>
            {error && <p className="text-red-500 text-xs">{error}</p>}
            <button type="submit" disabled={loading} className="btn-primary w-full py-3">{loading ? 'Sending code...' : 'Send Verification Code'}</button>
          </form>
        </div>
        <p className="text-center text-sm text-gray-400 mt-4">
          <Link href="/auth/student/login" className="hover:text-black">Student</Link>{' · '}
          <Link href="/auth/employer/login" className="hover:text-black">Employer</Link>
        </p>
      </div>
    </div>
  )
}
