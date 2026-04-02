'use client'
export const dynamic = 'force-dynamic'
import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import Logo from '@/components/Logo'

export default function StudentSignup() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [form, setForm] = useState({ name:'', email:'', phone:'', password:'', college:'', course:'', gradYear:'2026', city:'' })
  const set = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (step === 1) { setStep(2); return }
    setLoading(true)
    setError('')

    const { error: signUpError } = await supabase.auth.signInWithOtp({
      email: form.email,
      options: {
        data: { name: form.name, role: 'student', college: form.college },
        shouldCreateUser: true,
      }
    })

    if (signUpError) {
      setError(signUpError.message)
      setLoading(false)
      return
    }

    router.push(`/auth/verify?email=${encodeURIComponent(form.email)}&role=student&name=${encodeURIComponent(form.name)}&college=${encodeURIComponent(form.college)}`)
  }

  return (
    <div className="min-h-screen flex">
      <div className="hidden lg:flex w-1/2 bg-black flex-col justify-between p-12">
        <Logo inverted size="md" />
        <div>
          <h2 className="font-display text-3xl font-bold text-white mb-6">Start your career journey today.</h2>
          <ul className="space-y-4">
            {['Access 50,000+ jobs & internships','Build a profile that stands out','Get matched with top companies','Track all your applications'].map(t => (
              <li key={t} className="flex items-center gap-3 text-gray-400 text-sm">
                <span className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center text-white text-xs">✓</span>{t}
              </li>
            ))}
          </ul>
        </div>
        <p className="text-gray-600 text-sm">Free forever for students.</p>
      </div>

      <div className="flex-1 flex items-center justify-center px-6 py-12 bg-white">
        <div className="w-full max-w-md">
          <div className="lg:hidden mb-8"><Logo size="md" /></div>
          <div className="flex gap-2 mb-2">
            <div className={`flex-1 h-1 rounded-full ${step >= 1 ? 'bg-black' : 'bg-gray-200'}`}/>
            <div className={`flex-1 h-1 rounded-full ${step >= 2 ? 'bg-black' : 'bg-gray-200'}`}/>
          </div>
          <p className="text-xs text-gray-400 mb-6">Step {step} of 2</p>
          <h1 className="font-display text-2xl font-bold text-black mb-1">{step === 1 ? 'Create your account' : 'Tell us about yourself'}</h1>
          <p className="text-gray-500 text-sm mb-6">{step === 1 ? 'Free forever. No credit card required.' : 'Help employers find you.'}</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {step === 1 && <>
              <div><label className="label">Full name</label><input className="input-field" placeholder="Your full name" required value={form.name} onChange={e=>set('name',e.target.value)}/></div>
              <div><label className="label">Email address</label><input type="email" className="input-field" placeholder="you@email.com" required value={form.email} onChange={e=>set('email',e.target.value)}/></div>
              <div><label className="label">Phone number</label><input type="tel" className="input-field" placeholder="+91 98765 43210" value={form.phone} onChange={e=>set('phone',e.target.value)}/></div>
            </>}
            {step === 2 && <>
              <div><label className="label">College / University</label><input className="input-field" placeholder="e.g. IIT Delhi" required value={form.college} onChange={e=>set('college',e.target.value)}/></div>
              <div className="grid grid-cols-2 gap-3">
                <div><label className="label">Course</label><input className="input-field" placeholder="e.g. B.Tech CSE" required value={form.course} onChange={e=>set('course',e.target.value)}/></div>
                <div>
                  <label className="label">Grad Year</label>
                  <select className="select-field" value={form.gradYear} onChange={e=>set('gradYear',e.target.value)}>
                    {[2024,2025,2026,2027,2028].map(y=><option key={y}>{y}</option>)}
                  </select>
                </div>
              </div>
              <div><label className="label">City</label><input className="input-field" placeholder="e.g. Mumbai" value={form.city} onChange={e=>set('city',e.target.value)}/></div>
            </>}
            {error && <p className="text-red-500 text-xs">{error}</p>}
            <button type="submit" disabled={loading} className="btn-primary w-full py-3">
              {loading ? 'Sending verification code...' : step === 1 ? 'Continue →' : 'Send Verification Code'}
            </button>
          </form>
          <p className="text-center text-sm text-gray-500 mt-5">Already have an account?{' '}<Link href="/auth/student/login" className="text-black font-semibold hover:underline">Log in</Link></p>
          <p className="text-center text-sm text-gray-400 mt-2">Employer?{' '}<Link href="/auth/employer/signup" className="text-black font-medium hover:underline">Sign up here</Link></p>
        </div>
      </div>
    </div>
  )
}
