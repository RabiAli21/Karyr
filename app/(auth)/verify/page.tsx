'use client'

import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

export default function VerifyPage() {
  const [otp, setOtp] = useState(['', '', '', '', '', ''])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [email, setEmail] = useState('')
  const [resending, setResending] = useState(false)
  const [resent, setResent] = useState(false)
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])
  const router = useRouter()

  useEffect(() => {
    const stored = sessionStorage.getItem('karyr_otp_email')
    if (!stored) {
      router.replace('/login')
      return
    }
    setEmail(stored)
    inputRefs.current[0]?.focus()
  }, [router])

  function handleChange(index: number, value: string) {
    if (!/^\d*$/.test(value)) return
    const digit = value.slice(-1)
    const next = [...otp]
    next[index] = digit
    setOtp(next)

    if (digit && index < 5) {
      inputRefs.current[index + 1]?.focus()
    }

    // Auto-submit when all 6 digits filled
    if (digit && index === 5) {
      const code = [...next].join('')
      if (code.length === 6) verify(code)
    }
  }

  function handleKeyDown(index: number, e: React.KeyboardEvent) {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  function handlePaste(e: React.ClipboardEvent) {
    e.preventDefault()
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6)
    if (!pasted) return
    const next = [...otp]
    pasted.split('').forEach((digit, i) => { next[i] = digit })
    setOtp(next)
    const lastIndex = Math.min(pasted.length - 1, 5)
    inputRefs.current[lastIndex]?.focus()
    if (pasted.length === 6) verify(pasted)
  }

  async function verify(code: string) {
    setLoading(true)
    setError('')

    const supabase = createClient()
    const { data, error } = await supabase.auth.verifyOtp({
      email,
      token: code,
      type: 'email',
    })

    if (error || !data.user) {
      setLoading(false)
      setError('Invalid or expired code. Try again.')
      setOtp(['', '', '', '', '', ''])
      inputRefs.current[0]?.focus()
      return
    }

    // Check role
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', data.user.id)
      .single()

    const role = profile?.role
    const next = sessionStorage.getItem('karyr_next')
    sessionStorage.removeItem('karyr_otp_email')
    sessionStorage.removeItem('karyr_next')

    if (!role) {
      router.replace('/onboarding')
      return
    }

    // Redirect to intended page or role dashboard
    if (next && next.startsWith(`/${role === 'college_admin' ? 'college' : role}`)) {
      router.replace(next)
    } else {
      router.replace(rolePath(role))
    }
  }

  async function resendOtp() {
    setResending(true)
    setError('')
    const supabase = createClient()
    await supabase.auth.signInWithOtp({ email, options: { shouldCreateUser: true } })
    setResending(false)
    setResent(true)
    setTimeout(() => setResent(false), 4000)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-sm">

        {/* Logo */}
        <div className="mb-10 text-center">
          <span className="text-3xl font-semibold tracking-tight text-indigo-600">
            Karyr
          </span>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl border border-gray-100 p-8 shadow-sm">
          <h1 className="text-xl font-medium text-gray-900 mb-1">
            Check your email
          </h1>
          <p className="text-sm text-gray-500 mb-6">
            We sent a 6-digit code to{' '}
            <span className="font-medium text-gray-700">{email}</span>
          </p>

          {/* OTP inputs */}
          <div className="flex gap-2 mb-5" onPaste={handlePaste}>
            {otp.map((digit, i) => (
              <input
                key={i}
                ref={el => { inputRefs.current[i] = el }}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={e => handleChange(i, e.target.value)}
                onKeyDown={e => handleKeyDown(i, e)}
                disabled={loading}
                className="flex-1 h-12 text-center text-lg font-medium rounded-xl border border-gray-200
                           focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent
                           disabled:opacity-50 transition"
              />
            ))}
          </div>

          {error && (
            <p className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2 mb-4">
              {error}
            </p>
          )}

          {resent && (
            <p className="text-sm text-emerald-600 bg-emerald-50 border border-emerald-100 rounded-lg px-3 py-2 mb-4">
              New code sent.
            </p>
          )}

          <button
            onClick={() => verify(otp.join(''))}
            disabled={loading || otp.join('').length < 6}
            className="w-full py-2.5 px-4 bg-indigo-600 text-white text-sm font-medium 
                       rounded-xl hover:bg-indigo-700 active:scale-[0.98] transition
                       disabled:opacity-50 disabled:cursor-not-allowed mb-3"
          >
            {loading ? 'Verifying…' : 'Verify'}
          </button>

          <button
            onClick={resendOtp}
            disabled={resending}
            className="w-full py-2 text-sm text-gray-500 hover:text-gray-700 transition"
          >
            {resending ? 'Sending…' : 'Resend code'}
          </button>
        </div>

        <button
          onClick={() => router.push('/login')}
          className="mt-4 w-full text-center text-sm text-gray-400 hover:text-gray-600 transition"
        >
          ← Use a different email
        </button>
      </div>
    </div>
  )
}

function rolePath(role: string) {
  switch (role) {
    case 'student':       return '/student/dashboard'
    case 'employer':      return '/employer/dashboard'
    case 'college_admin': return '/college/dashboard'
    default:              return '/onboarding'
  }
}
