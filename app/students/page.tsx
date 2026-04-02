import Link from 'next/link'
import { ArrowRight, Search, FileText, Bell, CheckCircle, Star, Users, Briefcase } from 'lucide-react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

const features = [
  { icon: Search, title: 'Smart job discovery', desc: 'Browse thousands of internships and full-time roles filtered for students and freshers.' },
  { icon: FileText, title: 'One-click apply', desc: 'Build your profile once and apply to any job instantly. No repetitive forms.' },
  { icon: Bell, title: 'Application tracking', desc: 'See exactly where you stand — applied, shortlisted, interview, or offer.' },
  { icon: Star, title: 'Stand out to recruiters', desc: 'A verified student profile that showcases your skills, resume, and potential.' },
]

const steps = [
  { step: '01', title: 'Create your free account', desc: 'Sign up with your email — takes 2 minutes. No credit card required.' },
  { step: '02', title: 'Build your profile', desc: 'Add your college, course, skills, and upload your resume.' },
  { step: '03', title: 'Discover opportunities', desc: 'Browse jobs filtered for your profile — internships, full-time, remote.' },
  { step: '04', title: 'Apply and track', desc: 'Apply with one click and track every application in one place.' },
]

const testimonials = [
  { name: 'Priya S.', college: 'BITS Pilani', text: 'Got my first internship at a fintech startup within 2 weeks of signing up.', role: 'Data Intern @ Razorpay' },
  { name: 'Arjun M.', college: 'IIT Delhi', text: 'Karyr made it so easy to track all my applications. No more spreadsheets.', role: 'SWE Intern @ Microsoft' },
  { name: 'Sneha R.', college: 'NIT Trichy', text: 'The profile builder is so clean. Recruiters actually reached out to me.', role: 'PM Intern @ Zepto' },
]

export default function StudentsPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero */}
      <section className="pt-20 pb-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-gray-100 text-gray-700 text-sm font-semibold px-4 py-2 rounded-full mb-8 border border-gray-200">
            <Users size={13}/> For Students & Freshers
          </div>
          <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-extrabold text-black tracking-tight mb-6 leading-[1.05]">
            Your career starts
            <br />
            <span className="text-gray-400">right here.</span>
          </h1>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto mb-10 leading-relaxed">
            Karyr connects students and freshers with the best internships and jobs in India. Build your profile, apply in one click, and track everything.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center mb-4">
            <Link href="/auth/student/signup" className="btn-primary text-base px-8 py-4 flex items-center justify-center gap-2">
              Get started free <ArrowRight size={16}/>
            </Link>
            <Link href="/auth/student/login" className="btn-secondary text-base px-8 py-4">
              I already have an account
            </Link>
          </div>
          <p className="text-sm text-gray-400">Free forever · No credit card · OTP verified</p>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-gray-100 bg-gray-50 py-10">
        <div className="max-w-4xl mx-auto px-4 grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          {[
            { value:'200K+', label:'Students placed' },
            { value:'50K+', label:'Active jobs' },
            { value:'12K+', label:'Hiring companies' },
            { value:'Free', label:'For all students' },
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
            <h2 className="font-display text-4xl font-bold text-black mb-3">Everything you need to get hired</h2>
            <p className="text-gray-500 text-lg max-w-xl mx-auto">Built specifically for students — no noise, just opportunities.</p>
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
            <h2 className="font-display text-4xl font-bold text-black mb-3">How it works</h2>
            <p className="text-gray-500">From signup to first job in 4 steps.</p>
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

      {/* Testimonials */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="font-display text-4xl font-bold text-black mb-3">Students love Karyr</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {testimonials.map(t => (
              <div key={t.name} className="card p-6">
                <p className="text-gray-700 text-sm leading-relaxed mb-5">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-black text-white flex items-center justify-center font-bold text-xs">{t.name[0]}</div>
                  <div>
                    <div className="font-semibold text-sm text-black">{t.name}</div>
                    <div className="text-xs text-gray-400">{t.college} · {t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-black">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-display text-4xl font-bold text-white mb-4">Ready to launch your career?</h2>
          <p className="text-gray-400 text-lg mb-8">Join 200,000+ students already on Karyr. It's free forever.</p>
          <Link href="/auth/student/signup" className="bg-white text-black hover:bg-gray-100 font-semibold text-base px-10 py-4 rounded-xl transition-all inline-flex items-center gap-2">
            Create free student account <ArrowRight size={16}/>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  )
}
