// app/college/dashboard/page.tsx
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export default async function CollegeDashboard() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-medium text-gray-900 mb-2">Placement Officer Dashboard</h1>
        <p className="text-gray-500 text-sm">Logged in as {user.email}</p>
        <p className="text-amber-600 text-sm mt-1">Auth working ✓</p>
      </div>
    </div>
  )
}
