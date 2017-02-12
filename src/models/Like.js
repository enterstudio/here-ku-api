import mongoose from '../db/connection'
import User from './User'
import Submission from './Submission'

const Schema = mongoose.Schema
const ObjectId = mongoose.Schema.Types.ObjectId

const likeSchema = new Schema({
  _user: {
    type: ObjectId,
    ref: 'User',
    required: true
  },
  _submission: {
    type: ObjectId,
    ref: 'Submission',
    required: true
  }
})

export default mongoose.model('Like', likeSchema)
