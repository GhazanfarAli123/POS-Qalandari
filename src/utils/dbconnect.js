import mongoose from 'mongoose'

const connectDB = async () => {
  if (mongoose.connections[0].readyState) {
    console.log('MongoDB already connected')
    return
  }

  console.log('Connecting to MongoDB...')
  await mongoose.connect('mongodb+srv://ghazanfaralizahid:Nainemma12!@pos.wdvwe.mongodb.net/', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  console.log('MongoDB connected')
}

export default connectDB
