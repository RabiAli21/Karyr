'use client'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { FileText, BookMarked, TrendingUp, ArrowRight, Search } from 'lucide-react'
import { getUser } from '@/lib/auth'

const sampleJobs = [
  { id:'1', title:'Software Engineering Intern', company:'Microsoft', location:'Bangalore', type:'Internship', pay:'₹60,000/mo', logo:'M' },
  { id:'2', title:'Data Analyst', company:'Razorpay', location:'Pune · Remote', type:'Full-time', pay:'₹8–12 LPA', logo:'R' },
  { id:'3', title:'Product Intern', company:'Zepto', location:'Mumbai', type:'Internship', pay:'₹40,000/mo', logo:'Z' },
]

export default function StudentDashboard() {
  const [name, setName] = useState('')

  useEffect(() => {
    const user = getUser()
    if (user) setName(user.name)
  }, [])

  const firstName = name.split(' ')[0] || 'there'

  return (
    <div className="p-6 max-w-5xl">
      <div className="mb-6">
        <h1 className="page-title">Good morning, {firstName} 👋</h1>
        <p className="text-gray-500 text-sm mt-1">Welcome to Karyr. Let's find you the perfect opportunity.</p>
      </div>

      {/* Profile completion */}
      <div className="card p-5 mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-l-4 border-l-black">
        <div>
          <h3 className="font-semibold text-black text-sm">Complete your profile to get started</h3>
          <p className="text-gray-500 text-xs mt-0.5">Add your resume and skills to get 3x more recruiter views.</p>
          <div className="mt-2 bg-gray-200 rounded-full h-1.5 w-48">
            <div className="bg-black h-1.5 rounded-full" style={{width:'20%'}}/>
          </div>
          <p className="text-xs text-gray-400 mt-1">20% complete</p>
        </div>
        <Link href="/student/profile" className="btn-primary text-xs px-4 py-2 whitespace-nowrap">Complete profile →</Link>
      </div>

      {/* Stats — all zero for new user */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label:'Applications', value:'0', icon:<FileText size={18}/>, sub:'Start applying today' },
          { label:'Saved Jobs', value:'0', icon:<BookMarked size={18}/>, sub:'Browse & save jobs' },
          { label:'Profile Views', value:'0', icon:<TrendingUp size={18}/>, sub:'Complete profile first' },
          { label:'Matches', value:'0', icon:<Search size={18}/>, sub:'Based on your skills' },
        ].map((s, i) => (
          <div key={i} className="card p-4">
            <div className="w-8 h-8 rounded-lg bg-gray-100 text-gray-600 flex items-center justify-center mb-3">{s.icon}</div>
            <div className="font-display text-2xl font-bold text-black">{s.value}</div>
            <div className="text-xs text-gray-500 mt-0.5">{s.label}</div>
            <div className="text-xs text-gray-400 mt-1">{s.sub}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Featured jobs */}
        <div className="lg:col-span-3">
          <div className="flex items-center justify-between mb-4">
            <h2 className="section-title">Jobs to explore</h2>
            <Link href="/student/jobs" className="text-sm text-black font-medium hover:underline flex items-center gap-1">View all <ArrowRight size={14}/></Link>
          </div>
          <div className="space-y-3">
            {sampleJobs.map(job => (
              <div key={job.id} className="card p-4 flex items-center gap-4 hover:shadow-md transition-shadow">
                <div className="w-11 h-11 rounded-xl bg-gray-100 border border-gray-200 flex items-center justify-center font-bold text-gray-700 flex-shrink-0">{job.logo}</div>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-sm text-black truncate">{job.title}</div>
                  <div className="text-xs text-gray-500">{job.company} · {job.location}</div>
                  <div className="flex items-center gap-2 mt-1.5">
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${job.type==='Internship'?'bg-gray-100 text-gray-600':'bg-black text-white'}`}>{job.type}</span>
                    <span className="text-xs text-gray-500">{job.pay}</span>
                  </div>
                </div>
                <Link href="/student/jobs" className="btn-primary text-xs px-3 py-2 flex-shrink-0">Apply</Link>
              </div>
            ))}
          </div>
        </div>

        {/* Right panel — empty state */}
        <div className="lg:col-span-2 space-y-4">
          <div className="card p-6 text-center">
            <div className="text-3xl mb-3">📋</div>
            <h3 className="font-semibold text-black text-sm mb-1">No applications yet</h3>
            <p className="text-xs text-gray-500 mb-4">Start applying to jobs and track your progress here.</p>
            <Link href="/student/jobs" className="btn-primary text-xs px-4 py-2">Browse jobs</Link>
          </div>
          <div className="card p-5">
            <h3 className="section-title mb-3">Getting started</h3>
            <div className="space-y-3">
              {[
                { step:'1', text:'Complete your profile', href:'/student/profile' },
                { step:'2', text:'Upload your resume', href:'/student/profile' },
                { step:'3', text:'Browse & apply to jobs', href:'/student/jobs' },
                { step:'4', text:'Track your applications', href:'/student/applications' },
              ].map(item => (
                <Link key={item.step} href={item.href} className="flex items-center gap-3 py-2 hover:text-black text-gray-600 group">
                  <span className="w-6 h-6 rounded-full bg-gray-100 group-hover:bg-black group-hover:text-white flex items-center justify-center text-xs font-bold transition-colors">{item.step}</span>
                  <span className="text-sm">{item.text}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
