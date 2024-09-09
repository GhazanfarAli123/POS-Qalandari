import mongoose from 'mongoose';

const MessageSchema = new mongoose.Schema({
  message: {
    type: String,
    required: true,
    trim: true,
  },
  users:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'User',
    required: true
  }
});

const Messages = mongoose.models.Messages || mongoose.model('Messages', MessageSchema);

export default Messages;