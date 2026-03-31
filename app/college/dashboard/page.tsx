'use client'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { Users, Briefcase, CheckCircle, TrendingUp, Plus } from 'lucide-react'
import { getUser } from '@/lib/auth'

export default function CollegeDashboard() {
  const [collegeName, setCollegeName] = useState('')
  const [name, setName] = useState('')

  useEffect(() => {
    const user = getUser()
    if (user) { setCollegeName(user.college || ''); setName(user.name) }
  }, [])

  const displayName = collegeName || name || 'there'

  return (
    <div className="p-6 max-w-5xl">
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="page-title">Placement Dashboard</h1>
          <p className="text-gray-500 text-sm mt-1">{collegeName || 'Your college'} · Career Development Centre</p>
        </div>
        <Link href="/college/students" className="btn-primary text-sm flex items-center gap-2"><Plus size={15}/>Add Students</Link>
      </div>

      {/* Welcome banner */}
      <div className="card p-6 mb-6 border-l-4 border-l-black">
        <h3 className="font-semibold text-black mb-1">Welcome, {name || displayName} 👋</h3>
        <p className="text-gray-500 text-sm">Get started by adding your students to begin tracking placements.</p>
      </div>

      {/* Stats — all zero */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label:'Total Students', value:'0', icon:<Users size={18}/>, sub:'Add students to begin' },
          { label:'Total Applications', value:'0', icon:<Briefcase size={18}/>, sub:'Across all students' },
          { label:'Shortlisted', value:'0', icon:<TrendingUp size={18}/>, sub:'—' },
          { label:'Hired / Placed', value:'0', icon:<CheckCircle size={18}/>, sub:'This season', dark:true },
        ].map((s, i) => (
          <div key={i} className={`card p-5 ${s.dark?'bg-black border-black':''}`}>
            <div className={`w-9 h-9 rounded-lg flex items-center justify-center mb-3 ${s.dark?'bg-white/10 text-white':'bg-gray-100 text-gray-600'}`}>{s.icon}</div>
            <div className={`font-display text-3xl font-bold ${s.dark?'text-white':'text-black'}`}>{s.value}</div>
            <div className={`text-sm mt-0.5 ${s.dark?'text-gray-300':'text-gray-500'}`}>{s.label}</div>
            <div className={`text-xs mt-1 ${s.dark?'text-gray-500':'text-gray-400'}`}>{s.sub}</div>
          </div>
        ))}
      </div>

      {/* Getting started */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card p-10 text-center">
          <div className="text-4xl mb-4">🎓</div>
          <h3 className="font-display font-semibold text-black text-lg mb-2">Add your students</h3>
          <p className="text-gray-500 text-sm mb-6 max-w-xs mx-auto">Import students via CSV or add them manually to start tracking their placement journey.</p>
          <Link href="/college/students" className="btn-primary px-6 py-2.5 inline-flex items-center gap-2"><Plus size={15}/>Add Students</Link>
        </div>
        <div className="card p-8">
          <h3 className="section-title mb-5">Getting started</h3>
          <div className="space-y-4">
            {[
              { step:'1', text:'Add students (manually or via CSV)', href:'/college/students' },
              { step:'2', text:'Students sign up and apply to jobs', href:'/college/students' },
              { step:'3', text:'Track applications & shortlists', href:'/college/applications' },
              { step:'4', text:'Monitor placement dashboard', href:'/college/dashboard' },
            ].map(item => (
              <Link key={item.step} href={item.href} className="flex items-center gap-3 py-2 text-gray-600 hover:text-black group">
                <span className="w-7 h-7 rounded-full bg-gray-100 group-hover:bg-black group-hover:text-white flex items-center justify-center text-xs font-bold transition-colors flex-shrink-0">{item.step}</span>
                <span className="text-sm">{item.text}</span>
                <span className="ml-auto text-gray-300 group-hover:text-black text-xs">→</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
