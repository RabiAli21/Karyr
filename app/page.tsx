import Link from 'next/link'
import { ArrowRight, Users, Building2, GraduationCap, Briefcase, CheckCircle } from 'lucide-react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

const stats = [
  { value: '200K+', label: 'Students registered' },
  { value: '12K+', label: 'Companies hiring' },
  { value: '50K+', label: 'Active jobs' },
  { value: '95%', label: 'Satisfaction rate' },
]

const roles = [
  {
    icon: GraduationCap,
    title: 'For Students',
    desc: 'Discover jobs and internships, build your profile, and apply with one click.',
    features: ['Browse 50K+ internships & jobs', 'Track all your applications', 'Get matched with top companies', 'Resume & profile builder'],
    loginHref: '/auth/student/login',
    signupHref: '/auth/student/signup',
    signupLabel: 'Create student account',
    learnMore: '/students',
    color: 'border-t-4 border-t-black',
  },
  {
    icon: Building2,
    title: 'For Employers',
    desc: 'Post jobs, review applicants, and hire top campus talent — fast.',
    features: ['Post jobs in minutes', 'View & filter applicants', 'Shortlist, interview, hire in-app', 'Access 200K+ student profiles'],
    loginHref: '/auth/employer/login',
    signupHref: '/auth/employer/signup',
    signupLabel: 'Post your first job',
    learnMore: '/employers',
    color: 'border-t-4 border-t-gray-400',
  },
  {
    icon: Users,
    title: 'For Colleges',
    desc: 'Track placement drives, manage your students, and report results in one dashboard.',
    features: ['Student database management', 'Real-time placement tracking', 'CSV bulk import', 'Analytics & funnel reports'],
    loginHref: '/auth/college/login',
    signupHref: '/auth/college/login',
    signupLabel: 'Access college portal',
    learnMore: '/colleges',
    color: 'border-t-4 border-t-gray-300',
  },
]

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero */}
      <section className="pt-20 pb-24 px-4 sm:px-6 lg:px-8 bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(0,0,0,0.03)_0%,_transparent_60%)] pointer-events-none"/>
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-gray-100 text-gray-700 text-sm font-semibold px-4 py-2 rounded-full mb-8 border border-gray-200">
            <Briefcase size={13}/> Campus placement, reimagined
          </div>
          <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-extrabold text-black tracking-tight mb-6 leading-[1.05]">
            The smarter way to
            <br />
            <span className="text-gray-400">launch your career.</span>
          </h1>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto mb-10 leading-relaxed">
            Karyr connects students, employers, and colleges on a single platform — making campus placement transparent, fast, and fair.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center mb-6">
            <Link href="/auth/student/signup" className="btn-primary text-base px-8 py-3.5 flex items-center justify-center gap-2">
              I'm a student <ArrowRight size={16}/>
            </Link>
            <Link href="/auth/employer/signup" className="btn-secondary text-base px-8 py-3.5">
              I'm hiring
            </Link>
            <Link href="/auth/college/login" className="btn-ghost text-base px-8 py-3.5">
              College portal →
            </Link>
          </div>
          <p className="text-sm text-gray-400">Free for students · No credit card required</p>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-gray-100 bg-gray-50 py-10">
        <div className="max-w-4xl mx-auto px-4 grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          {stats.map(s => (
            <div key={s.label}>
              <div className="font-display text-3xl font-extrabold text-black">{s.value}</div>
              <div className="text-sm text-gray-500 mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Three role cards */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-display text-4xl font-bold text-black mb-3">Built for every stakeholder</h2>
            <p className="text-gray-500 text-lg max-w-xl mx-auto">One platform. Three powerful portals. Everyone wins.</p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {roles.map(role => {
              const Icon = role.icon
              return (
                <div key={role.title} className={`card p-7 flex flex-col ${role.color} hover:shadow-lg transition-shadow`}>
                  <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center mb-4">
                    <Icon size={22} className="text-black"/>
                  </div>
                  <h3 className="font-display text-xl font-bold text-black mb-2">{role.title}</h3>
                  <p className="text-gray-500 text-sm mb-5 leading-relaxed">{role.desc}</p>
                  <ul className="space-y-2.5 mb-7 flex-1">
                    {role.features.map(f => (
                      <li key={f} className="flex items-center gap-2.5 text-sm text-gray-700">
                        <CheckCircle size={15} className="text-black flex-shrink-0"/>
                        {f}
                      </li>
                    ))}
                  </ul>
                  <div className="space-y-2 mt-auto">
                    <Link href={role.signupHref} className="btn-primary w-full text-center text-sm py-3 block">{role.signupLabel}</Link>
                    <Link href={role.learnMore} className="btn-ghost w-full text-center text-sm py-2 block text-gray-500">Learn more →</Link>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 border-y border-gray-100">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-display text-4xl font-bold text-black mb-3">How Karyr works</h2>
          <p className="text-gray-500 mb-14">From signup to placement in 4 simple steps.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
            {[
              { step: '01', title: 'Create your profile', desc: 'Sign up as a student, employer, or college admin in under 2 minutes.' },
              { step: '02', title: 'Find opportunities', desc: 'Students browse jobs. Employers post roles. Colleges manage drives.' },
              { step: '03', title: 'Apply & connect', desc: 'Apply with one click. Employers review profiles and shortlist talent.' },
              { step: '04', title: 'Get placed', desc: 'Interviews, offers, and placements — all tracked on Karyr.' },
            ].map(s => (
              <div key={s.step} className="card p-5">
                <div className="font-display text-3xl font-extrabold text-gray-100 mb-2">{s.step}</div>
                <h3 className="font-semibold text-black mb-2">{s.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-black">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-display text-4xl font-bold text-white mb-4">Ready to get started?</h2>
          <p className="text-gray-400 text-lg mb-8">Join 200,000+ students and 12,000+ companies already on Karyr.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/auth/student/signup" className="bg-white text-black hover:bg-gray-100 font-semibold text-base px-8 py-3.5 rounded-lg transition-all flex items-center justify-center gap-2">
              Join as student <ArrowRight size={16}/>
            </Link>
            <Link href="/auth/employer/signup" className="border border-gray-700 text-white hover:bg-gray-900 font-semibold text-base px-8 py-3.5 rounded-lg transition-all">
              Post a job
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
