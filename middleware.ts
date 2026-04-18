import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

// Routes that require a specific role
const ROLE_ROUTES: Record<string, string> = {
  '/student': 'student',
  '/employer': 'employer',
  '/college': 'college_admin',
}

// Public routes — no auth needed
const PUBLIC_ROUTES = ['/', '/login', '/verify', '/auth/callback']

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  let response = NextResponse.next({ request })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          )
          response = NextResponse.next({ request })
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  // Refresh session (required for SSR)
  const { data: { user } } = await supabase.auth.getUser()

  // ── Public routes ────────────────────────────────────────
  const isPublic = PUBLIC_ROUTES.some(route => pathname === route)

  // If logged in and hitting /login, redirect to their portal
  if (user && pathname === '/login') {
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single()

    const role = profile?.role
    if (!role) return NextResponse.redirect(new URL('/onboarding', request.url))

    const destination = roleToPath(role)
    return NextResponse.redirect(new URL(destination, request.url))
  }

  if (isPublic) return response

  // ── Protected routes ─────────────────────────────────────
  if (!user) {
    // Not logged in → send to login
    const url = new URL('/login', request.url)
    url.searchParams.set('next', pathname)
    return NextResponse.redirect(url)
  }

  // Get user role
  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single()

  const userRole = profile?.role

  // No role yet → onboarding
  if (!userRole && pathname !== '/onboarding') {
    return NextResponse.redirect(new URL('/onboarding', request.url))
  }

  // Role-based route guard
  const matchedPrefix = Object.keys(ROLE_ROUTES).find(prefix =>
    pathname.startsWith(prefix)
  )

  if (matchedPrefix) {
    const requiredRole = ROLE_ROUTES[matchedPrefix]
    if (userRole !== requiredRole) {
      // Wrong portal — redirect to their actual portal
      return NextResponse.redirect(
        new URL(roleToPath(userRole ?? ''), request.url)
      )
    }
  }

  return response
}

function roleToPath(role: string): string {
  switch (role) {
    case 'student':      return '/student/dashboard'
    case 'employer':     return '/employer/dashboard'
    case 'college_admin': return '/college/dashboard'
    default:             return '/onboarding'
  }
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
