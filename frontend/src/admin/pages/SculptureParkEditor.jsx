import React, { useState, useEffect } from 'react';
import AdminLayout from '../components/AdminLayout';
import api from '../utils/api';
import { Save, Plus, Trash2, ChevronDown, ChevronUp } from 'lucide-react';

const BACKEND = 'http://localhost:5001';
const resolveImg = (url) => url ? (url.startsWith('/') ? `${BACKEND}${url}` : url) : null;

function Section({ title, children, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="bg-white shadow rounded overflow-hidden">
      <button onClick={() => setOpen(!open)} className="w-full flex justify-between items-center px-6 py-4 text-left font-semibold text-gray-900 hover:bg-gray-50">
        {title} {open ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
      </button>
      {open && <div className="px-6 pb-6 space-y-4 border-t border-gray-100 pt-4">{children}</div>}
    </div>
  );
}

function Field({ label, value, onChange, rows }) {
  return (
    <div>
      <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">{label}</label>
      {rows
        ? <textarea rows={rows} className="w-full border border-gray-200 rounded px-3 py-2 text-sm" value={value || ''} onChange={e => onChange(e.target.value)} />
        : <input className="w-full border border-gray-200 rounded px-3 py-2 text-sm" value={value || ''} onChange={e => onChange(e.target.value)} />}
    </div>
  );
}

export default function SculptureParkEditor() {
  const [d, setD] = useState(null);
  const [files, setFiles] = useState({});
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState('');

  useEffect(() => {
    api.get('/site-content').then(r => setD(r.data.sculpturePark || {}));
  }, []);

  const set = (k, v) => setD(p => ({ ...p, [k]: v }));
  const setArr = (arr, i, k, v) => setD(p => {
    const copy = [...(p[arr] || [])];
    copy[i] = { ...copy[i], [k]: v };
    return { ...p, [arr]: copy };
  });
  const addToArr = (arr, tmpl) => setD(p => ({ ...p, [arr]: [...(p[arr] || []), tmpl] }));
  const removeFromArr = (arr, i) => setD(p => ({ ...p, [arr]: p[arr].filter((_, idx) => idx !== i) }));

  const handleSave = async () => {
    setSaving(true); setMsg('');
    try {
      const form = new FormData();
      form.append('sculpturePark', JSON.stringify(d));
      if (files.spHeroImage) form.append('spHeroImage', files.spHeroImage);
      if (files.spLogoImage) form.append('spLogoImage', files.spLogoImage);
      await api.put('/site-content', form, { headers: { 'Content-Type': 'multipart/form-data' } });
      setMsg('Saved!'); setFiles({});
      api.get('/site-content').then(r => setD(r.data.sculpturePark || {}));
    } catch { setMsg('Error saving.'); } finally { setSaving(false); }
  };

  if (!d) return <AdminLayout><p className="text-gray-400">Loading…</p></AdminLayout>;

  return (
    <AdminLayout>
      <div className="max-w-3xl space-y-4">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-2xl font-bold">Sculpture Park Page</h2>
          <button onClick={handleSave} disabled={saving} className="flex items-center gap-2 px-4 py-2 bg-black text-white hover:bg-gray-800 text-sm rounded disabled:opacity-50">
            <Save size={16} /> {saving ? 'Saving…' : 'Save All'}
          </button>
        </div>
        {msg && <p className={`text-sm ${msg === 'Saved!' ? 'text-green-600' : 'text-red-600'}`}>{msg}</p>}

        <Section title="Page Header" defaultOpen>
          <Field label="Label (small caps)" value={d.pageLabel} onChange={v => set('pageLabel', v)} />
          <Field label="Page Title" value={d.pageTitle} onChange={v => set('pageTitle', v)} />
          <Field label="Page Subtitle" value={d.pageSubtitle} onChange={v => set('pageSubtitle', v)} rows={2} />
          <Field label="Official Website URL" value={d.officialWebsite} onChange={v => set('officialWebsite', v)} />
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Hero Image</label>
              {resolveImg(d.heroImageUrl) && <img src={resolveImg(d.heroImageUrl)} alt="" className="w-full h-24 object-cover rounded mb-2" />}
              <input type="file" accept="image/*" className="text-sm" onChange={e => setFiles(p => ({ ...p, spHeroImage: e.target.files[0] }))} />
              {files.spHeroImage && <p className="text-xs text-gray-400 mt-1">{files.spHeroImage.name}</p>}
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Logo Image</label>
              {resolveImg(d.logoImageUrl) && <img src={resolveImg(d.logoImageUrl)} alt="" className="w-20 h-20 object-contain rounded mb-2" />}
              <input type="file" accept="image/*" className="text-sm" onChange={e => setFiles(p => ({ ...p, spLogoImage: e.target.files[0] }))} />
              {files.spLogoImage && <p className="text-xs text-gray-400 mt-1">{files.spLogoImage.name}</p>}
            </div>
          </div>
        </Section>

        <Section title="Tab: Founding">
          <Field label="Tab Title" value={d.foundingTitle} onChange={v => set('foundingTitle', v)} />
          <Field label="Body Paragraph 1" value={d.foundingBody1} onChange={v => set('foundingBody1', v)} rows={4} />
          <Field label="Body Paragraph 2" value={d.foundingBody2} onChange={v => set('foundingBody2', v)} rows={4} />
        </Section>

        <Section title="Tab: Evolution">
          <Field label="Tab Title" value={d.evolutionTitle} onChange={v => set('evolutionTitle', v)} />
          <Field label="Intro" value={d.evolutionIntro} onChange={v => set('evolutionIntro', v)} rows={2} />
          <div className="space-y-3">
            <p className="text-xs font-semibold text-gray-500 uppercase">Milestones</p>
            {(d.evolutionMilestones || []).map((m, i) => (
              <div key={i} className="border border-gray-100 rounded p-3 space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm font-medium">Milestone {i + 1}</span>
                  <button onClick={() => removeFromArr('evolutionMilestones', i)} className="text-red-500 hover:text-red-700"><Trash2 size={14} /></button>
                </div>
                <Field label="Heading" value={m.heading} onChange={v => setArr('evolutionMilestones', i, 'heading', v)} />
                <Field label="Body" value={m.body} onChange={v => setArr('evolutionMilestones', i, 'body', v)} rows={3} />
              </div>
            ))}
            <button onClick={() => addToArr('evolutionMilestones', { heading: '', body: '' })}
              className="flex items-center gap-2 px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-sm rounded">
              <Plus size={14} /> Add Milestone
            </button>
          </div>
        </Section>

        <Section title="Tab: Impact">
          <Field label="Tab Title" value={d.impactTitle} onChange={v => set('impactTitle', v)} />
          <Field label="Body Paragraph 1" value={d.impactBody1} onChange={v => set('impactBody1', v)} rows={3} />
          <Field label="Body Paragraph 2" value={d.impactBody2} onChange={v => set('impactBody2', v)} rows={3} />
          <div className="space-y-3">
            <p className="text-xs font-semibold text-gray-500 uppercase">Stats</p>
            {(d.impactStats || []).map((s, i) => (
              <div key={i} className="flex gap-3 items-center">
                <input className="border border-gray-200 rounded px-3 py-2 text-sm w-24" placeholder="Value" value={s.value || ''} onChange={e => setArr('impactStats', i, 'value', e.target.value)} />
                <input className="border border-gray-200 rounded px-3 py-2 text-sm flex-1" placeholder="Label" value={s.label || ''} onChange={e => setArr('impactStats', i, 'label', e.target.value)} />
                <button onClick={() => removeFromArr('impactStats', i)} className="text-red-500 hover:text-red-700"><Trash2 size={14} /></button>
              </div>
            ))}
            <button onClick={() => addToArr('impactStats', { value: '', label: '' })}
              className="flex items-center gap-2 px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-sm rounded">
              <Plus size={14} /> Add Stat
            </button>
          </div>
        </Section>

        <Section title="Tab: Support">
          <Field label="Tab Title" value={d.supportTitle} onChange={v => set('supportTitle', v)} />
          <Field label="Intro" value={d.supportIntro} onChange={v => set('supportIntro', v)} rows={2} />
          <div className="space-y-3">
            <p className="text-xs font-semibold text-gray-500 uppercase">Support Items</p>
            {(d.supportItems || []).map((s, i) => (
              <div key={i} className="border border-gray-100 rounded p-3 space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm font-medium">Item {i + 1}</span>
                  <button onClick={() => removeFromArr('supportItems', i)} className="text-red-500 hover:text-red-700"><Trash2 size={14} /></button>
                </div>
                <Field label="Title" value={s.title} onChange={v => setArr('supportItems', i, 'title', v)} />
                <Field label="Body" value={s.body} onChange={v => setArr('supportItems', i, 'body', v)} rows={3} />
              </div>
            ))}
            <button onClick={() => addToArr('supportItems', { title: '', body: '' })}
              className="flex items-center gap-2 px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-sm rounded">
              <Plus size={14} /> Add Item
            </button>
          </div>
          <Field label="Closing Note (italic)" value={d.supportNote} onChange={v => set('supportNote', v)} rows={2} />
        </Section>

        <Section title="Visit Us">
          <Field label="Section Title" value={d.visitTitle} onChange={v => set('visitTitle', v)} />
          <Field label="Venue Name" value={d.visitVenueName} onChange={v => set('visitVenueName', v)} />
          <Field label="Venue Description" value={d.visitVenueDesc} onChange={v => set('visitVenueDesc', v)} rows={2} />
          <Field label="Directions URL" value={d.visitDirectionsUrl} onChange={v => set('visitDirectionsUrl', v)} />
          <Field label="Google Maps Embed URL" value={d.visitMapEmbed} onChange={v => set('visitMapEmbed', v)} rows={3} />
        </Section>
      </div>
    </AdminLayout>
  );
}
