import mongoose from 'mongoose'

const technicianSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  isActive: Boolean,
  userId: String,
  zoneCoverage: Array
})

const Technician = mongoose.model('Technician', technicianSchema)

export default Technician
