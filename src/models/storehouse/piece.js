import mongoose from 'mongoose'

const pieceSchema = new mongoose.Schema({
  asociatedProducts: Array,
  code: String,
  description: String,
  pieceName: String,
  pieceCategory: String,
  stock: Number
})

const Piece = mongoose.model('Piece', pieceSchema)

export default Piece
