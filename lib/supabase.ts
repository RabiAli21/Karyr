import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type UserRole = 'student' | 'employer' | 'college'

export interface Profile {
  id: string
  name: string
  email: string
  role: UserRole
  phone?: string
  city?: string
  headline?: string
  skills?: string[]
  college?: string
  course?: string
  grad_year?: number
  preferred_role?: string
  company?: string
  company_website?: string
  company_about?: string
  recruiter_name?: string
  resume_url?: string
  created_at?: string
}

export interface Job {
  id: string
  employer_id: string
  company: string
  title: string
  type: string
  location: string
  location_type: string
  pay: string
  pay_type: string
  openings: number
  description: string
  requirements?: string
  skills?: string[]
  deadline?: string
  status: string
  created_at: string
}

export interface Application {
  id: string
  student_id: string
  job_id: string
  status: string
  applied_at: string
  job?: Job
}

// Get current logged-in user profile
export async function getCurrentProfile(): Promise<Profile | null> {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return null
  const { data } = await supabase.from('profiles').select('*').eq('id', user.id).single()
  return data
}

// Save/update profile
export async function saveProfile(profile: Partial<Profile>) {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return null
  const { data, error } = await supabase
    .from('profiles')
    .upsert({ ...profile, id: user.id, email: user.email })
    .select()
    .single()
  return error ? null : data
}
