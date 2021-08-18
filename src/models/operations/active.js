import mongoose from 'mongoose'

const reportSchema = new mongoose.Schema({
  category: String,
  clientName: String,
  description: { type: String, trim: true },
  documentation: Array,
  expireDate: { type: Date, default: new Date() },
  expired: { type: Boolean, default: false },
  isLocal: Boolean,
  itsSpecial: Boolean,
  officeName: String,
  officeState: String,
  officeRegion: String,
  pieces: { type: Array, default: [] },
  productName: String,
  productType: String,
  reportCode: { type: String, trim: true },
  reportedAt: Date,
  schedule: {
    type: Object,
    default: { scheduledDate: '', technician: { fullName: 'No asignado', id: '' } }
  },
  serialCode: { type: String, trim: true, uppercase: true },
  status: { type: String, default: 'En programación' }
})

const Active = mongoose.model('Active', reportSchema)
export default Active
