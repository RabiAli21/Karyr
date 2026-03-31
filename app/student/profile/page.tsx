'use client'
import { useState, useEffect } from 'react'
import { Upload, Plus, X } from 'lucide-react'
import { supabase } from '@/lib/supabase'

const suggestedSkills = ['Python','JavaScript','React','SQL','Machine Learning','Figma','Node.js','TypeScript','Excel','Communication']

export default function StudentProfile() {
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [skills, setSkills] = useState<string[]>([])
  const [newSkill, setNewSkill] = useState('')
  const [form, setForm] = useState({ name:'', email:'', phone:'', city:'', headline:'', college:'', course:'', gradYear:'2026', preferredRole:'', jobType:'both' })
  const set = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }))

  useEffect(() => {
    const load = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return
      const { data: profile } = await supabase.from('profiles').select('*').eq('id', user.id).single()
      if (profile) {
        setForm({
          name: profile.name || '',
          email: profile.email || user.email || '',
          phone: profile.phone || '',
          city: profile.city || '',
          headline: profile.headline || '',
          college: profile.college || '',
          course: profile.course || '',
          gradYear: profile.grad_year?.toString() || '2026',
          preferredRole: profile.preferred_role || '',
          jobType: 'both',
        })
        setSkills(profile.skills || [])
      } else {
        setForm(f => ({ ...f, email: user.email || '' }))
      }
      setLoading(false)
    }
    load()
  }, [])

  const addSkill = (s: string) => { if (s && !skills.includes(s)) setSkills(p => [...p, s]); setNewSkill('') }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return
    await supabase.from('profiles').upsert({
      id: user.id, email: user.email,
      name: form.name, phone: form.phone, city: form.city,
      headline: form.headline, college: form.college, course: form.course,
      grad_year: Number(form.gradYear), preferred_role: form.preferredRole,
      skills, role: 'student',
    })
    setSaving(false)
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
  }

  if (loading) return <div className="p-6 flex items-center justify-center min-h-[60vh]"><div className="text-gray-400 text-sm">Loading profile...</div></div>

  return (
    <div className="p-6 max-w-3xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="page-title">My Profile</h1>
          <p className="text-gray-500 text-sm mt-1">Keep your profile updated to attract the best opportunities.</p>
        </div>
        {saved && <span className="text-sm text-green-600 font-medium bg-green-50 px-3 py-1.5 rounded-lg border border-green-200">✓ Saved!</span>}
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        <div className="card p-6">
          <h2 className="section-title mb-5">Basic Information</h2>
          <div className="flex items-center gap-4 mb-5">
            <div className="w-16 h-16 rounded-full bg-black text-white flex items-center justify-center font-display text-2xl font-bold">
              {form.name.split(' ').map(n=>n[0]).join('').slice(0,2).toUpperCase() || '?'}
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div><label className="label">Full name</label><input className="input-field" required value={form.name} onChange={e=>set('name',e.target.value)}/></div>
            <div><label className="label">Email</label><input type="email" className="input-field bg-gray-50" value={form.email} readOnly/></div>
            <div><label className="label">Phone</label><input type="tel" className="input-field" placeholder="+91 98765 43210" value={form.phone} onChange={e=>set('phone',e.target.value)}/></div>
            <div><label className="label">City</label><input className="input-field" placeholder="e.g. Mumbai" value={form.city} onChange={e=>set('city',e.target.value)}/></div>
            <div className="sm:col-span-2">
              <label className="label">Headline</label>
              <input className="input-field" placeholder="e.g. Final year CS student seeking SWE roles" value={form.headline} onChange={e=>set('headline',e.target.value)}/>
            </div>
          </div>
        </div>

        <div className="card p-6">
          <h2 className="section-title mb-5">Education</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2"><label className="label">College / University</label><input className="input-field" placeholder="Your college name" required value={form.college} onChange={e=>set('college',e.target.value)}/></div>
            <div><label className="label">Degree & Course</label><input className="input-field" placeholder="e.g. B.Tech CSE" value={form.course} onChange={e=>set('course',e.target.value)}/></div>
            <div>
              <label className="label">Graduation Year</label>
              <select className="select-field" value={form.gradYear} onChange={e=>set('gradYear',e.target.value)}>
                {[2024,2025,2026,2027,2028].map(y=><option key={y}>{y}</option>)}
              </select>
            </div>
          </div>
        </div>

        <div className="card p-6">
          <h2 className="section-title mb-5">Skills</h2>
          <div className="flex flex-wrap gap-2 mb-4">
            {skills.map(s=>(
              <span key={s} className="flex items-center gap-1.5 bg-gray-100 text-gray-700 px-3 py-1.5 rounded-lg text-sm font-medium">
                {s}<button type="button" onClick={()=>setSkills(p=>p.filter(x=>x!==s))}><X size={13} className="text-gray-400 hover:text-black"/></button>
              </span>
            ))}
            {skills.length === 0 && <p className="text-sm text-gray-400">No skills added yet.</p>}
          </div>
          <div className="flex gap-2 mb-3">
            <input className="input-field flex-1" placeholder="Add a skill..." value={newSkill} onChange={e=>setNewSkill(e.target.value)}
              onKeyDown={e=>e.key==='Enter'&&(e.preventDefault(),addSkill(newSkill))}/>
            <button type="button" onClick={()=>addSkill(newSkill)} className="btn-secondary px-4 text-sm">Add</button>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {suggestedSkills.filter(s=>!skills.includes(s)).map(s=>(
              <button type="button" key={s} onClick={()=>addSkill(s)}
                className="flex items-center gap-1 text-xs bg-white border border-gray-200 text-gray-600 px-2.5 py-1 rounded-full hover:border-black hover:text-black transition-colors">
                <Plus size={10}/>{s}
              </button>
            ))}
          </div>
        </div>

        <div className="card p-6">
          <h2 className="section-title mb-5">Job Preferences</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="label">Preferred role</label>
              <select className="select-field" value={form.preferredRole} onChange={e=>set('preferredRole',e.target.value)}>
                <option value="">Select role</option>
                <option value="software-engineer">Software Engineer</option>
                <option value="data-analyst">Data Analyst</option>
                <option value="product-manager">Product Manager</option>
                <option value="designer">UX/UI Designer</option>
                <option value="ml-engineer">ML Engineer</option>
                <option value="data-engineer">Data Engineer</option>
                <option value="marketing">Marketing</option>
                <option value="operations">Operations</option>
              </select>
            </div>
            <div>
              <label className="label">Job type</label>
              <select className="select-field" value={form.jobType} onChange={e=>set('jobType',e.target.value)}>
                <option value="internship">Internship only</option>
                <option value="full-time">Full-time only</option>
                <option value="both">Both</option>
              </select>
            </div>
          </div>
        </div>

        <div className="card p-6">
          <h2 className="section-title mb-2">Resume</h2>
          <p className="text-gray-500 text-xs mb-4">PDF format, max 5MB.</p>
          <div className="border-2 border-dashed border-gray-200 rounded-xl p-8 text-center hover:border-black transition-colors cursor-pointer group">
            <Upload size={24} className="mx-auto text-gray-400 group-hover:text-black mb-2 transition-colors"/>
            <p className="text-sm font-medium text-gray-700">Drop your resume here or <span className="text-black underline">browse</span></p>
            <p className="text-xs text-gray-400 mt-1">PDF, DOC, DOCX up to 5MB</p>
          </div>
        </div>

        <div className="flex gap-3 pb-6">
          <button type="submit" disabled={saving} className="btn-primary px-8 py-3">{saving ? 'Saving...' : 'Save Profile'}</button>
        </div>
      </form>
    </div>
  )
}
