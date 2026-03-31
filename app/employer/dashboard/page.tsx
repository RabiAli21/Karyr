'use client'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { Briefcase, Users, Plus } from 'lucide-react'
import { supabase } from '@/lib/supabase'

export default function EmployerDashboard() {
  const [name, setName] = useState('')
  const [company, setCompany] = useState('')
  const [jobCount, setJobCount] = useState(0)
  const [appCount, setAppCount] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const load = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return
      const { data: p } = await supabase.from('profiles').select('name, company').eq('id', user.id).single()
      if (p) { setName(p.name || ''); setCompany(p.company || '') }
      const { data: jobs } = await supabase.from('jobs').select('id').eq('employer_id', user.id)
      setJobCount(jobs?.length || 0)
      if (jobs && jobs.length > 0) {
        const jobIds = jobs.map(j => j.id)
        const { count } = await supabase.from('applications').select('*', { count: 'exact', head: true }).in('job_id', jobIds)
        setAppCount(count || 0)
      }
      setLoading(false)
    }
    load()
  }, [])

  const displayName = company || name || 'there'
  if (loading) return <div className="p-6 flex items-center justify-center min-h-[60vh]"><div className="text-gray-400 text-sm">Loading...</div></div>

  return (
    <div className="p-6 max-w-5xl">
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="page-title">Welcome, {displayName} 👋</h1>
          <p className="text-gray-500 text-sm mt-1">{jobCount === 0 ? 'Start by posting your first job to attract candidates.' : `You have ${jobCount} active job${jobCount > 1 ? 's' : ''} and ${appCount} application${appCount !== 1 ? 's' : ''}.`}</p>
        </div>
        <Link href="/employer/jobs/new" className="btn-primary text-sm flex items-center gap-2"><Plus size={15}/>Post a Job</Link>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label:'Active Jobs', value: jobCount.toString(), icon:<Briefcase size={18}/>, sub: jobCount === 0 ? 'Post your first job' : 'View all jobs', dark: false },
          { label:'Total Applicants', value: appCount.toString(), icon:<Users size={18}/>, sub: 'Across all jobs', dark: false },
          { label:'New This Week', value:'0', icon:<Briefcase size={18}/>, sub:'After posting jobs', dark: false },
          { label:'Hired', value:'0', icon:<Users size={18}/>, sub:'This quarter', dark: true },
        ].map((s, i) => (
          <div key={i} className={`card p-5 ${s.dark?'bg-black border-black':''}`}>
            <div className={`w-9 h-9 rounded-lg flex items-center justify-center mb-3 ${s.dark?'bg-white/10 text-white':'bg-gray-100 text-gray-600'}`}>{s.icon}</div>
            <div className={`font-display text-3xl font-bold ${s.dark?'text-white':'text-black'}`}>{s.value}</div>
            <div className={`text-sm mt-0.5 ${s.dark?'text-gray-300':'text-gray-500'}`}>{s.label}</div>
            <div className={`text-xs mt-1 ${s.dark?'text-gray-500':'text-gray-400'}`}>{s.sub}</div>
          </div>
        ))}
      </div>

      {jobCount === 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="card p-10 text-center">
            <div className="text-4xl mb-4">📢</div>
            <h3 className="font-display font-semibold text-black text-lg mb-2">Post your first job</h3>
            <p className="text-gray-500 text-sm mb-6 max-w-xs mx-auto">Reach thousands of qualified students and freshers.</p>
            <Link href="/employer/jobs/new" className="btn-primary px-6 py-2.5 inline-flex items-center gap-2"><Plus size={15}/>Post a Job</Link>
          </div>
          <div className="card p-8">
            <h3 className="section-title mb-5">Getting started</h3>
            <div className="space-y-4">
              {[
                { step:'1', text:'Complete your company profile', href:'/employer/profile' },
                { step:'2', text:'Post your first job or internship', href:'/employer/jobs/new' },
                { step:'3', text:'Review incoming applications', href:'/employer/jobs' },
                { step:'4', text:'Shortlist & schedule interviews', href:'/employer/jobs' },
              ].map(item => (
                <Link key={item.step} href={item.href} className="flex items-center gap-3 py-2 text-gray-600 hover:text-black group">
                  <span className="w-7 h-7 rounded-full bg-gray-100 group-hover:bg-black group-hover:text-white flex items-center justify-center text-xs font-bold transition-colors flex-shrink-0">{item.step}</span>
                  <span className="text-sm">{item.text}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="card p-5 text-center">
          <p className="text-gray-500 text-sm mb-3">You have active jobs. View applicants and manage postings.</p>
          <Link href="/employer/jobs" className="btn-primary text-sm px-6 py-2.5">View My Jobs & Applicants</Link>
        </div>
      )}
    </div>
  )
}
