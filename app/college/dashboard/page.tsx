'use client'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { Users, Briefcase, CheckCircle, TrendingUp, Plus } from 'lucide-react'
import { supabase } from '@/lib/supabase'

export default function CollegeDashboard() {
  const [name, setName] = useState('')
  const [college, setCollege] = useState('')
  const [studentCount, setStudentCount] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const load = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return
      const { data: p } = await supabase.from('profiles').select('name, college').eq('id', user.id).single()
      if (p) { setName(p.name || ''); setCollege(p.college || '') }
      const { count } = await supabase.from('college_students').select('*', { count: 'exact', head: true }).eq('college_id', user.id)
      setStudentCount(count || 0)
      setLoading(false)
    }
    load()
  }, [])

  if (loading) return <div className="p-6 flex items-center justify-center min-h-[60vh]"><div className="text-gray-400 text-sm">Loading...</div></div>

  return (
    <div className="p-6 max-w-5xl">
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="page-title">Placement Dashboard</h1>
          <p className="text-gray-500 text-sm mt-1">{college || 'Your college'} · Career Development Centre</p>
        </div>
        <Link href="/college/students" className="btn-primary text-sm flex items-center gap-2"><Plus size={15}/>Add Students</Link>
      </div>

      <div className="card p-5 mb-6 border-l-4 border-l-black">
        <h3 className="font-semibold text-black mb-1">Welcome, {name || 'Admin'} 👋</h3>
        <p className="text-gray-500 text-sm">{studentCount === 0 ? 'Get started by adding your students to begin tracking placements.' : `${studentCount} student${studentCount > 1 ? 's' : ''} registered. Track their applications and placement progress.`}</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label:'Total Students', value: studentCount.toString(), icon:<Users size={18}/>, sub: studentCount === 0 ? 'Add students to begin' : 'Registered on Karyr' },
          { label:'Total Applications', value:'0', icon:<Briefcase size={18}/>, sub:'Across all students' },
          { label:'Shortlisted', value:'0', icon:<TrendingUp size={18}/>, sub:'—' },
          { label:'Hired / Placed', value:'0', icon:<CheckCircle size={18}/>, sub:'This season', dark: true },
        ].map((s: any, i) => (
          <div key={i} className={`card p-5 ${s.dark?'bg-black border-black':''}`}>
            <div className={`w-9 h-9 rounded-lg flex items-center justify-center mb-3 ${s.dark?'bg-white/10 text-white':'bg-gray-100 text-gray-600'}`}>{s.icon}</div>
            <div className={`font-display text-3xl font-bold ${s.dark?'text-white':'text-black'}`}>{s.value}</div>
            <div className={`text-sm mt-0.5 ${s.dark?'text-gray-300':'text-gray-500'}`}>{s.label}</div>
            <div className={`text-xs mt-1 ${s.dark?'text-gray-500':'text-gray-400'}`}>{s.sub}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card p-10 text-center">
          <div className="text-4xl mb-4">🎓</div>
          <h3 className="font-display font-semibold text-black text-lg mb-2">{studentCount === 0 ? 'Add your students' : 'Manage students'}</h3>
          <p className="text-gray-500 text-sm mb-6 max-w-xs mx-auto">{studentCount === 0 ? 'Import students via CSV or add them manually.' : `${studentCount} students registered. Add more or manage existing ones.`}</p>
          <Link href="/college/students" className="btn-primary px-6 py-2.5 inline-flex items-center gap-2"><Plus size={15}/>{studentCount === 0 ? 'Add Students' : 'View Students'}</Link>
        </div>
        <div className="card p-8">
          <h3 className="section-title mb-5">Getting started</h3>
          <div className="space-y-4">
            {[
              { step:'1', text:'Add students (manually or via CSV)', href:'/college/students' },
              { step:'2', text:'Students sign up and apply to jobs', href:'/college/students' },
              { step:'3', text:'Track applications & shortlists', href:'/college/applications' },
              { step:'4', text:'Monitor placement progress', href:'/college/dashboard' },
            ].map(item => (
              <Link key={item.step} href={item.href} className="flex items-center gap-3 py-2 text-gray-600 hover:text-black group">
                <span className="w-7 h-7 rounded-full bg-gray-100 group-hover:bg-black group-hover:text-white flex items-center justify-center text-xs font-bold transition-colors flex-shrink-0">{item.step}</span>
                <span className="text-sm">{item.text}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
