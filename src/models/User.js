import mongoose from '../db/connection'

const Schema = mongoose.Schema
const ObjectId = mongoose.Schema.Types.ObjectId

const userSchema = new Schema({
  facebookId: String,
  name: String
})

export default mongoose.model('User', userSchema)
