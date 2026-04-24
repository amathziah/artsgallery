import React, { useState, useEffect } from 'react';
import AdminLayout from '../components/AdminLayout';
import api from '../utils/api';
import { Save } from 'lucide-react';

const BACKEND = 'http://localhost:5001';
const resolveImg = (url) => url ? (url.startsWith('/') ? `${BACKEND}${url}` : url) : null;

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

export default function HomepageSectionsEditor() {
  const [d, setD] = useState(null);
  const [bgFile, setBgFile] = useState(null);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState('');

  useEffect(() => {
    api.get('/site-content').then(r => setD(r.data));
  }, []);

  const set = (k, v) => setD(p => ({ ...p, [k]: v }));

  const handleSave = async () => {
    setSaving(true); setMsg('');
    try {
      const form = new FormData();
      form.append('programsSectionLabel', d.programsSectionLabel || '');
      form.append('programsSectionHeading', d.programsSectionHeading || '');
      form.append('grantsSectionLabel', d.grantsSectionLabel || '');
      form.append('grantsSectionHeading', d.grantsSectionHeading || '');
      form.append('grantsSectionCta', d.grantsSectionCta || '');
      if (bgFile) form.append('grantsBgImage', bgFile);
      await api.put('/site-content', form, { headers: { 'Content-Type': 'multipart/form-data' } });
      setMsg('Saved!'); setBgFile(null);
      api.get('/site-content').then(r => setD(r.data));
    } catch { setMsg('Error saving.'); } finally { setSaving(false); }
  };

  if (!d) return <AdminLayout><p className="text-gray-400">Loading…</p></AdminLayout>;

  return (
    <AdminLayout>
      <div className="max-w-3xl space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Homepage Sections</h2>
          <button onClick={handleSave} disabled={saving} className="flex items-center gap-2 px-4 py-2 bg-black text-white hover:bg-gray-800 text-sm rounded disabled:opacity-50">
            <Save size={16} /> {saving ? 'Saving…' : 'Save All'}
          </button>
        </div>
        {msg && <p className={`text-sm ${msg === 'Saved!' ? 'text-green-600' : 'text-red-600'}`}>{msg}</p>}

        <div className="bg-white shadow rounded p-6 space-y-4">
          <h3 className="font-semibold text-lg">Programs Section</h3>
          <Field label="Section Label (small caps)" value={d.programsSectionLabel} onChange={v => set('programsSectionLabel', v)} />
          <Field label="Section Heading" value={d.programsSectionHeading} onChange={v => set('programsSectionHeading', v)} />
        </div>

        <div className="bg-white shadow rounded p-6 space-y-4">
          <h3 className="font-semibold text-lg">Grants Section</h3>
          <Field label="Section Label (small caps)" value={d.grantsSectionLabel} onChange={v => set('grantsSectionLabel', v)} />
          <Field label="Section Heading" value={d.grantsSectionHeading} onChange={v => set('grantsSectionHeading', v)} />
          <Field label="CTA Button Text" value={d.grantsSectionCta} onChange={v => set('grantsSectionCta', v)} />
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Background Image (Grants Page & Section)</label>
            {resolveImg(d.grantsPageBgImage) && (
              <img src={resolveImg(d.grantsPageBgImage)} alt="" className="w-full h-32 object-cover rounded mb-2" />
            )}
            <input type="file" accept="image/*" className="text-sm" onChange={e => setBgFile(e.target.files[0])} />
            {bgFile && <p className="text-xs text-gray-400 mt-1">{bgFile.name}</p>}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
