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
      {open && <div className="px-6 pb-6 space-y-4 border-t border-gray-100">{children}</div>}
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

function ImgField({ label, current, fileKey, files, onFile }) {
  const src = resolveImg(current);
  return (
    <div>
      <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">{label}</label>
      {src && <img src={src} alt="" className="w-24 h-24 object-cover rounded mb-2" onError={e => e.target.style.display = 'none'} />}
      <input type="file" accept="image/*" className="text-sm" onChange={e => onFile(fileKey, e.target.files[0])} />
      {files[fileKey] && <p className="text-xs text-gray-400 mt-1">{files[fileKey].name}</p>}
    </div>
  );
}

export default function GrantsEditor() {
  const [d, setD] = useState(null);
  const [files, setFiles] = useState({});
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState('');

  useEffect(() => {
    api.get('/site-content').then(r => setD(r.data.grants || {}));
  }, []);

  const set = (path, val) => {
    setD(prev => {
      const next = { ...prev };
      const keys = path.split('.');
      let cur = next;
      for (let i = 0; i < keys.length - 1; i++) {
        cur[keys[i]] = { ...cur[keys[i]] };
        cur = cur[keys[i]];
      }
      cur[keys[keys.length - 1]] = val;
      return next;
    });
  };

  const setArr = (arr, i, field, val) => {
    setD(prev => {
      const copy = [...(prev[arr] || [])];
      copy[i] = { ...copy[i], [field]: val };
      return { ...prev, [arr]: copy };
    });
  };

  const addToArr = (arr, template) => setD(prev => ({ ...prev, [arr]: [...(prev[arr] || []), template] }));
  const removeFromArr = (arr, i) => setD(prev => ({ ...prev, [arr]: prev[arr].filter((_, idx) => idx !== i) }));

  const onFile = (key, file) => setFiles(prev => ({ ...prev, [key]: file }));

  const handleSave = async () => {
    setSaving(true); setMsg('');
    try {
      const form = new FormData();
      form.append('grants', JSON.stringify(d));
      if (files.awardeeImage) form.append('awardeeImage', files.awardeeImage);
      if (files.juryImages) files.juryImages.forEach(f => f && form.append('juryImages', f));
      if (files.archiveImages) files.archiveImages.forEach(f => f && form.append('archiveImages', f));
      // append individual jury/archive images
      Object.entries(files).forEach(([k, v]) => {
        if (k.startsWith('jury_') && v) form.append('juryImages', v);
        if (k.startsWith('archive_') && v) form.append('archiveImages', v);
      });
      await api.put('/site-content', form, { headers: { 'Content-Type': 'multipart/form-data' } });
      setMsg('Saved!'); setFiles({});
      api.get('/site-content').then(r => setD(r.data.grants || {}));
    } catch { setMsg('Error saving.'); } finally { setSaving(false); }
  };

  if (!d) return <AdminLayout><p className="text-gray-400">Loading…</p></AdminLayout>;

  return (
    <AdminLayout>
      <div className="max-w-3xl space-y-4">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-2xl font-bold">Grants Page</h2>
          <button onClick={handleSave} disabled={saving} className="flex items-center gap-2 px-4 py-2 bg-black text-white hover:bg-gray-800 text-sm rounded disabled:opacity-50">
            <Save size={16} /> {saving ? 'Saving…' : 'Save All'}
          </button>
        </div>
        {msg && <p className={`text-sm ${msg === 'Saved!' ? 'text-green-600' : 'text-red-600'}`}>{msg}</p>}

        {/* Page Header */}
        <Section title="Page Header" defaultOpen>
          <Field label="Label (small caps above title)" value={d.pageLabel} onChange={v => set('pageLabel', v)} />
          <Field label="Page Title" value={d.pageTitle} onChange={v => set('pageTitle', v)} />
          <Field label="Page Subtitle" value={d.pageSubtitle} onChange={v => set('pageSubtitle', v)} rows={2} />
          <div className="grid grid-cols-2 gap-3">
            <Field label="Current Tab Label" value={d.currentTabLabel} onChange={v => set('currentTabLabel', v)} />
            <Field label="Archive Tab Label" value={d.archiveTabLabel} onChange={v => set('archiveTabLabel', v)} />
          </div>
        </Section>

        {/* Current Grant */}
        <Section title="Current Grant — SSA-IAF">
          <Field label="Grant Title" value={d.currentGrantTitle} onChange={v => set('currentGrantTitle', v)} />
          <Field label="Body Paragraph 1" value={d.currentGrantBody1} onChange={v => set('currentGrantBody1', v)} rows={3} />
          <Field label="Body Paragraph 2" value={d.currentGrantBody2} onChange={v => set('currentGrantBody2', v)} rows={3} />
          <div className="grid grid-cols-2 gap-3">
            <Field label="Structure Box Title" value={d.currentStructureTitle} onChange={v => set('currentStructureTitle', v)} />
            <Field label="Eligibility Box Title" value={d.currentEligibilityTitle} onChange={v => set('currentEligibilityTitle', v)} />
          </div>
          <Field label="Structure Body" value={d.currentStructureBody} onChange={v => set('currentStructureBody', v)} rows={4} />
          <Field label="Eligibility Body" value={d.currentEligibilityBody} onChange={v => set('currentEligibilityBody', v)} rows={4} />
          <div className="grid grid-cols-2 gap-3">
            <Field label="Awardee Section Heading" value={d.currentAwardeeHeading} onChange={v => set('currentAwardeeHeading', v)} />
            <Field label="Jury Section Heading" value={d.currentJuryHeading} onChange={v => set('currentJuryHeading', v)} />
          </div>
        </Section>

        {/* Awardee */}
        <Section title="Current Awardee">
          <div className="grid grid-cols-2 gap-3">
            <Field label="Name" value={d.awardee?.name} onChange={v => set('awardee.name', v)} />
            <Field label="Role / Year" value={d.awardee?.role} onChange={v => set('awardee.role', v)} />
          </div>
          <Field label="Bio" value={d.awardee?.bio} onChange={v => set('awardee.bio', v)} rows={5} />
          <ImgField label="Photo" current={d.awardee?.imageUrl} fileKey="awardeeImage" files={files} onFile={onFile} />
        </Section>

        {/* Jury */}
        <Section title="Jury Members">
          {(d.jury || []).map((p, i) => (
            <div key={i} className="border border-gray-100 rounded p-4 space-y-3">
              <div className="flex justify-between items-center">
                <h4 className="font-medium text-sm">{p.name || `Jury Member ${i + 1}`}</h4>
                <button onClick={() => removeFromArr('jury', i)} className="text-red-500 hover:text-red-700"><Trash2 size={15} /></button>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <Field label="Name" value={p.name} onChange={v => setArr('jury', i, 'name', v)} />
                <Field label="Role" value={p.role} onChange={v => setArr('jury', i, 'role', v)} />
              </div>
              <Field label="Bio" value={p.bio} onChange={v => setArr('jury', i, 'bio', v)} rows={3} />
              <ImgField label="Photo" current={p.imageUrl} fileKey={`jury_${i}`} files={files} onFile={onFile} />
            </div>
          ))}
          <button onClick={() => addToArr('jury', { name: '', role: '2025-26 Jury', bio: '', imageUrl: '', order: (d.jury || []).length })}
            className="flex items-center gap-2 px-3 py-2 bg-gray-100 hover:bg-gray-200 text-sm rounded">
            <Plus size={14} /> Add Jury Member
          </button>
        </Section>

        {/* Archive */}
        <Section title="Archive Grant — Text">
          <Field label="Archive Grant Title" value={d.archiveGrantTitle} onChange={v => set('archiveGrantTitle', v)} />
          <Field label="Body Paragraph 1" value={d.archiveGrantBody1} onChange={v => set('archiveGrantBody1', v)} rows={3} />
          <Field label="Body Paragraph 2" value={d.archiveGrantBody2} onChange={v => set('archiveGrantBody2', v)} rows={3} />
          <Field label="Structure Title" value={d.archiveStructureTitle} onChange={v => set('archiveStructureTitle', v)} />
          <Field label="Structure Body" value={d.archiveStructureBody} onChange={v => set('archiveStructureBody', v)} rows={4} />
          <Field label="Awardees Section Heading" value={d.archiveAwardeesHeading} onChange={v => set('archiveAwardeesHeading', v)} />
          <Field label="Awardees Note" value={d.archiveAwardeesNote} onChange={v => set('archiveAwardeesNote', v)} rows={2} />
          <Field label="Legacy Title" value={d.archiveLegacyTitle} onChange={v => set('archiveLegacyTitle', v)} />
          <Field label="Legacy Body" value={d.archiveLegacyBody} onChange={v => set('archiveLegacyBody', v)} rows={4} />
        </Section>

        {/* Archive Awardees */}
        <Section title="Archive Awardees (Photos & Bios)">
          {(d.archiveAwardees || []).map((p, i) => (
            <div key={i} className="border border-gray-100 rounded p-4 space-y-3">
              <div className="flex justify-between items-center">
                <h4 className="font-medium text-sm">{p.name || `Awardee ${i + 1}`}</h4>
                <button onClick={() => removeFromArr('archiveAwardees', i)} className="text-red-500 hover:text-red-700"><Trash2 size={15} /></button>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <Field label="Name" value={p.name} onChange={v => setArr('archiveAwardees', i, 'name', v)} />
                <Field label="Role" value={p.role} onChange={v => setArr('archiveAwardees', i, 'role', v)} />
              </div>
              <Field label="Bio" value={p.bio} onChange={v => setArr('archiveAwardees', i, 'bio', v)} rows={3} />
              <ImgField label="Photo" current={p.imageUrl} fileKey={`archive_${i}`} files={files} onFile={onFile} />
            </div>
          ))}
          <button onClick={() => addToArr('archiveAwardees', { name: '', role: 'Select Awardee (2015-2024)', bio: '', imageUrl: '', order: (d.archiveAwardees || []).length })}
            className="flex items-center gap-2 px-3 py-2 bg-gray-100 hover:bg-gray-200 text-sm rounded">
            <Plus size={14} /> Add Awardee
          </button>
        </Section>
      </div>
    </AdminLayout>
  );
}
