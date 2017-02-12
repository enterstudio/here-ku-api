import mongoose from '../db/connection'
import Like from './Like'
import User from './User'

const Schema = mongoose.Schema
const ObjectId = mongoose.Schema.Types.ObjectId

const submissionSchema = new Schema({
    haiku: {
      lineOne: String,
      lineTwo: String,
      lineThree: String
    },
    location: {
      type: {
        type: String
      },
      coordinates: []
    },
    _user: {
      type: ObjectId,
      ref: 'User',
      required: true
    },
    likes: [{
      type: ObjectId,
      ref: 'Like'
    }]
  }, {
    timestamps: {
      createdAt: 'created_at'
  }
})

submissionSchema.index({
  location: '2dsphere'
})

export default mongoose.model('Submission', submissionSchema)
