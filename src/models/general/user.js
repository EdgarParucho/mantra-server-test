import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  allowLogin: Boolean,
  assignable: Boolean,
  birthday: String,
  companyPosition: String,
  department: String,
  email: String,
  firstName: String,
  idDocument: String,
  lastName: String,
  preferences: { type: Object, default: { darkTheme: false } },
  userPassword: String,
  userRole: Number
})

const User = mongoose.model('User', userSchema)

export default User
