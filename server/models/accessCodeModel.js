import mongoose from 'mongoose';

const accessCodeSchema = mongoose.Schema({
  school_id: { type: String, required: true, unique: true },
  access_codes: [
    {
      code: { type: String, required: true },
      createdAt: { type: Date, default: Date.now, expires: '7d' },
    },
  ],
});

export default mongoose.model('AccessCode', accessCodeSchema);