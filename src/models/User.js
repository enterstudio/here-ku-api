import mongoose from '../db/connection'
import passportLocalMongoose from 'passport-local-mongoose'

const Schema = mongoose.Schema
const ObjectId = mongoose.Schema.Types.ObjectId

const userSchema = new Schema({
})

userSchema.plugin(passportLocalMongoose)

export default mongoose.model('User', userSchema)
