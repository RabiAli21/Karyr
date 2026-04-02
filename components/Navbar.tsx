'use client'
import Link from 'next/link'
import { useState } from 'react'
import { Menu, X, ChevronDown } from 'lucide-react'
import Logo from './Logo'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [signinOpen, setSigninOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Logo href="/" size="md" />

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            <Link href="/students" className="btn-ghost text-sm">For Students</Link>
            <Link href="/employers" className="btn-ghost text-sm">For Employers</Link>
            <Link href="/colleges" className="btn-ghost text-sm">For Colleges</Link>
          </nav>

          <div className="hidden md:flex items-center gap-3">
            {/* Sign in dropdown */}
            <div className="relative">
              <button onClick={() => setSigninOpen(!signinOpen)} className="btn-ghost text-sm flex items-center gap-1.5">
                Sign in <ChevronDown size={14}/>
              </button>
              {signinOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-xl shadow-lg py-1 z-50">
                  <Link href="/auth/student/login" className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 font-medium" onClick={() => setSigninOpen(false)}>Student</Link>
                  <Link href="/auth/employer/login" className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 font-medium" onClick={() => setSigninOpen(false)}>Employer</Link>
                  <Link href="/auth/college/login" className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 font-medium" onClick={() => setSigninOpen(false)}>College Admin</Link>
                </div>
              )}
            </div>
            <Link href="/auth/student/signup" className="btn-primary text-sm">Get started free</Link>
          </div>

          <button className="md:hidden p-2 rounded-lg hover:bg-gray-100" onClick={() => setOpen(!open)}>
            {open ? <X size={20}/> : <Menu size={20}/>}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden border-t border-gray-200 bg-white px-4 py-4 space-y-1">
          <Link href="/students" className="block px-4 py-2.5 rounded-lg text-gray-700 hover:bg-gray-50 font-medium text-sm" onClick={() => setOpen(false)}>For Students</Link>
          <Link href="/employers" className="block px-4 py-2.5 rounded-lg text-gray-700 hover:bg-gray-50 font-medium text-sm" onClick={() => setOpen(false)}>For Employers</Link>
          <Link href="/colleges" className="block px-4 py-2.5 rounded-lg text-gray-700 hover:bg-gray-50 font-medium text-sm" onClick={() => setOpen(false)}>For Colleges</Link>
          <div className="border-t border-gray-100 pt-2 mt-2 space-y-1">
            <Link href="/auth/student/login" className="block px-4 py-2.5 rounded-lg text-gray-700 hover:bg-gray-50 text-sm" onClick={() => setOpen(false)}>Student Login</Link>
            <Link href="/auth/employer/login" className="block px-4 py-2.5 rounded-lg text-gray-700 hover:bg-gray-50 text-sm" onClick={() => setOpen(false)}>Employer Login</Link>
            <Link href="/auth/college/login" className="block px-4 py-2.5 rounded-lg text-gray-700 hover:bg-gray-50 text-sm" onClick={() => setOpen(false)}>College Login</Link>
          </div>
          <div className="pt-2 border-t border-gray-100">
            <Link href="/auth/student/signup" className="btn-primary text-sm w-full text-center block" onClick={() => setOpen(false)}>Get started free</Link>
          </div>
        </div>
      )}
    </header>
  )
}
