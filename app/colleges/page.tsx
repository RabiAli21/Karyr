import Link from 'next/link'
import { ArrowRight, Users, BarChart2, Upload, FileBarChart, GraduationCap, CheckCircle } from 'lucide-react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

const features = [
  { icon: Users, title: 'Student database', desc: 'Add and manage all your students — manually or via CSV bulk import.' },
  { icon: BarChart2, title: 'Placement dashboard', desc: 'Real-time view of applications, shortlists, interviews, and placements.' },
  { icon: Upload, title: 'CSV bulk import', desc: 'Import hundreds of students at once with a simple CSV upload.' },
  { icon: FileBarChart, title: 'Placement funnel', desc: 'See exactly how many students are at each stage — applied to hired.' },
]

const steps = [
  { step: '01', title: 'College admin login', desc: 'Get access credentials from your Karyr representative. Verify with OTP.' },
  { step: '02', title: 'Add your students', desc: 'Import students via CSV or add them manually. They receive access to Karyr.' },
  { step: '03', title: 'Students apply to jobs', desc: 'Students browse jobs from employers and apply through Karyr.' },
  { step: '04', title: 'Track placements', desc: 'Monitor every application and placement in your dashboard in real time.' },
]

export default function CollegesPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero */}
      <section className="pt-20 pb-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-gray-100 text-gray-700 text-sm font-semibold px-4 py-2 rounded-full mb-8 border border-gray-200">
            <GraduationCap size={13}/> For Colleges & Career Centres
          </div>
          <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-extrabold text-black tracking-tight mb-6 leading-[1.05]">
            Placement tracking,
            <br />
            <span className="text-gray-400">finally simplified.</span>
          </h1>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto mb-10 leading-relaxed">
            Karyr gives your career centre a single dashboard to manage students, track applications, and report placement results — in real time.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center mb-4">
            <Link href="/auth/college/login" className="btn-primary text-base px-8 py-4 flex items-center justify-center gap-2">
              Access college portal <ArrowRight size={16}/>
            </Link>
            <Link href="mailto:hello@karyr.com" className="btn-secondary text-base px-8 py-4">
              Contact us to get started
            </Link>
          </div>
          <p className="text-sm text-gray-400">Contact your Karyr representative to get credentials</p>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-gray-100 bg-gray-50 py-10">
        <div className="max-w-4xl mx-auto px-4 grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          {[
            { value:'500+', label:'Partner colleges' },
            { value:'200K+', label:'Students placed' },
            { value:'12K+', label:'Hiring companies' },
            { value:'Real-time', label:'Placement tracking' },
          ].map(s => (
            <div key={s.label}>
              <div className="font-display text-3xl font-extrabold text-black">{s.value}</div>
              <div className="text-sm text-gray-500 mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="font-display text-4xl font-bold text-black mb-3">Built for placement officers</h2>
            <p className="text-gray-500 text-lg max-w-xl mx-auto">Everything your career centre needs in one place.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map(f => {
              const Icon = f.icon
              return (
                <div key={f.title} className="card p-6 hover:shadow-md transition-shadow">
                  <div className="w-10 h-10 rounded-xl bg-black flex items-center justify-center mb-4">
                    <Icon size={18} className="text-white"/>
                  </div>
                  <h3 className="font-display font-semibold text-black mb-2">{f.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{f.desc}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 border-y border-gray-100">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="font-display text-4xl font-bold text-black mb-3">How Karyr works for colleges</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map(s => (
              <div key={s.step} className="card p-5">
                <div className="font-display text-4xl font-extrabold text-gray-100 mb-2">{s.step}</div>
                <h3 className="font-semibold text-black text-sm mb-2">{s.title}</h3>
                <p className="text-xs text-gray-500 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Feature list */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-display text-4xl font-bold text-black mb-3">What your career centre gets</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              'Central student management dashboard',
              'Bulk CSV import for student data',
              'Real-time application tracking per student',
              'Placement funnel from applied to hired',
              'Top hiring companies leaderboard',
              'Filter students by batch, course, year',
              'Applications breakdown by status',
              'Secure college admin access with OTP',
            ].map(item => (
              <div key={item} className="flex items-center gap-3 p-3">
                <CheckCircle size={16} className="text-black flex-shrink-0"/>
                <span className="text-sm text-gray-700">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-black">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-display text-4xl font-bold text-white mb-4">Bring Karyr to your college</h2>
          <p className="text-gray-400 text-lg mb-8">Get in touch and we'll set up your college portal within 24 hours.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/auth/college/login" className="bg-white text-black hover:bg-gray-100 font-semibold text-base px-8 py-4 rounded-xl transition-all inline-flex items-center gap-2">
              College portal login <ArrowRight size={16}/>
            </Link>
            <Link href="mailto:hello@karyr.com" className="border border-gray-700 text-white hover:bg-gray-900 font-semibold text-base px-8 py-4 rounded-xl transition-all">
              Contact us
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
