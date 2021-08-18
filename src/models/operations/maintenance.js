import mongoose from 'mongoose'

const maintenanceSchema = new mongoose.Schema({
  clientName: String,
  finished: { type: Boolean, default: false },
  fullValidated: { type: Boolean, default: false },
  inventory: { type: Array, default: [] },
  officeName: String,
  officeState: String,
  officeRegion: String,
  schedule: { type: Object, default: { technician: { fullName: 'No asignado', _id: '' }, scheduledDate: '' } },
  status: { type: String, default: 'Asignado' }
})

const Maintenance = mongoose.model('Maintenance', maintenanceSchema)

export default Maintenance
