import mongoose from 'mongoose'

const CourtSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    description: {
      type: String,
      default: ''
    },
    images: {
      type: [
        {
          url: { type: String, default: '' },
          id: { type: String, default: '' },
          _id: false
        }
      ],
      default: []
    }
  },
  { versionKey: false, timestamps: true }
)

export default mongoose.model('courts', CourtSchema)
