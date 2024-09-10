import mongoose from 'mongoose'

const connectDB = async () => {
  if (mongoose.connections[0].readyState) {
    console.log('MongoDB already connected')
    return
  }

  try {
    console.log('Connecting to MongoDB...')
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    console.log('MongoDB connected')
  } catch (error) {
    console.error('MongoDB connection failed:', error)
  }
}

export default connectDB
