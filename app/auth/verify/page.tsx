'use client'
import { useState, useEffect, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import Logo from '@/components/Logo'

function VerifyForm() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const email = searchParams.get('email') || ''
  const role = searchParams.get('role') || 'student'
  const name = searchParams.get('name') || ''
  const company = searchParams.get('company') || ''
  const college = searchParams.get('college') || ''

  const [otp, setOtp] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [resending, setResending] = useState(false)
  const [resent, setResent] = useState(false)

  const redirectPath = role === 'employer' ? '/employer/dashboard' : role === 'college' ? '/college/dashboard' : '/student/dashboard'

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const { data, error: verifyError } = await supabase.auth.verifyOtp({
      email,
      token: otp.trim(),
      type: 'email',
    })

    if (verifyError) {
      setError('Invalid or expired code. Please try again.')
      setLoading(false)
      return
    }

    // Update profile with extra info
    if (data.user) {
      await supabase.from('profiles').upsert({
        id: data.user.id,
        email,
        name: name || email.split('@')[0],
        role: role as any,
        company: company || undefined,
        college: college || undefined,
      })
    }

    router.push(redirectPath)
  }

  const handleResend = async () => {
    setResending(true)
    await supabase.auth.signInWithOtp({ email })
    setResending(false)
    setResent(true)
    setTimeout(() => setResent(false), 3000)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8"><Logo href="/" size="md" /></div>
        <div className="card p-8">
          <div className="text-center mb-6">
            <div className="text-4xl mb-3">📧</div>
            <h1 className="font-display text-2xl font-bold text-black mb-1">Check your email</h1>
            <p className="text-gray-500 text-sm">We sent a 6-digit code to</p>
            <p className="font-semibold text-black text-sm mt-1">{email}</p>
          </div>

          <form onSubmit={handleVerify} className="space-y-4">
            <div>
              <label className="label text-center block">Enter verification code</label>
              <input
                className="input-field text-center text-2xl font-bold tracking-widest"
                placeholder="000000"
                maxLength={6}
                value={otp}
                onChange={e => setOtp(e.target.value.replace(/\D/g, ''))}
                required
              />
            </div>
            {error && <p className="text-red-500 text-xs text-center">{error}</p>}
            <button type="submit" disabled={loading || otp.length < 6} className="btn-primary w-full py-3">
              {loading ? 'Verifying...' : 'Verify & Continue'}
            </button>
          </form>

          <div className="text-center mt-4">
            <button onClick={handleResend} disabled={resending} className="text-sm text-gray-500 hover:text-black">
              {resending ? 'Sending...' : resent ? '✓ Code sent!' : "Didn't get it? Resend code"}
            </button>
          </div>
        </div>
        <p className="text-center text-xs text-gray-400 mt-4">Code expires in 10 minutes.</p>
      </div>
    </div>
  )
}

export default function VerifyPage() {
  return <Suspense><VerifyForm /></Suspense>
}
