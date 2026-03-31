'use client'
import { useState } from 'react'
import Link from 'next/link'

const tabs = ['All','applied','shortlisted','interview','hired','rejected']

export default function StudentApplications() {
  const [tab, setTab] = useState('All')

  return (
    <div className="p-6 max-w-4xl">
      <h1 className="page-title mb-1">My Applications</h1>
      <p className="text-gray-500 text-sm mb-6">Track all your job applications in one place.</p>

      {/* Summary cards — all zero */}
      <div className="grid grid-cols-3 sm:grid-cols-6 gap-3 mb-6">
        {['Total','Applied','Shortlisted','Interview','Hired','Rejected'].map((s, i) => (
          <div key={s} className={`card p-3 text-center ${i===0?'bg-black border-black':''}`}>
            <div className={`font-display text-2xl font-bold ${i===0?'text-white':'text-black'}`}>0</div>
            <div className={`text-xs mt-0.5 ${i===0?'text-gray-400':'text-gray-500'}`}>{s}</div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex gap-1 mb-4 overflow-x-auto pb-1">
        {tabs.map(t => (
          <button key={t} onClick={() => setTab(t)}
            className={`px-4 py-2 rounded-lg text-sm font-medium capitalize whitespace-nowrap transition-colors ${tab===t?'bg-black text-white':'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
            {t}
          </button>
        ))}
      </div>

      {/* Empty state */}
      <div className="card p-16 text-center">
        <div className="text-5xl mb-4">📭</div>
        <h3 className="font-display font-semibold text-black text-lg mb-2">No applications yet</h3>
        <p className="text-gray-500 text-sm max-w-xs mx-auto mb-6">Once you apply to jobs, you'll be able to track your progress here — from applied to hired.</p>
        <Link href="/student/jobs" className="btn-primary px-6 py-2.5">Browse jobs</Link>
      </div>
    </div>
  )
}
