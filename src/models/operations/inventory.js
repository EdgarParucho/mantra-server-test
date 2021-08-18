import mongoose from 'mongoose'

const inventorySchema = new mongoose.Schema({
  clientName: String,
  location: String,
  observations: String,
  officeName: String,
  officeState: String,
  officeRegion: String,
  productType: String,
  productName: String,
  serialCode: String,
  serviceOrder: String,
  schedule: Object,
  status: String
})

const Inventory = mongoose.model('Inventory', inventorySchema)

export default Inventory
