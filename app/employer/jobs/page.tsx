'use client'
import Link from 'next/link'
import { Plus } from 'lucide-react'

export default function EmployerJobs() {
  return (
    <div className="p-6 max-w-4xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="page-title">My Jobs</h1>
          <p className="text-gray-500 text-sm mt-1">Manage your job postings and view applicants.</p>
        </div>
        <Link href="/employer/jobs/new" className="btn-primary text-sm flex items-center gap-2"><Plus size={15}/>Post a Job</Link>
      </div>

      {/* Empty state */}
      <div className="card p-20 text-center">
        <div className="text-5xl mb-4">📋</div>
        <h3 className="font-display font-semibold text-black text-xl mb-2">No jobs posted yet</h3>
        <p className="text-gray-500 text-sm max-w-sm mx-auto mb-6">Post your first job to start receiving applications from thousands of qualified students and freshers.</p>
        <Link href="/employer/jobs/new" className="btn-primary px-8 py-3 inline-flex items-center gap-2"><Plus size={15}/>Post your first job</Link>
      </div>
    </div>
  )
}
