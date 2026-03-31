'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Plus, MapPin, Clock, Eye, Trash2 } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import type { Job } from '@/lib/supabase'
import Badge from '@/components/ui/Badge'

export default function EmployerJobs() {
  const [jobs, setJobs] = useState<Job[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedJob, setSelectedJob] = useState<Job | null>(null)
  const [applicants, setApplicants] = useState<any[]>([])

  useEffect(() => {
    const load = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return
      const { data } = await supabase.from('jobs').select('*').eq('employer_id', user.id).order('created_at', { ascending: false })
      setJobs(data || [])
      if (data && data.length > 0) setSelectedJob(data[0])
      setLoading(false)
    }
    load()
  }, [])

  useEffect(() => {
    if (!selectedJob) return
    supabase.from('applications')
      .select('*, profiles(name, email, college, course, skills)')
      .eq('job_id', selectedJob.id)
      .then(({ data }) => setApplicants(data || []))
  }, [selectedJob])

  const updateStatus = async (appId: string, status: string) => {
    await supabase.from('applications').update({ status }).eq('id', appId)
    setApplicants(a => a.map(x => x.id === appId ? { ...x, status } : x))
  }

  const deleteJob = async (jobId: string) => {
    if (!confirm('Delete this job posting?')) return
    await supabase.from('jobs').delete().eq('id', jobId)
    setJobs(j => j.filter(x => x.id !== jobId))
    setSelectedJob(null)
  }

  if (loading) return <div className="p-6 flex items-center justify-center min-h-[60vh]"><div className="text-gray-400 text-sm">Loading...</div></div>

  if (jobs.length === 0) return (
    <div className="p-6 max-w-4xl">
      <div className="flex items-center justify-between mb-6">
        <div><h1 className="page-title">My Jobs</h1><p className="text-gray-500 text-sm mt-1">Manage your job postings.</p></div>
        <Link href="/employer/jobs/new" className="btn-primary text-sm flex items-center gap-2"><Plus size={15}/>Post a Job</Link>
      </div>
      <div className="card p-20 text-center">
        <div className="text-5xl mb-4">📋</div>
        <h3 className="font-display font-semibold text-black text-xl mb-2">No jobs posted yet</h3>
        <p className="text-gray-500 text-sm max-w-sm mx-auto mb-6">Post your first job to start receiving applications from students and freshers.</p>
        <Link href="/employer/jobs/new" className="btn-primary px-8 py-3 inline-flex items-center gap-2"><Plus size={15}/>Post your first job</Link>
      </div>
    </div>
  )

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Job list */}
      <div className="w-full md:w-80 flex flex-col border-r border-gray-200 bg-white flex-shrink-0">
        <div className="p-4 border-b border-gray-200 flex items-center justify-between">
          <h1 className="section-title">My Jobs ({jobs.length})</h1>
          <Link href="/employer/jobs/new" className="btn-primary text-xs px-3 py-2 flex items-center gap-1.5"><Plus size={13}/>New</Link>
        </div>
        <div className="flex-1 overflow-y-auto">
          {jobs.map(job => (
            <div key={job.id} onClick={() => setSelectedJob(job)}
              className={`p-4 cursor-pointer border-b border-gray-100 hover:bg-gray-50 transition-colors ${selectedJob?.id === job.id ? 'bg-gray-50 border-l-2 border-l-black' : ''}`}>
              <div className="flex items-start justify-between gap-2 mb-1.5">
                <div className="font-semibold text-sm text-black leading-snug">{job.title}</div>
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium flex-shrink-0 ${job.status==='active'?'bg-black text-white':'bg-gray-100 text-gray-500'}`}>{job.status}</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
                <span className="flex items-center gap-1"><MapPin size={10}/>{job.location || 'Remote'}</span>
                <span>·</span><span>{job.type}</span>
              </div>
              <div className="text-xs text-gray-400">{job.deadline ? `Deadline: ${job.deadline}` : 'No deadline set'}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Applicants detail */}
      {selectedJob && (
        <div className="hidden md:flex flex-1 flex-col bg-white overflow-y-auto">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="font-display text-xl font-bold text-black">{selectedJob.title}</h2>
                <div className="flex items-center gap-3 mt-1.5 text-sm text-gray-500">
                  <span>{selectedJob.company}</span>
                  <span>·</span><span>{selectedJob.location}</span>
                  <span>·</span><span>{selectedJob.type}</span>
                  {selectedJob.pay && <><span>·</span><span>{selectedJob.pay}</span></>}
                </div>
              </div>
              <button onClick={() => deleteJob(selectedJob.id)} className="btn-ghost text-xs px-3 py-2 text-red-500 hover:bg-red-50 flex items-center gap-1.5"><Trash2 size={13}/>Delete</button>
            </div>
            <div className="flex items-center gap-6 mt-4">
              {[
                { label:'Total', count: applicants.length },
                { label:'Applied', count: applicants.filter(a=>a.status==='applied').length },
                { label:'Shortlisted', count: applicants.filter(a=>a.status==='shortlisted').length },
                { label:'Interview', count: applicants.filter(a=>a.status==='interview').length },
                { label:'Hired', count: applicants.filter(a=>a.status==='hired').length },
              ].map(s => (
                <div key={s.label} className="text-center">
                  <div className="font-display font-bold text-black">{s.count}</div>
                  <div className="text-xs text-gray-400">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex-1 p-6">
            {applicants.length === 0 ? (
              <div className="text-center py-20">
                <div className="text-4xl mb-3">📭</div>
                <div className="font-semibold text-black mb-1">No applicants yet</div>
                <div className="text-sm text-gray-400">Share your job posting to attract candidates.</div>
              </div>
            ) : (
              <div className="card overflow-hidden">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-100 bg-gray-50">
                      <th className="text-left p-4 text-xs font-semibold text-gray-500 uppercase tracking-wide">Candidate</th>
                      <th className="text-left p-4 text-xs font-semibold text-gray-500 uppercase tracking-wide hidden md:table-cell">College</th>
                      <th className="text-left p-4 text-xs font-semibold text-gray-500 uppercase tracking-wide">Status</th>
                      <th className="text-left p-4 text-xs font-semibold text-gray-500 uppercase tracking-wide">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {applicants.map((a) => (
                      <tr key={a.id} className="hover:bg-gray-50">
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center font-bold text-gray-600 text-xs flex-shrink-0">
                              {(a.profiles?.name || '?').split(' ').map((n: string) => n[0]).join('').slice(0,2)}
                            </div>
                            <div>
                              <div className="font-semibold text-sm text-black">{a.profiles?.name || 'Unknown'}</div>
                              <div className="text-xs text-gray-400">{a.profiles?.email}</div>
                            </div>
                          </div>
                        </td>
                        <td className="p-4 hidden md:table-cell"><span className="text-xs text-gray-600">{a.profiles?.college || '—'}</span></td>
                        <td className="p-4"><Badge status={a.status}/></td>
                        <td className="p-4">
                          <div className="flex gap-1.5 flex-wrap">
                            {['shortlisted','interview','hired','rejected'].map(s => (
                              <button key={s} onClick={() => updateStatus(a.id, s)}
                                className={`text-xs px-2.5 py-1.5 rounded-lg border font-medium capitalize transition-colors ${a.status===s?'bg-black text-white border-black':'border-gray-200 text-gray-600 hover:border-black'}`}>
                                {s}
                              </button>
                            ))}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
