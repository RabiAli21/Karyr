export type UserRole = 'student' | 'employer' | 'college'

export interface AuthUser {
  name: string
  email: string
  role: UserRole
  company?: string
  college?: string
}

export function saveUser(user: AuthUser) {
  if (typeof window !== 'undefined') {
    localStorage.setItem('karyr_user', JSON.stringify(user))
  }
}

export function getUser(): AuthUser | null {
  if (typeof window === 'undefined') return null
  try {
    const raw = localStorage.getItem('karyr_user')
    return raw ? JSON.parse(raw) : null
  } catch { return null }
}

export function clearUser() {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('karyr_user')
  }
}
