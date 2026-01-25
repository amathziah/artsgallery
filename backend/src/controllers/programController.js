import Program from '../models/Program.js';

export const getPrograms = async (req, res) => {
  try {
    const programs = await Program.find().sort({ createdAt: -1 });
    res.json(programs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createProgram = async (req, res) => {
  try {
    const programData = { ...req.body };
    
    if (req.file) {
      programData.posterUrl = `/uploads/posters/${req.file.filename}`;
    }

    const program = await Program.create(programData);
    res.status(201).json(program);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateProgram = async (req, res) => {
  try {
    const updateData = { ...req.body };
    
    if (req.file) {
      updateData.posterUrl = `/uploads/posters/${req.file.filename}`;
    }

    const program = await Program.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );
    if (!program) {
      return res.status(404).json({ message: 'Program not found' });
    }
    res.json(program);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteProgram = async (req, res) => {
  try {
    const program = await Program.findByIdAndDelete(req.params.id);
    if (!program) {
      return res.status(404).json({ message: 'Program not found' });
    }
    res.json({ message: 'Program deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
