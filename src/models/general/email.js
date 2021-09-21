import mongoose from 'mongoose'

const emailSchema = new mongoose.Schema({
  enabled: Boolean,
  to: Object,
  cc: Object,
  subject: String,
  html: String
})

const Email = mongoose.model('Email', emailSchema)
export default Email
