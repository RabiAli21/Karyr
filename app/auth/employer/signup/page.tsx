'use client'
import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import Logo from '@/components/Logo'

export default function EmployerSignup() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [form, setForm] = useState({ name:'', company:'', website:'', email:'' })
  const set = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const { error: otpError } = await supabase.auth.signInWithOtp({
      email: form.email,
      options: { data: { name: form.name, role: 'employer', company: form.company }, shouldCreateUser: true }
    })

    if (otpError) { setError(otpError.message); setLoading(false); return }
    router.push(`/auth/verify?email=${encodeURIComponent(form.email)}&role=employer&name=${encodeURIComponent(form.name)}&company=${encodeURIComponent(form.company)}`)
  }

  return (
    <div className="min-h-screen flex">
      <div className="hidden lg:flex w-1/2 bg-black flex-col justify-between p-12">
        <Logo inverted size="md"/>
        <div>
          <h2 className="font-display text-3xl font-bold text-white mb-4">Hire top campus talent.</h2>
          <ul className="space-y-3">
            {['Post jobs in minutes','Access 200K+ student profiles','Manage all applications in one place','Shortlist and schedule interviews'].map(t=>(
              <li key={t} className="flex items-center gap-3 text-gray-400 text-sm"><span className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center text-white text-xs">✓</span>{t}</li>
            ))}
          </ul>
        </div>
        <p className="text-gray-600 text-sm">First job posting is free.</p>
      </div>
      <div className="flex-1 flex items-center justify-center px-6 py-12 bg-white">
        <div className="w-full max-w-md">
          <div className="lg:hidden mb-8"><Logo size="md"/></div>
          <h1 className="font-display text-2xl font-bold text-black mb-1">Create employer account</h1>
          <p className="text-gray-500 text-sm mb-6">We'll verify your email with a one-time code.</p>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div><label className="label">Your name</label><input className="input-field" placeholder="Your full name" required value={form.name} onChange={e=>set('name',e.target.value)}/></div>
            <div><label className="label">Company name</label><input className="input-field" placeholder="e.g. TechCorp Pvt Ltd" required value={form.company} onChange={e=>set('company',e.target.value)}/></div>
            <div><label className="label">Company website</label><input type="url" className="input-field" placeholder="https://yourcompany.com" value={form.website} onChange={e=>set('website',e.target.value)}/></div>
            <div><label className="label">Work email</label><input type="email" className="input-field" placeholder="you@company.com" required value={form.email} onChange={e=>set('email',e.target.value)}/></div>
            {error && <p className="text-red-500 text-xs">{error}</p>}
            <button type="submit" disabled={loading} className="btn-primary w-full py-3">
              {loading ? 'Sending code...' : 'Send Verification Code'}
            </button>
          </form>
          <p className="text-center text-sm text-gray-500 mt-5">Already have an account?{' '}<Link href="/auth/employer/login" className="text-black font-semibold hover:underline">Sign in</Link></p>
        </div>
      </div>
    </div>
  )
}
