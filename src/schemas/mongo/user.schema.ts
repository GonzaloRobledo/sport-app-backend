import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    lastName: {
      type: String,
      required: true
    },
    phone: {
      type: Number || null,
      default: null
    },
    role: {
      type: String,
      enum: ['admin', 'developer', 'user'],
      default: 'user'
    }
  },
  {
    versionKey: false,
    timestamps: true
  }
)

export default mongoose.model('users', UserSchema)
