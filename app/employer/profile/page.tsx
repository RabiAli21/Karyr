'use client'
export const dynamic = 'force-dynamic'
import { useState, useEffect } from 'react'
import { Globe, MapPin, Users } from 'lucide-react'
import { supabase } from '@/lib/supabase'

export default function EmployerProfile() {
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [form, setForm] = useState({ name:'', company:'', website:'', location:'', industry:'technology', size:'51-200', about:'', email:'', phone:'' })
  const set = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }))

  useEffect(() => {
    const load = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return
      const { data: p } = await supabase.from('profiles').select('*').eq('id', user.id).single()
      if (p) setForm({ name: p.recruiter_name||p.name||'', company: p.company||'', website: p.company_website||'', location: p.city||'', industry:'technology', size:'51-200', about: p.company_about||'', email: p.email||user.email||'', phone: p.phone||'' })
      else setForm(f => ({ ...f, email: user.email||'' }))
      setLoading(false)
    }
    load()
  }, [])

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return
    await supabase.from('profiles').upsert({ id: user.id, email: user.email, role: 'employer', name: form.name, recruiter_name: form.name, company: form.company, company_website: form.website, company_about: form.about, city: form.location, phone: form.phone })
    setSaving(false); setSaved(true); setTimeout(() => setSaved(false), 2500)
  }

  if (loading) return <div className="p-6 flex items-center justify-center min-h-[60vh]"><div className="text-gray-400 text-sm">Loading...</div></div>

  return (
    <div className="p-6 max-w-3xl">
      <div className="flex items-center justify-between mb-6">
        <div><h1 className="page-title">Company Profile</h1><p className="text-gray-500 text-sm mt-1">A strong profile helps attract better candidates.</p></div>
        {saved && <span className="text-sm text-green-600 font-medium bg-green-50 px-3 py-1.5 rounded-lg border border-green-200">✓ Saved!</span>}
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        <div className="card p-6">
          <h2 className="section-title mb-5">Company Information</h2>
          <div className="flex items-center gap-4 mb-5">
            <div className="w-16 h-16 rounded-xl bg-black text-white flex items-center justify-center font-display text-2xl font-bold">
              {(form.company||'C').charAt(0).toUpperCase()}
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2"><label className="label">Company name <span className="text-red-400">*</span></label><input className="input-field" required value={form.company} onChange={e=>set('company',e.target.value)}/></div>
            <div>
              <label className="label">Website</label>
              <div className="relative"><Globe size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"/><input type="url" className="input-field pl-9" placeholder="https://yourcompany.com" value={form.website} onChange={e=>set('website',e.target.value)}/></div>
            </div>
            <div>
              <label className="label">Headquarters</label>
              <div className="relative"><MapPin size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"/><input className="input-field pl-9" placeholder="City, State" value={form.location} onChange={e=>set('location',e.target.value)}/></div>
            </div>
            <div>
              <label className="label">Industry</label>
              <select className="select-field" value={form.industry} onChange={e=>set('industry',e.target.value)}>
                <option value="technology">Technology</option><option value="finance">Finance & Fintech</option><option value="ecommerce">E-commerce</option><option value="edtech">EdTech</option><option value="healthcare">Healthcare</option><option value="consulting">Consulting</option><option value="other">Other</option>
              </select>
            </div>
            <div>
              <label className="label">Company size</label>
              <div className="relative"><Users size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"/>
                <select className="select-field pl-9" value={form.size} onChange={e=>set('size',e.target.value)}>
                  <option>1–10</option><option>11–50</option><option>51–200</option><option>201–500</option><option>500+</option>
                </select>
              </div>
            </div>
            <div className="sm:col-span-2"><label className="label">About the company</label><textarea className="input-field resize-none" rows={4} placeholder="Tell students about your company, culture, and what you do..." value={form.about} onChange={e=>set('about',e.target.value)}/></div>
          </div>
        </div>

        <div className="card p-6">
          <h2 className="section-title mb-5">Recruiter Contact</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div><label className="label">Your name</label><input className="input-field" value={form.name} onChange={e=>set('name',e.target.value)}/></div>
            <div><label className="label">Work email</label><input type="email" className="input-field bg-gray-50" value={form.email} readOnly/></div>
            <div><label className="label">Phone</label><input type="tel" className="input-field" placeholder="+91 98765 43210" value={form.phone} onChange={e=>set('phone',e.target.value)}/></div>
          </div>
        </div>

        <div className="flex gap-3 pb-6">
          <button type="submit" disabled={saving} className="btn-primary px-8 py-3">{saving ? 'Saving...' : 'Save Profile'}</button>
        </div>
      </form>
    </div>
  )
}
