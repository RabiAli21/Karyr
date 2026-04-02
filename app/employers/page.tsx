import Link from 'next/link'
import { ArrowRight, Briefcase, Users, BarChart2, MessageSquare, CheckCircle, Building2 } from 'lucide-react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

const features = [
  { icon: Briefcase, title: 'Post jobs in minutes', desc: 'Create detailed job postings with compensation, skills, and requirements in under 5 minutes.' },
  { icon: Users, title: 'Access top talent', desc: '200,000+ verified student profiles across 500+ colleges and universities.' },
  { icon: BarChart2, title: 'Manage applicants', desc: 'Review profiles, shortlist candidates, schedule interviews — all from one dashboard.' },
  { icon: MessageSquare, title: 'Update statuses', desc: 'Keep candidates informed with real-time status updates: shortlisted, interview, hired.' },
]

const steps = [
  { step: '01', title: 'Create employer account', desc: 'Sign up with your work email and verify with OTP. Takes 2 minutes.' },
  { step: '02', title: 'Set up company profile', desc: 'Add your company name, about, industry, and size so students know who you are.' },
  { step: '03', title: 'Post your first job', desc: 'Fill in the role details, compensation, and requirements.' },
  { step: '04', title: 'Review & hire', desc: 'Applications come in — shortlist, interview, and mark as hired directly on Karyr.' },
]

export default function EmployersPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero */}
      <section className="pt-20 pb-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-gray-100 text-gray-700 text-sm font-semibold px-4 py-2 rounded-full mb-8 border border-gray-200">
            <Building2 size={13}/> For Employers & Recruiters
          </div>
          <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-extrabold text-black tracking-tight mb-6 leading-[1.05]">
            Hire exceptional
            <br />
            <span className="text-gray-400">campus talent.</span>
          </h1>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto mb-10 leading-relaxed">
            Post jobs, discover the best students from top colleges, and manage your entire hiring pipeline on Karyr.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center mb-4">
            <Link href="/auth/employer/signup" className="btn-primary text-base px-8 py-4 flex items-center justify-center gap-2">
              Start hiring free <ArrowRight size={16}/>
            </Link>
            <Link href="/auth/employer/login" className="btn-secondary text-base px-8 py-4">
              Sign in to my account
            </Link>
          </div>
          <p className="text-sm text-gray-400">Free to post · OTP verified · No setup fees</p>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-gray-100 bg-gray-50 py-10">
        <div className="max-w-4xl mx-auto px-4 grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          {[
            { value:'200K+', label:'Verified students' },
            { value:'500+', label:'Colleges & universities' },
            { value:'12K+', label:'Companies hiring' },
            { value:'Free', label:'First job posting' },
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
            <h2 className="font-display text-4xl font-bold text-black mb-3">Everything you need to hire smarter</h2>
            <p className="text-gray-500 text-lg max-w-xl mx-auto">Campus recruitment without the complexity.</p>
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
            <h2 className="font-display text-4xl font-bold text-black mb-3">How hiring works on Karyr</h2>
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

      {/* What you can do */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-display text-4xl font-bold text-black mb-3">Built for modern campus hiring</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              'Post internships and full-time roles',
              'Set compensation and requirements clearly',
              'View student profiles and resumes',
              'Shortlist candidates with one click',
              'Update application statuses in real time',
              'Manage all jobs from one dashboard',
              'Reach students from 500+ colleges',
              'OTP-verified employer accounts',
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
          <h2 className="font-display text-4xl font-bold text-white mb-4">Start hiring on Karyr today</h2>
          <p className="text-gray-400 text-lg mb-8">Post your first job free and connect with thousands of qualified students.</p>
          <Link href="/auth/employer/signup" className="bg-white text-black hover:bg-gray-100 font-semibold text-base px-10 py-4 rounded-xl transition-all inline-flex items-center gap-2">
            Create employer account <ArrowRight size={16}/>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  )
}
