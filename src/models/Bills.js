import mongoose from 'mongoose';

const BillSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  items: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Items',
    required: true
  }],
  quantity: [{
    type: Number,
    required: true
  }],
  group: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Group',
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
});

const Bill = mongoose.models.Bill || mongoose.model('Bill', BillSchema);

export default Bill;
