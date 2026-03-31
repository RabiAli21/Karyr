'use client'
import { useState } from 'react'
import Link from 'next/link'

export default function CollegeApplications() {
  return (
    <div className="p-6 max-w-5xl">
      <div className="mb-6">
        <h1 className="page-title">All Applications</h1>
        <p className="text-gray-500 text-sm mt-1">Track where every student has applied across your institution.</p>
      </div>

      {/* Summary cards — all zero */}
      <div className="grid grid-cols-3 sm:grid-cols-6 gap-3 mb-6">
        {['Total','Applied','Shortlisted','Interview','Hired','Rejected'].map((s, i) => (
          <div key={s} className={`card p-3 text-center ${i===0?'bg-black border-black':''}`}>
            <div className={`font-display text-2xl font-bold ${i===0?'text-white':'text-black'}`}>0</div>
            <div className={`text-xs mt-0.5 ${i===0?'text-gray-400':'text-gray-500'}`}>{s}</div>
          </div>
        ))}
      </div>

      {/* Empty state */}
      <div className="card p-20 text-center">
        <div className="text-5xl mb-4">📊</div>
        <h3 className="font-display font-semibold text-black text-xl mb-2">No applications to track yet</h3>
        <p className="text-gray-500 text-sm max-w-sm mx-auto mb-6">Once your students start applying to jobs through Karyr, all their applications will appear here — fully tracked by status.</p>
        <Link href="/college/students" className="btn-primary px-6 py-2.5">Go to Students</Link>
      </div>
    </div>
  )
}
