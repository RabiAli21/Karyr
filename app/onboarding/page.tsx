'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

type Role = 'student' | 'employer' | 'college_admin'

const ROLES: { id: Role; label: string; description: string; icon: string }[] = [
  {
    id: 'student',
    label: 'Student',
    description: 'Browse jobs, apply to campus drives, track your applications',
    icon: 'S',
  },
  {
    id: 'employer',
    label: 'Employer',
    description: 'Post jobs, discover campus talent, schedule drives',
    icon: 'E',
  },
  {
    id: 'college_admin',
    label: 'Placement Officer',
    description: 'Manage your college's placements, students, and recruiters',
    icon: 'P',
  },
]

const ROLE_COLORS: Record<Role, string> = {
  student: 'border-indigo-500 bg-indigo-50',
  employer: 'border-emerald-500 bg-emerald-50',
  college_admin: 'border-amber-500 bg-amber-50',
}

const ROLE_ICON_COLORS: Record<Role, string> = {
  student: 'bg-indigo-100 text-indigo-700',
  employer: 'bg-emerald-100 text-emerald-700',
  college_admin: 'bg-amber-100 text-amber-700',
}

export default function OnboardingPage() {
  const [selected, setSelected] = useState<Role | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  async function handleContinue() {
    if (!selected) return
    setLoading(true)
    setError('')

    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      router.replace('/login')
      return
    }

    const { error } = await supabase
      .from('profiles')
      .update({ role: selected })
      .eq('id', user.id)

    if (error) {
      setLoading(false)
      setError('Something went wrong. Please try again.')
      return
    }

    // Redirect to their portal
    switch (selected) {
      case 'student':       router.replace('/student/dashboard'); break
      case 'employer':      router.replace('/employer/dashboard'); break
      case 'college_admin': router.replace('/college/dashboard'); break
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md">

        {/* Logo */}
        <div className="mb-10 text-center">
          <span className="text-3xl font-semibold tracking-tight text-indigo-600">
            Karyr
          </span>
          <p className="mt-2 text-sm text-gray-500">
            Let&apos;s set up your account
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 p-8 shadow-sm">
          <h1 className="text-xl font-medium text-gray-900 mb-1">
            Who are you?
          </h1>
          <p className="text-sm text-gray-500 mb-6">
            Choose your role. This determines which portal you access.
          </p>

          <div className="space-y-3 mb-6">
            {ROLES.map(role => (
              <button
                key={role.id}
                onClick={() => setSelected(role.id)}
                className={`w-full text-left flex items-center gap-4 p-4 rounded-xl border-2 transition
                  ${selected === role.id
                    ? ROLE_COLORS[role.id]
                    : 'border-gray-100 hover:border-gray-200 hover:bg-gray-50'
                  }`}
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center 
                                font-semibold text-sm flex-shrink-0
                                ${selected === role.id
                                  ? ROLE_ICON_COLORS[role.id]
                                  : 'bg-gray-100 text-gray-500'}`}>
                  {role.icon}
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-900">{role.label}</div>
                  <div className="text-xs text-gray-500 mt-0.5 leading-relaxed">{role.description}</div>
                </div>
              </button>
            ))}
          </div>

          {error && (
            <p className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2 mb-4">
              {error}
            </p>
          )}

          <button
            onClick={handleContinue}
            disabled={!selected || loading}
            className="w-full py-2.5 px-4 bg-indigo-600 text-white text-sm font-medium 
                       rounded-xl hover:bg-indigo-700 active:scale-[0.98] transition
                       disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Setting up…' : 'Continue →'}
          </button>
        </div>
      </div>
    </div>
  )
}
