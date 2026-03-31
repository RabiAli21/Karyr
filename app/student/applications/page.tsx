'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import Badge from '@/components/ui/Badge'
import { supabase } from '@/lib/supabase'

const tabs = ['All','applied','shortlisted','interview','hired','rejected']

export default function StudentApplications() {
  const [tab, setTab] = useState('All')
  const [applications, setApplications] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const load = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return
      const { data } = await supabase
        .from('applications')
        .select('*, jobs(title, company, location, type, pay, skills)')
        .eq('student_id', user.id)
        .order('applied_at', { ascending: false })
      setApplications(data || [])
      setLoading(false)
    }
    load()
  }, [])

  const filtered = tab === 'All' ? applications : applications.filter(a => a.status === tab)
  const count = (s: string) => s === 'All' ? applications.length : applications.filter(a => a.status === s).length

  if (loading) return <div className="p-6 flex items-center justify-center min-h-[60vh]"><div className="text-gray-400 text-sm">Loading...</div></div>

  return (
    <div className="p-6 max-w-4xl">
      <h1 className="page-title mb-1">My Applications</h1>
      <p className="text-gray-500 text-sm mb-6">Track all your job applications in one place.</p>

      <div className="grid grid-cols-3 sm:grid-cols-6 gap-3 mb-6">
        {['Total','Applied','Shortlisted','Interview','Hired','Rejected'].map((s, i) => {
          const key = i === 0 ? 'All' : s.toLowerCase()
          return (
            <div key={s} className={`card p-3 text-center ${i===0?'bg-black border-black':''}`}>
              <div className={`font-display text-2xl font-bold ${i===0?'text-white':'text-black'}`}>{count(key)}</div>
              <div className={`text-xs mt-0.5 ${i===0?'text-gray-400':'text-gray-500'}`}>{s}</div>
            </div>
          )
        })}
      </div>

      <div className="flex gap-1 mb-4 overflow-x-auto pb-1">
        {tabs.map(t => (
          <button key={t} onClick={() => setTab(t)}
            className={`px-4 py-2 rounded-lg text-sm font-medium capitalize whitespace-nowrap transition-colors ${tab===t?'bg-black text-white':'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
            {t} <span className="opacity-60 ml-1">{count(t)}</span>
          </button>
        ))}
      </div>

      {applications.length === 0 ? (
        <div className="card p-16 text-center">
          <div className="text-5xl mb-4">📭</div>
          <h3 className="font-display font-semibold text-black text-lg mb-2">No applications yet</h3>
          <p className="text-gray-500 text-sm max-w-xs mx-auto mb-6">Once you apply to jobs, you'll track everything here.</p>
          <Link href="/student/jobs" className="btn-primary px-6 py-2.5">Browse jobs</Link>
        </div>
      ) : (
        <div className="card overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50">
                <th className="text-left p-4 text-xs font-semibold text-gray-500 uppercase tracking-wide">Company & Role</th>
                <th className="text-left p-4 text-xs font-semibold text-gray-500 uppercase tracking-wide hidden sm:table-cell">Type</th>
                <th className="text-left p-4 text-xs font-semibold text-gray-500 uppercase tracking-wide hidden md:table-cell">Applied</th>
                <th className="text-left p-4 text-xs font-semibold text-gray-500 uppercase tracking-wide">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.map(app => (
                <tr key={app.id} className="hover:bg-gray-50 transition-colors">
                  <td className="p-4">
                    <div className="font-semibold text-sm text-black">{app.jobs?.title || '—'}</div>
                    <div className="text-xs text-gray-500">{app.jobs?.company} · {app.jobs?.location}</div>
                  </td>
                  <td className="p-4 hidden sm:table-cell">
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${app.jobs?.type==='Internship'?'bg-gray-100 text-gray-600':'bg-black text-white'}`}>{app.jobs?.type}</span>
                  </td>
                  <td className="p-4 hidden md:table-cell">
                    <span className="text-xs text-gray-400">{new Date(app.applied_at).toLocaleDateString('en-IN', { day:'2-digit', month:'short' })}</span>
                  </td>
                  <td className="p-4"><Badge status={app.status}/></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
