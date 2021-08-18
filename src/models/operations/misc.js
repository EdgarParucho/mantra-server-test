import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const miscSchema = new Schema({
  ref: String,
  val: Number
});

const Misc = mongoose.model('Misc', miscSchema);
export default Misc;
