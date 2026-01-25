import React, { useState, useEffect } from 'react';
import AdminLayout from '../components/AdminLayout';
import api from '../utils/api';
import { Plus, Edit, Trash2, X } from 'lucide-react';

const AdminPrograms = () => {
  const [programs, setPrograms] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({ title: '', description: '' });
  const [posterFile, setPosterFile] = useState(null);
  const [posterPreview, setPosterPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchPrograms();
  }, []);

  const fetchPrograms = async () => {
    try {
      const { data } = await api.get('/programs');
      setPrograms(data);
    } catch (error) {
      alert('Failed to fetch programs');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const submitData = new FormData();
      submitData.append('title', formData.title);
      submitData.append('description', formData.description);
      
      if (posterFile) {
        submitData.append('poster', posterFile);
      }

      if (editingId) {
        await api.put(`/programs/${editingId}`, submitData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
      } else {
        await api.post('/programs', submitData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
      }

      setFormData({ title: '', description: '' });
      setPosterFile(null);
      setPosterPreview(null);
      setShowForm(false);
      setEditingId(null);
      fetchPrograms();
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to save program');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (program) => {
    setFormData({ title: program.title, description: program.description });
    setEditingId(program._id);
    setPosterPreview(program.posterUrl ? `http://localhost:5001${program.posterUrl}` : null);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this program?')) return;

    try {
      await api.delete(`/programs/${id}`);
      fetchPrograms();
    } catch (error) {
      alert('Failed to delete program');
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPosterFile(file);
      setPosterPreview(URL.createObjectURL(file));
    }
  };

  const resetForm = () => {
    setShowForm(false);
    setEditingId(null);
    setFormData({ title: '', description: '' });
    setPosterFile(null);
    setPosterPreview(null);
  };

  return (
    <AdminLayout>
      <div>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Programs</h2>
          <button
            onClick={() => {
              resetForm();
              setShowForm(true);
            }}
            className="flex items-center gap-2 px-4 py-2 bg-black text-white hover:bg-gray-800 text-sm"
          >
            <Plus size={18} />
            Add Program
          </button>
        </div>

        {showForm && (
          <div className="bg-white p-6 shadow mb-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">
                {editingId ? 'Edit Program' : 'Add New Program'}
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
                  rows="4"
                  required
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
          {programs.length === 0 && (
            <div className="bg-white p-6 text-center text-gray-500">
              No programs yet. Add your first program.
            </div>
          )}
          {programs.map((program) => (
            <div key={program._id} className="bg-white p-6 shadow">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-2">{program.title}</h3>
                  <p className="text-gray-600">{program.description}</p>
                </div>
                <div className="flex gap-2 ml-4">
                  <button
                    onClick={() => handleEdit(program)}
                    className="p-2 hover:bg-gray-100"
                    title="Edit"
                  >
                    <Edit size={18} />
                  </button>
                  <button
                    onClick={() => handleDelete(program._id)}
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

export default AdminPrograms;
