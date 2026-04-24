import React, { useState, useEffect } from 'react';
import AdminLayout from '../components/AdminLayout';
import api from '../utils/api';
import { Save, Plus, Trash2 } from 'lucide-react';

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

const emptyCard = { title: '', description: '', date: '', imageUrl: '', link: '', isExternal: false };

export default function ProgramsEditor() {
  const [d, setD] = useState(null);
  const [cardImages, setCardImages] = useState({});
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState('');

  useEffect(() => {
    api.get('/site-content').then(r => setD(r.data.programs || {}));
  }, []);

  const setField = (k, v) => setD(p => ({ ...p, [k]: v }));
  const setCard = (i, k, v) => setD(p => {
    const cards = [...(p.cards || [])];
    cards[i] = { ...cards[i], [k]: v };
    return { ...p, cards };
  });
  const addCard = () => setD(p => ({ ...p, cards: [...(p.cards || []), { ...emptyCard, order: (p.cards || []).length }] }));
  const removeCard = (i) => setD(p => ({ ...p, cards: p.cards.filter((_, idx) => idx !== i) }));

  const handleSave = async () => {
    setSaving(true); setMsg('');
    try {
      const form = new FormData();
      form.append('programs', JSON.stringify(d));
      Object.entries(cardImages).forEach(([, file]) => file && form.append('programImages', file));
      await api.put('/site-content', form, { headers: { 'Content-Type': 'multipart/form-data' } });
      setMsg('Saved!'); setCardImages({});
      api.get('/site-content').then(r => setD(r.data.programs || {}));
    } catch { setMsg('Error saving.'); } finally { setSaving(false); }
  };

  if (!d) return <AdminLayout><p className="text-gray-400">Loading…</p></AdminLayout>;

  return (
    <AdminLayout>
      <div className="max-w-3xl space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Programs Page</h2>
          <button onClick={handleSave} disabled={saving} className="flex items-center gap-2 px-4 py-2 bg-black text-white hover:bg-gray-800 text-sm rounded disabled:opacity-50">
            <Save size={16} /> {saving ? 'Saving…' : 'Save All'}
          </button>
        </div>
        {msg && <p className={`text-sm ${msg === 'Saved!' ? 'text-green-600' : 'text-red-600'}`}>{msg}</p>}

        {/* Page Header */}
        <div className="bg-white shadow rounded p-6 space-y-4">
          <h3 className="font-semibold text-lg">Page Header</h3>
          <Field label="Page Title" value={d.pageTitle} onChange={v => setField('pageTitle', v)} />
          <Field label="Page Subtitle" value={d.pageSubtitle} onChange={v => setField('pageSubtitle', v)} rows={2} />
          <div className="grid grid-cols-2 gap-3">
            <Field label="Sculpture Park Link Text" value={d.sculptureParklinkText} onChange={v => setField('sculptureParklinkText', v)} />
            <Field label="Sculpture Park Link URL" value={d.sculptureParklinkUrl} onChange={v => setField('sculptureParklinkUrl', v)} />
          </div>
        </div>

        {/* Program Cards */}
        <div className="bg-white shadow rounded p-6 space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="font-semibold text-lg">Program Cards</h3>
            <button onClick={addCard} className="flex items-center gap-2 px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-sm rounded">
              <Plus size={14} /> Add Card
            </button>
          </div>
          {(d.cards || []).map((card, i) => (
            <div key={i} className="border border-gray-100 rounded p-4 space-y-3">
              <div className="flex justify-between items-center">
                <h4 className="font-medium text-sm">{card.title || `Card ${i + 1}`}</h4>
                <button onClick={() => removeCard(i)} className="text-red-500 hover:text-red-700"><Trash2 size={15} /></button>
              </div>
              <Field label="Title" value={card.title} onChange={v => setCard(i, 'title', v)} />
              <Field label="Description" value={card.description} onChange={v => setCard(i, 'description', v)} rows={3} />
              <div className="grid grid-cols-2 gap-3">
                <Field label="Date (optional)" value={card.date} onChange={v => setCard(i, 'date', v)} />
                <Field label="Link (optional)" value={card.link} onChange={v => setCard(i, 'link', v)} />
              </div>
              <div className="flex items-center gap-2">
                <input type="checkbox" id={`ext-${i}`} checked={!!card.isExternal} onChange={e => setCard(i, 'isExternal', e.target.checked)} />
                <label htmlFor={`ext-${i}`} className="text-sm">External link (opens in new tab)</label>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Card Image</label>
                {resolveImg(card.imageUrl) && (
                  <img src={resolveImg(card.imageUrl)} alt="" className="w-full h-32 object-cover rounded mb-2" onError={e => e.target.style.display = 'none'} />
                )}
                <input type="file" accept="image/*" className="text-sm"
                  onChange={e => setCardImages(p => ({ ...p, [i]: e.target.files[0] }))} />
                {cardImages[i] && <p className="text-xs text-gray-400 mt-1">{cardImages[i].name}</p>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
}
