import mongoose from '../db/connection'
import findOrCreate from 'mongoose-findorcreate'

const Schema = mongoose.Schema
const ObjectId = mongoose.Schema.Types.ObjectId

const userSchema = new Schema({
  facebookId: String
})

userSchema.plugin(findOrCreate)

export default mongoose.model('User', userSchema)
