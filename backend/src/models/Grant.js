import mongoose from 'mongoose';

const grantSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  structure: {
    type: String,
    required: true
  },
  eligibility: {
    type: String,
    required: true
  },
  awardee: {
    type: String,
    required: true
  },
  jury: {
    type: [String],
    default: []
  },
  posterUrl: {
    type: String,
    default: null
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('Grant', grantSchema);
