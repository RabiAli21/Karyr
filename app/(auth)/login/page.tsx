'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()
  const searchParams = useSearchParams()
  const next = searchParams.get('next') ?? ''

  async function handleSendOtp() {
    if (!email.trim()) return
    setLoading(true)
    setError('')

    const supabase = createClient()
    const { error } = await supabase.auth.signInWithOtp({
      email: email.trim().toLowerCase(),
      options: {
        shouldCreateUser: true,
      },
    })

    setLoading(false)

    if (error) {
      setError(error.message)
      return
    }

    // Store email for verify page
    sessionStorage.setItem('karyr_otp_email', email.trim().toLowerCase())
    if (next) sessionStorage.setItem('karyr_next', next)

    router.push('/verify')
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-sm">

        {/* Logo */}
        <div className="mb-10 text-center">
          <span className="text-3xl font-semibold tracking-tight text-indigo-600">
            Karyr
          </span>
          <p className="mt-2 text-sm text-gray-500">
            India&apos;s campus placement platform
          </p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl border border-gray-100 p-8 shadow-sm">
          <h1 className="text-xl font-medium text-gray-900 mb-1">
            Sign in
          </h1>
          <p className="text-sm text-gray-500 mb-6">
            We&apos;ll send a one-time code to your email.
          </p>

          <div className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1.5"
              >
                Email address
              </label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                autoFocus
                value={email}
                onChange={e => setEmail(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSendOtp()}
                placeholder="you@example.com"
                className="w-full px-4 py-2.5 text-sm rounded-xl border border-gray-200 
                           focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent
                           placeholder-gray-400 transition"
              />
            </div>

            {error && (
              <p className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2">
                {error}
              </p>
            )}

            <button
              onClick={handleSendOtp}
              disabled={loading || !email.trim()}
              className="w-full py-2.5 px-4 bg-indigo-600 text-white text-sm font-medium 
                         rounded-xl hover:bg-indigo-700 active:scale-[0.98] transition
                         disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Sending…' : 'Send OTP'}
            </button>
          </div>
        </div>

        <p className="mt-6 text-center text-xs text-gray-400">
          By signing in, you agree to Karyr&apos;s{' '}
          <a href="/privacy" className="underline hover:text-gray-600">
            Privacy Policy
          </a>
        </p>
      </div>
    </div>
  )
}
