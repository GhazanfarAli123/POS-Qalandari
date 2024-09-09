import mongoose from 'mongoose'

const MarketGetSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  quantity: {
    type: Number,
    required: true
  },
  group: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Group'
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  itemstatus: {
    type: String,
    default: 'pending'
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category'
  },
  image: {
    type: String
  },
  price: {
    type: Number
  },
  time: {
    type: String
  }
})

const MarketGetItems = mongoose.models.MarketGetItems || mongoose.model('MarketGetItems', MarketGetSchema)

export default MarketGetItems
