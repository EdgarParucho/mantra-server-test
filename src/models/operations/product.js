import mongoose from 'mongoose'

const productSchema = new mongoose.Schema({
  brand: String,
  categories: Array,
  model: String,
  productName: String,
  productType: String
})

const Product = mongoose.model('Product', productSchema)

export default Product
