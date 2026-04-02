import Logo from './Logo'
import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-black text-gray-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 mb-10">
          <div className="col-span-2 sm:col-span-1">
            <Logo href="/" inverted size="md" />
            <p className="text-sm text-gray-500 mt-3 leading-relaxed">Campus placement, reimagined for students, employers, and colleges.</p>
          </div>
          <div>
            <h4 className="text-white font-semibold text-sm mb-3">Students</h4>
            <ul className="space-y-2">
              {[['For Students','/students'],['Sign up','/auth/student/signup'],['Log in','/auth/student/login'],['Browse Jobs','/student/jobs']].map(([l,h])=>(
                <li key={l}><Link href={h} className="text-sm text-gray-500 hover:text-white transition-colors">{l}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold text-sm mb-3">Employers</h4>
            <ul className="space-y-2">
              {[['For Employers','/employers'],['Sign up','/auth/employer/signup'],['Log in','/auth/employer/login'],['Post a Job','/auth/employer/signup']].map(([l,h])=>(
                <li key={l}><Link href={h} className="text-sm text-gray-500 hover:text-white transition-colors">{l}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold text-sm mb-3">Colleges</h4>
            <ul className="space-y-2">
              {[['For Colleges','/colleges'],['College Portal','/auth/college/login'],['About','/about'],['Contact','mailto:hello@karyr.com']].map(([l,h])=>(
                <li key={l}><Link href={h} className="text-sm text-gray-500 hover:text-white transition-colors">{l}</Link></li>
              ))}
            </ul>
          </div>
        </div>
        <div className="pt-6 border-t border-gray-900 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-700">© {new Date().getFullYear()} Karyr. All rights reserved.</p>
          <p className="text-xs text-gray-700">Built for students everywhere 🚀</p>
        </div>
      </div>
    </footer>
  )
}
