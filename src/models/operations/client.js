import mongoose from 'mongoose'

const clientSchema =  new mongoose.Schema({
  clientName: String,
  contacts: Array,
  contracts: Array,
  regions: Array
})

const Client = mongoose.model('Client', clientSchema)

export default Client
