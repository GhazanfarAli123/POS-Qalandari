import mongoose from 'mongoose';

const GroupSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  slug: {
    type: String,
    required: true,
  },
});

const Group = mongoose.models.Group || mongoose.model('Group', GroupSchema);

export default Group;
