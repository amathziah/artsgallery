import React, { useState, useEffect } from 'react';
import AdminLayout from '../components/AdminLayout';
import api from '../utils/api';
import { Plus, Edit, Trash2, X } from 'lucide-react';
const BACKEND_URL = (import.meta.env.VITE_API_URL || 'http://localhost:5001/api').replace('/api', '');

const AdminGrants = () => {
  const [grants, setGrants] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    structure: '',
    eligibility: '',
    awardee: '',
    jury: ''
  });
  const [posterFile, setPosterFile] = useState(null);
  const [posterPreview, setPosterPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchGrants();
  }, []);

  const fetchGrants = async () => {
    try {
      const { data } = await api.get('/grants');
      setGrants(data);
    } catch (error) {
      alert('Failed to fetch grants');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const submitData = new FormData();
      submitData.append('title', formData.title);
      submitData.append('description', formData.description);
      submitData.append('structure', formData.structure);
      submitData.append('eligibility', formData.eligibility);
      submitData.append('awardee', formData.awardee);
      submitData.append('jury', formData.jury);

      if (posterFile) {
        submitData.append('poster', posterFile);
      }

      if (editingId) {
        await api.put(`/grants/${editingId}`, submitData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
      } else {
        await api.post('/grants', submitData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
      }

      resetForm();
      fetchGrants();
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to save grant');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (grant) => {
    setFormData({
      title: grant.title,
      description: grant.description,
      structure: grant.structure,
      eligibility: grant.eligibility,
      awardee: grant.awardee,
      jury: grant.jury.join(', ')
    });
    setEditingId(grant._id);
    setPosterPreview(grant.posterUrl ? `${BACKEND_URL}${grant.posterUrl}` : null);

    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this grant?')) return;

    try {
      await api.delete(`/grants/${id}`);
      fetchGrants();
    } catch (error) {
      alert('Failed to delete grant');
    }
  };

  const resetForm = () => {
    setShowForm(false);
    setEditingId(null);
    setFormData({
      title: '',
      description: '',
      structure: '',
      eligibility: '',
      awardee: '',
      jury: ''
    });
    setPosterFile(null);
    setPosterPreview(null);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPosterFile(file);
      setPosterPreview(URL.createObjectURL(file));
    }
  };

  return (
    <AdminLayout>
      <div>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Grants</h2>
          <button
            onClick={() => {
              resetForm();
              setShowForm(true);
            }}
            className="flex items-center gap-2 px-4 py-2 bg-black text-white hover:bg-gray-800 text-sm"
          >
            <Plus size={18} />
            Add Grant
          </button>
        </div>

        {showForm && (
          <div className="bg-white p-6 shadow mb-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">
                {editingId ? 'Edit Grant' : 'Add New Grant'}
              </h3>
              <button onClick={resetForm} className="p-1 hover:bg-gray-100">
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-2">Title</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-4 py-2 border focus:outline-none focus:ring-2 focus:ring-black"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-2 border focus:outline-none focus:ring-2 focus:ring-black"
                  rows="3"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">Structure</label>
                <textarea
                  value={formData.structure}
                  onChange={(e) => setFormData({ ...formData, structure: e.target.value })}
                  className="w-full px-4 py-2 border focus:outline-none focus:ring-2 focus:ring-black"
                  rows="3"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">Eligibility</label>
                <textarea
                  value={formData.eligibility}
                  onChange={(e) => setFormData({ ...formData, eligibility: e.target.value })}
                  className="w-full px-4 py-2 border focus:outline-none focus:ring-2 focus:ring-black"
                  rows="3"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">Awardee</label>
                <input
                  type="text"
                  value={formData.awardee}
                  onChange={(e) => setFormData({ ...formData, awardee: e.target.value })}
                  className="w-full px-4 py-2 border focus:outline-none focus:ring-2 focus:ring-black"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">
                  Jury (comma-separated)
                </label>
                <input
                  type="text"
                  value={formData.jury}
                  onChange={(e) => setFormData({ ...formData, jury: e.target.value })}
                  className="w-full px-4 py-2 border focus:outline-none focus:ring-2 focus:ring-black"
                  placeholder="Name 1, Name 2, Name 3"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">Poster Image (Optional)</label>
                <input
                  type="file"
                  accept="image/jpeg,image/jpg,image/png,image/webp"
                  onChange={handleFileChange}
                  className="w-full px-4 py-2 border focus:outline-none focus:ring-2 focus:ring-black text-sm"
                />
                {posterPreview && (
                  <div className="mt-4">
                    <img src={posterPreview} alt="Preview" className="max-w-xs h-48 object-cover border" />
                  </div>
                )}
              </div>
              <div className="flex gap-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="px-6 py-2 bg-black text-white hover:bg-gray-800 disabled:opacity-50 text-sm"
                >
                  {loading ? 'Saving...' : editingId ? 'Update' : 'Create'}
                </button>
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-6 py-2 bg-gray-200 hover:bg-gray-300 text-sm"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="space-y-4">
          {grants.length === 0 && (
            <div className="bg-white p-6 text-center text-gray-500">
              No grants yet. Add your first grant.
            </div>
          )}
          {grants.map((grant) => (
            <div key={grant._id} className="bg-white p-6 shadow">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-2">{grant.title}</h3>
                  <p className="text-gray-600 mb-2">{grant.description}</p>
                  <div className="text-sm text-gray-500 space-y-1">
                    <p><strong>Awardee:</strong> {grant.awardee}</p>
                    {grant.jury.length > 0 && (
                      <p><strong>Jury:</strong> {grant.jury.join(', ')}</p>
                    )}
                  </div>
                </div>
                <div className="flex gap-2 ml-4">
                  <button
                    onClick={() => handleEdit(grant)}
                    className="p-2 hover:bg-gray-100"
                    title="Edit"
                  >
                    <Edit size={18} />
                  </button>
                  <button
                    onClick={() => handleDelete(grant._id)}
                    className="p-2 hover:bg-gray-100 text-red-600"
                    title="Delete"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminGrants;
