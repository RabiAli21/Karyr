'use client'
export const dynamic = 'force-dynamic'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'

export default function PostJob() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [form, setForm] = useState({
    title:'', type:'Internship', location:'', locationType:'On-site',
    pay:'', payType:'Monthly stipend', openings:'1',
    deadline:'', description:'', requirements:'', skills:'',
  })
  const set = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) { setError('Not logged in'); setLoading(false); return }

    // Get company name from profile
    const { data: profile } = await supabase.from('profiles').select('company, name').eq('id', user.id).single()
    const company = profile?.company || profile?.name || 'Unknown Company'

    const skillsArray = form.skills ? form.skills.split(',').map(s => s.trim()).filter(Boolean) : []

    const { error: insertError } = await supabase.from('jobs').insert({
      employer_id: user.id,
      company,
      title: form.title,
      type: form.type,
      location: form.location || 'Remote',
      location_type: form.locationType,
      pay: form.pay,
      pay_type: form.payType,
      openings: Number(form.openings),
      description: form.description,
      requirements: form.requirements,
      skills: skillsArray,
      deadline: form.deadline || null,
      status: 'active',
    })

    if (insertError) { setError(insertError.message); setLoading(false); return }
    router.push('/employer/jobs')
  }

  return (
    <div className="p-6 max-w-3xl">
      <div className="flex items-center gap-3 mb-6">
        <Link href="/employer/jobs" className="btn-ghost p-2"><ArrowLeft size={18}/></Link>
        <div>
          <h1 className="page-title">Post a Job</h1>
          <p className="text-gray-500 text-sm mt-0.5">Fill in the details to attract the right candidates.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="card p-6">
          <h2 className="section-title mb-5">Role Details</h2>
          <div className="space-y-4">
            <div>
              <label className="label">Job title <span className="text-red-400">*</span></label>
              <input className="input-field" placeholder="e.g. Software Engineering Intern" required value={form.title} onChange={e=>set('title',e.target.value)}/>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="label">Job type</label>
                <select className="select-field" value={form.type} onChange={e=>set('type',e.target.value)}>
                  <option>Internship</option><option>Full-time</option><option>Part-time</option><option>Contract</option>
                </select>
              </div>
              <div>
                <label className="label">Number of openings</label>
                <input type="number" className="input-field" min="1" value={form.openings} onChange={e=>set('openings',e.target.value)}/>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="label">Location</label>
                <input className="input-field" placeholder="e.g. Bangalore" value={form.location} onChange={e=>set('location',e.target.value)}/>
              </div>
              <div>
                <label className="label">Work mode</label>
                <select className="select-field" value={form.locationType} onChange={e=>set('locationType',e.target.value)}>
                  <option>On-site</option><option>Remote</option><option>Hybrid</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <div className="card p-6">
          <h2 className="section-title mb-5">Compensation</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="label">Pay type</label>
              <select className="select-field" value={form.payType} onChange={e=>set('payType',e.target.value)}>
                <option>Monthly stipend</option><option>Annual CTC</option><option>Hourly rate</option><option>Unpaid</option>
              </select>
            </div>
            <div>
              <label className="label">Amount</label>
              <input className="input-field" placeholder="e.g. ₹40,000 or ₹8–12 LPA" value={form.pay} onChange={e=>set('pay',e.target.value)}/>
            </div>
          </div>
        </div>

        <div className="card p-6">
          <h2 className="section-title mb-5">Job Description</h2>
          <div className="space-y-4">
            <div>
              <label className="label">About this role <span className="text-red-400">*</span></label>
              <textarea className="input-field resize-none" rows={5} placeholder="Describe the role, responsibilities, and what the candidate will work on..." required value={form.description} onChange={e=>set('description',e.target.value)}/>
            </div>
            <div>
              <label className="label">Requirements</label>
              <textarea className="input-field resize-none" rows={3} placeholder="List qualifications, skills, and experience expected..." value={form.requirements} onChange={e=>set('requirements',e.target.value)}/>
            </div>
            <div>
              <label className="label">Required skills</label>
              <input className="input-field" placeholder="e.g. Python, SQL, React (comma-separated)" value={form.skills} onChange={e=>set('skills',e.target.value)}/>
            </div>
          </div>
        </div>

        <div className="card p-6">
          <h2 className="section-title mb-5">Application Settings</h2>
          <div>
            <label className="label">Application deadline</label>
            <input type="date" className="input-field max-w-xs" value={form.deadline} onChange={e=>set('deadline',e.target.value)}/>
          </div>
        </div>

        {error && <div className="bg-red-50 border border-red-200 text-red-600 text-sm p-3 rounded-lg">{error}</div>}

        <div className="flex gap-3 pb-6">
          <button type="submit" disabled={loading} className="btn-primary px-8 py-3">
            {loading ? 'Publishing...' : 'Publish Job'}
          </button>
          <Link href="/employer/jobs" className="btn-secondary px-6 py-3">Cancel</Link>
        </div>
      </form>
    </div>
  )
}
