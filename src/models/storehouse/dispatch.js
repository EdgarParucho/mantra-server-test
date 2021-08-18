import mongoose from 'mongoose'

const dispatchSchema = new mongoose.Schema({
  clientName: String,
  dispatch: {
    type: Object,
    default: {
      cost: 0,
      date: '',
      destiny: '',
      method: '',
      reference: ''
    }
  },
  officeName: String,
  pieceName: String,
  productName: String,
  productType: String,
  replacementCause: String,
  reportCode: String,
  requestDate: String,
  requestedBy: Object,
  requestStatus: String,
  serialCode: String,
  technician: Object
})

const Dispatch = mongoose.model('Dispatch', dispatchSchema)

export default Dispatch
