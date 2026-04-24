import React, { useState, useEffect } from 'react';
import AdminLayout from '../components/AdminLayout';
import api from '../utils/api';
import { Plus, Trash2, Save } from 'lucide-react';

const emptySlide = { title: '', subtitle: '', ctaText: 'Learn More', ctaLink: '', isExternal: false, imageUrl: '' };

export default function AdminHomePage() {
  const [slides, setSlides] = useState([]);
  const [slideImages, setSlideImages] = useState({});
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState('');

  useEffect(() => {
    api.get('/site-content').then((res) => {
      setSlides(res.data.heroSlides || []);
    });
  }, []);

  const updateSlide = (i, field, value) => {
    setSlides((prev) => prev.map((s, idx) => (idx === i ? { ...s, [field]: value } : s)));
  };

  const addSlide = () => setSlides((prev) => [...prev, { ...emptySlide }]);
  const removeSlide = (i) => setSlides((prev) => prev.filter((_, idx) => idx !== i));

  const handleImageChange = (i, file) => {
    setSlideImages((prev) => ({ ...prev, [i]: file }));
  };

  const handleSave = async () => {
    setSaving(true);
    setMsg('');
    try {
      const formData = new FormData();
      formData.append('heroSlides', JSON.stringify(slides));
      Object.entries(slideImages).forEach(([, file]) => {
        formData.append('heroImages', file);
      });
      await api.put('/site-content', formData, { headers: { 'Content-Type': 'multipart/form-data' } });
      setMsg('Saved successfully!');
      setSlideImages({});
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
          <h2 className="text-2xl font-bold">Hero Slides</h2>
          <div className="flex gap-3">
            <button onClick={addSlide} className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-sm font-medium rounded">
              <Plus size={16} /> Add Slide
            </button>
            <button onClick={handleSave} disabled={saving} className="flex items-center gap-2 px-4 py-2 bg-black text-white hover:bg-gray-800 text-sm font-medium rounded disabled:opacity-50">
              <Save size={16} /> {saving ? 'Saving…' : 'Save Changes'}
            </button>
          </div>
        </div>
        {msg && <p className={`mb-4 text-sm ${msg.includes('Error') ? 'text-red-600' : 'text-green-600'}`}>{msg}</p>}

        <div className="space-y-6">
          {slides.map((slide, i) => (
            <div key={i} className="bg-white shadow p-6 rounded space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="font-semibold">Slide {i + 1}</h3>
                <button onClick={() => removeSlide(i)} className="text-red-500 hover:text-red-700"><Trash2 size={18} /></button>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Title</label>
                <input className="w-full border border-gray-200 rounded px-3 py-2 text-sm" value={slide.title} onChange={(e) => updateSlide(i, 'title', e.target.value)} />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Subtitle</label>
                <input className="w-full border border-gray-200 rounded px-3 py-2 text-sm" value={slide.subtitle} onChange={(e) => updateSlide(i, 'subtitle', e.target.value)} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">CTA Text</label>
                  <input className="w-full border border-gray-200 rounded px-3 py-2 text-sm" value={slide.ctaText} onChange={(e) => updateSlide(i, 'ctaText', e.target.value)} />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">CTA Link</label>
                  <input className="w-full border border-gray-200 rounded px-3 py-2 text-sm" value={slide.ctaLink} onChange={(e) => updateSlide(i, 'ctaLink', e.target.value)} />
                </div>
              </div>
              <div className="flex items-center gap-2">
                <input type="checkbox" id={`ext-${i}`} checked={slide.isExternal} onChange={(e) => updateSlide(i, 'isExternal', e.target.checked)} />
                <label htmlFor={`ext-${i}`} className="text-sm">External link (opens in new tab)</label>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Background Image</label>
                {slide.imageUrl && <img src={slide.imageUrl.startsWith('/') ? `http://localhost:5001${slide.imageUrl}` : slide.imageUrl} alt="slide" className="w-full h-32 object-cover rounded mb-2" />}
                <input type="file" accept="image/*" onChange={(e) => handleImageChange(i, e.target.files[0])} className="text-sm" />
                {slideImages[i] && <p className="text-xs text-gray-500 mt-1">New image selected: {slideImages[i].name}</p>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
}
