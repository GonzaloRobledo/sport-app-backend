import mongoose from 'mongoose'

const { MONGO_URL } = process.env

export const connectionMongoDB = async () => {
  if (!MONGO_URL) {
    return console.log('MONGO URL IS REQUIRER FOR CONNECTING DATABASE')
  }

  try {
    await mongoose.connect(MONGO_URL)
    console.log('Connection successful with MongoDB')
  } catch (e) {
    console.log('Error connecting to MongoDB:', e)
  }
}
