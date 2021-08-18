import mongoose from 'mongoose'

const officeSchema = new mongoose.Schema({
  address: String,
  clientName: String,
  closingHour: String,
  code: Number,
  lastMaintenance: { type: Date, default: null },
  inventory: { type: Array, default: [] },
  isActive: Boolean,
  isLocal: Boolean,
  officeName: String,
  officeState: String,
  openingHour: String,
  postalCode: Number,
  region: String
})

const Office = mongoose.model('Office', officeSchema)

export default Office
