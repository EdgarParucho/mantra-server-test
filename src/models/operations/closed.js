import mongoose from 'mongoose'

const reportSchema = new mongoose.Schema({
  category: String,
  clientName: String,
  description: { type: String, trim: true },
  documentation: Array,
  expireDate: Date,
  expired: Boolean,
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
  schedule: { type: Object, default: { technician: { fullName: '', _id: '' }, scheduledDate: '' } },
  serialCode: { type: String, trim: true, uppercase: true },
  status: { type: String, default: 'Pendiente - Por visita' }
})

const Closed = mongoose.model('Closed', reportSchema)

export default Closed
