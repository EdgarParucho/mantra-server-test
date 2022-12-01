import mongoose from 'mongoose'

const uri = process.env.MONGO_ATLAS

mongoose.connect(uri, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useFindAndModify: false,
  useCreateIndex: true
})
  .then(console.log(`MongoDB connected for ${process.env.NODE_ENV}`))
  .catch((e) => console.error(e))
