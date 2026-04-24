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

export default function ConjecturesEditor() {
  const [d, setD] = useState(null);
  const [imgFile, setImgFile] = useState(null);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState('');

  useEffect(() => {
    api.get('/site-content').then(r => setD(r.data.conjectures || {}));
  }, []);

  const set = (k, v) => setD(p => ({ ...p, [k]: v }));

  const handleSave = async () => {
    setSaving(true); setMsg('');
    try {
      const form = new FormData();
      form.append('conjectures', JSON.stringify(d));
      if (imgFile) form.append('conjecturesImage', imgFile);
      await api.put('/site-content', form, { headers: { 'Content-Type': 'multipart/form-data' } });
      setMsg('Saved!'); setImgFile(null);
      api.get('/site-content').then(r => setD(r.data.conjectures || {}));
    } catch { setMsg('Error saving.'); } finally { setSaving(false); }
  };

  if (!d) return <AdminLayout><p className="text-gray-400">Loading…</p></AdminLayout>;

  return (
    <AdminLayout>
      <div className="max-w-3xl space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Conjectures Exhibition Page</h2>
          <button onClick={handleSave} disabled={saving} className="flex items-center gap-2 px-4 py-2 bg-black text-white hover:bg-gray-800 text-sm rounded disabled:opacity-50">
            <Save size={16} /> {saving ? 'Saving…' : 'Save All'}
          </button>
        </div>
        {msg && <p className={`text-sm ${msg === 'Saved!' ? 'text-green-600' : 'text-red-600'}`}>{msg}</p>}

        <div className="bg-white shadow rounded p-6 space-y-4">
          <h3 className="font-semibold text-lg">Page Header</h3>
          <Field label="Label (small caps)" value={d.label} onChange={v => set('label', v)} />
          <Field label="Title" value={d.title} onChange={v => set('title', v)} />
          <Field label="Subtitle" value={d.subtitle} onChange={v => set('subtitle', v)} />
          <Field label="Dates" value={d.dates} onChange={v => set('dates', v)} />
        </div>

        <div className="bg-white shadow rounded p-6 space-y-4">
          <h3 className="font-semibold text-lg">Hero Image</h3>
          {resolveImg(d.imageUrl) && <img src={resolveImg(d.imageUrl)} alt="" className="w-full h-48 object-cover rounded mb-2" />}
          <input type="file" accept="image/*" className="text-sm" onChange={e => setImgFile(e.target.files[0])} />
          {imgFile && <p className="text-xs text-gray-400 mt-1">{imgFile.name}</p>}
        </div>

        <div className="bg-white shadow rounded p-6 space-y-4">
          <h3 className="font-semibold text-lg">Body Content</h3>
          <Field label="Lead Paragraph" value={d.leadParagraph} onChange={v => set('leadParagraph', v)} rows={3} />
          <Field label="Body Paragraph 1" value={d.body1} onChange={v => set('body1', v)} rows={4} />
          <Field label="Body Paragraph 2" value={d.body2} onChange={v => set('body2', v)} rows={4} />
        </div>

        <div className="bg-white shadow rounded p-6 space-y-4">
          <h3 className="font-semibold text-lg">Exhibition Details</h3>
          <Field label="Section Heading" value={d.detailsHeading} onChange={v => set('detailsHeading', v)} />
          <div className="grid grid-cols-2 gap-4">
            <Field label="Venue" value={d.detailVenue} onChange={v => set('detailVenue', v)} />
            <Field label="Dates" value={d.detailDates} onChange={v => set('detailDates', v)} />
            <Field label="Curator" value={d.detailCurator} onChange={v => set('detailCurator', v)} />
            <Field label="Artist" value={d.detailArtist} onChange={v => set('detailArtist', v)} />
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
