import mongoose from 'mongoose';

const reporteSchema = new mongoose.Schema({
  category: String,
  clientName: String,
  isLocal: Boolean,
  officeName: String,
  officeRegion: String,
  officeState: String,
  productName: String,
  productType: String,
  reportCode: String,
  reportDescription: String,
  reportedAt: Date,
  reportStatus: String,
  serialCode: String,
  sla: Object,
  visits: { type: Number, default: 0 },
  // model - { aplica: Boolean, vencimiento: Date, status: String, horas: Number }
  documentation: Array,
  // model - { tipo: String, orden: Number, validacion: String fecha: Date, autor: String, contenido: [] }
  // e.g.  - { tipo: Visita técnica, orden: Number, validacion: 'Pendiente/ Realizada/ No aplica' fecha: Date, autor: String, contenido: [] }

  schedule: Object,
  // model - { asignado: Boolean, tecnico: String, fechaEstimada: Date }
  
  pieces: Array,
  // model - { nombre: String, cantidad: Number, causa: String }

});

const Cerrado = mongoose.model('Cerrado', reporteSchema);
export default Cerrado;
