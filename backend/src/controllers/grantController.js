import Grant from '../models/Grant.js';

export const getGrants = async (req, res) => {
  try {
    const grants = await Grant.find().sort({ createdAt: -1 });
    res.json(grants);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createGrant = async (req, res) => {
  try {
    const grantData = { ...req.body };
    
    if (grantData.jury && typeof grantData.jury === 'string') {
      grantData.jury = grantData.jury.split(',').map(j => j.trim()).filter(Boolean);
    }
    
    if (req.file) {
      grantData.posterUrl = `/uploads/posters/${req.file.filename}`;
    }

    const grant = await Grant.create(grantData);
    res.status(201).json(grant);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateGrant = async (req, res) => {
  try {
    const updateData = { ...req.body };
    
    if (updateData.jury && typeof updateData.jury === 'string') {
      updateData.jury = updateData.jury.split(',').map(j => j.trim()).filter(Boolean);
    }
    
    if (req.file) {
      updateData.posterUrl = `/uploads/posters/${req.file.filename}`;
    }

    const grant = await Grant.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );
    if (!grant) {
      return res.status(404).json({ message: 'Grant not found' });
    }
    res.json(grant);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteGrant = async (req, res) => {
  try {
    const grant = await Grant.findByIdAndDelete(req.params.id);
    if (!grant) {
      return res.status(404).json({ message: 'Grant not found' });
    }
    res.json({ message: 'Grant deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
