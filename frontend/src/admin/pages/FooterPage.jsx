import React, { useState, useEffect } from 'react';
import AdminLayout from '../components/AdminLayout';
import api from '../utils/api';
import { Save } from 'lucide-react';

export default function AdminFooterPage() {
  const [form, setForm] = useState({
    footerTagline: '',
    footerCopyright: '',
    address: '',
    emailGeneral: '',
    emailGrants: '',
    emailPrograms: '',
    instagram: '',
    instagramUrl: '',
  });
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState('');

  useEffect(() => {
    api.get('/site-content').then((res) => {
      const d = res.data;
      setForm({
        footerTagline: d.footerTagline || '',
        footerCopyright: d.footerCopyright || '',
        address: d.address || '',
        emailGeneral: d.emailGeneral || '',
        emailGrants: d.emailGrants || '',
        emailPrograms: d.emailPrograms || '',
        instagram: d.instagram || '',
        instagramUrl: d.instagramUrl || '',
      });
    });
  }, []);

  const handleSave = async () => {
    setSaving(true);
    setMsg('');
    try {
      const formData = new FormData();
      Object.entries(form).forEach(([k, v]) => formData.append(k, v));
      await api.put('/site-content', formData, { headers: { 'Content-Type': 'multipart/form-data' } });
      setMsg('Saved successfully!');
    } catch {
      setMsg('Error saving. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const field = (key, label, rows) => (
    <div>
      <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">{label}</label>
      {rows ? (
        <textarea rows={rows} className="w-full border border-gray-200 rounded px-3 py-2 text-sm" value={form[key]} onChange={(e) => setForm((p) => ({ ...p, [key]: e.target.value }))} />
      ) : (
        <input className="w-full border border-gray-200 rounded px-3 py-2 text-sm" value={form[key]} onChange={(e) => setForm((p) => ({ ...p, [key]: e.target.value }))} />
      )}
    </div>
  );

  return (
    <AdminLayout>
      <div className="max-w-2xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Footer / Contact</h2>
          <button onClick={handleSave} disabled={saving} className="flex items-center gap-2 px-4 py-2 bg-black text-white hover:bg-gray-800 text-sm font-medium rounded disabled:opacity-50">
            <Save size={16} /> {saving ? 'Saving…' : 'Save Changes'}
          </button>
        </div>
        {msg && <p className={`mb-4 text-sm ${msg.includes('Error') ? 'text-red-600' : 'text-green-600'}`}>{msg}</p>}

        <div className="bg-white shadow p-6 rounded space-y-5">
          {field('footerTagline', 'Footer Tagline', 2)}
          {field('footerCopyright', 'Copyright Text (shown after © Year)')}
          {field('address', 'Address', 4)}
          {field('emailGeneral', 'General Enquiries Email')}
          {field('emailGrants', 'Grants Email')}
          {field('emailPrograms', 'Programs Email')}
          {field('instagram', 'Instagram Handle (e.g. @saatsaatharts.foundation)')}
          {field('instagramUrl', 'Instagram URL')}
        </div>
      </div>
    </AdminLayout>
  );
}
