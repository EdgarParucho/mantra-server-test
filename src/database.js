import mongoose from 'mongoose'

const uri = process.env.NODE_ENV === 'development' ? process.env.MONGO_LOCAL : process.env.MONGO_ATLAS

mongoose.connect(uri, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useFindAndModify: false,
  useCreateIndex: true
})
  .then(console.log(`MongoDB connected for ${process.env.NODE_ENV}`))
