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
    _likes: [{
      type: ObjectId,
      ref: 'Like'
    }]
  }, {
    timestamps: {
      createdAt: '_created_at'
  }
})

submissionSchema.index({
  location: '2dsphere'
})

const dtOptions = {
  month: 'numeric',
  day: 'numeric',
  year: 'numeric',
  hour: '2-digit',
  minute: '2-digit'
}

submissionSchema.pre('init', (next, doc) => {
  const created_at = doc._created_at.toLocaleTimeString("en-us", dtOptions)
  doc.created_at = created_at
  delete doc._created_at
  
  User.findOne(doc._user, (err, user) => {
    if(err) console.error(err)
    doc.user = {
      name: user.name
    }
    delete doc._user
    next()
  })
})

export default mongoose.model('Submission', submissionSchema)
