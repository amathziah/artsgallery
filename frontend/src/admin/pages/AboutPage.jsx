import React, { useState, useEffect } from 'react';
import AdminLayout from '../components/AdminLayout';
import api from '../utils/api';
import { Plus, Trash2, Save } from 'lucide-react';

const emptyPerson = { name: '', title: '', imageUrl: '', order: 0 };

export default function AdminAboutPage() {
  const [form, setForm] = useState({ visionLabel: '', missionLabel: '', vision: '', mission: '', aboutLabel: '', aboutHeading: '', aboutBody: '', leadershipHeading: '', leadership: [] });
  const [leadershipImages, setLeadershipImages] = useState({});
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState('');

  useEffect(() => {
    api.get('/site-content').then((res) => {
      const d = res.data;
      setForm({
        visionLabel: d.visionLabel || '',
        missionLabel: d.missionLabel || '',
        vision: d.vision || '',
        mission: d.mission || '',
        aboutLabel: d.aboutLabel || '',
        aboutHeading: d.aboutHeading || '',
        aboutBody: d.aboutBody || '',
        leadershipHeading: d.leadershipHeading || '',
        leadership: d.leadership || [],
      });
    });
  }, []);

  const updateLeader = (i, field, value) => {
    setForm((prev) => ({
      ...prev,
      leadership: prev.leadership.map((p, idx) => (idx === i ? { ...p, [field]: value } : p)),
    }));
  };

  const addLeader = () => setForm((prev) => ({ ...prev, leadership: [...prev.leadership, { ...emptyPerson, order: prev.leadership.length }] }));
  const removeLeader = (i) => setForm((prev) => ({ ...prev, leadership: prev.leadership.filter((_, idx) => idx !== i) }));

  const handleImageChange = (i, file) => setLeadershipImages((prev) => ({ ...prev, [i]: file }));

  const handleSave = async () => {
    setSaving(true);
    setMsg('');
    try {
      const formData = new FormData();
      formData.append('visionLabel', form.visionLabel);
      formData.append('missionLabel', form.missionLabel);
      formData.append('vision', form.vision);
      formData.append('mission', form.mission);
      formData.append('aboutLabel', form.aboutLabel);
      formData.append('aboutHeading', form.aboutHeading);
      formData.append('aboutBody', form.aboutBody);
      formData.append('leadershipHeading', form.leadershipHeading);
      formData.append('leadership', JSON.stringify(form.leadership));
      Object.entries(leadershipImages).forEach(([, file]) => formData.append('leadershipImages', file));
      await api.put('/site-content', formData, { headers: { 'Content-Type': 'multipart/form-data' } });
      setMsg('Saved successfully!');
      setLeadershipImages({});
    } catch {
      setMsg('Error saving. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <AdminLayout>
      <div className="max-w-3xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">About & Leadership</h2>
          <button onClick={handleSave} disabled={saving} className="flex items-center gap-2 px-4 py-2 bg-black text-white hover:bg-gray-800 text-sm font-medium rounded disabled:opacity-50">
            <Save size={16} /> {saving ? 'Saving…' : 'Save Changes'}
          </button>
        </div>
        {msg && <p className={`mb-4 text-sm ${msg.includes('Error') ? 'text-red-600' : 'text-green-600'}`}>{msg}</p>}

        <div className="space-y-6">
          {/* Vision & Mission */}
          <div className="bg-white shadow p-6 rounded space-y-4">
            <h3 className="font-semibold text-lg">Vision & Mission</h3>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Vision Section Label</label>
                <input className="w-full border border-gray-200 rounded px-3 py-2 text-sm" value={form.visionLabel} onChange={(e) => setForm((p) => ({ ...p, visionLabel: e.target.value }))} />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Mission Section Label</label>
                <input className="w-full border border-gray-200 rounded px-3 py-2 text-sm" value={form.missionLabel} onChange={(e) => setForm((p) => ({ ...p, missionLabel: e.target.value }))} />
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Vision Text</label>
              <textarea rows={2} className="w-full border border-gray-200 rounded px-3 py-2 text-sm" value={form.vision} onChange={(e) => setForm((p) => ({ ...p, vision: e.target.value }))} />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Mission Text</label>
              <textarea rows={4} className="w-full border border-gray-200 rounded px-3 py-2 text-sm" value={form.mission} onChange={(e) => setForm((p) => ({ ...p, mission: e.target.value }))} />
            </div>
          </div>

          {/* About Us */}
          <div className="bg-white shadow p-6 rounded space-y-4">
            <h3 className="font-semibold text-lg">About Us</h3>
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Section Label</label>
              <input className="w-full border border-gray-200 rounded px-3 py-2 text-sm" value={form.aboutLabel} onChange={(e) => setForm((p) => ({ ...p, aboutLabel: e.target.value }))} />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Heading</label>
              <textarea rows={3} className="w-full border border-gray-200 rounded px-3 py-2 text-sm" value={form.aboutHeading} onChange={(e) => setForm((p) => ({ ...p, aboutHeading: e.target.value }))} />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Body Text</label>
              <textarea rows={8} className="w-full border border-gray-200 rounded px-3 py-2 text-sm" value={form.aboutBody} onChange={(e) => setForm((p) => ({ ...p, aboutBody: e.target.value }))} />
            </div>
          </div>

          {/* Leadership */}
          <div className="bg-white shadow p-6 rounded space-y-4">
            <div className="flex justify-between items-center">
              <div className="flex-1 mr-4">
                <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Leadership Section Heading</label>
                <input className="w-full border border-gray-200 rounded px-3 py-2 text-sm" value={form.leadershipHeading} onChange={(e) => setForm((p) => ({ ...p, leadershipHeading: e.target.value }))} />
              </div>
              <button onClick={addLeader} className="flex items-center gap-2 px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-sm rounded">
                <Plus size={14} /> Add Person
              </button>
            </div>
            {form.leadership.map((person, i) => (
              <div key={i} className="border border-gray-100 rounded p-4 space-y-3">
                <div className="flex justify-between items-center">
                  <h4 className="font-medium">Person {i + 1}</h4>
                  <button onClick={() => removeLeader(i)} className="text-red-500 hover:text-red-700"><Trash2 size={16} /></button>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Name</label>
                    <input className="w-full border border-gray-200 rounded px-3 py-2 text-sm" value={person.name} onChange={(e) => updateLeader(i, 'name', e.target.value)} />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Title / Role</label>
                    <input className="w-full border border-gray-200 rounded px-3 py-2 text-sm" value={person.title} onChange={(e) => updateLeader(i, 'title', e.target.value)} />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Photo</label>
                  {person.imageUrl && <img src={person.imageUrl.startsWith('/') ? `http://localhost:5001${person.imageUrl}` : person.imageUrl} alt={person.name} className="w-24 h-28 object-cover rounded mb-2" />}
                  <input type="file" accept="image/*" onChange={(e) => handleImageChange(i, e.target.files[0])} className="text-sm" />
                  {leadershipImages[i] && <p className="text-xs text-gray-500 mt-1">{leadershipImages[i].name}</p>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
