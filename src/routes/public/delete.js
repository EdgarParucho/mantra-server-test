import express from 'express'
import Piece from '../../models/storehouse/piece'
import Active from '../../models/operations/active'
import Request from '../../models/storehouse/request'
import Maintenance from '../../models/operations/maintenance'

const router = express.Router()
const roleIsInsufficient = ({ userRole }) => userRole > 2
const departmentIsGranted = ({ department }, allowedDepartments) => allowedDepartments.includes(department)
const errorMessages = {
  privileges: { error: 'Privilegios insuficientes' },
  department: { error: 'Función denegada al departamento registrado en tu cuenta' }
}

router.delete('/Active/:_id', async (req, res) => {
  const { user } = req.user
  const allowedDepartments = ['Operaciones']
  if (roleIsInsufficient(user)) return res.json(errorMessages.privileges)
  if (!departmentIsGranted (user, allowedDepartments)) return res.json(errorMessages.privileges)
  try {
    const { _id } = req.params
    const result = await Active.findByIdAndDelete({ _id })
    res.json(result)
  } catch (error) {
    return res.status(400).json({
      mensaje: "Error al eliminar Activo",
      error
    })
  }
})

router.delete('/Maintenance/:_id', async (req, res) => {
  const { user } = req.user
  const allowedDepartments = ['Operaciones']
  if (roleIsInsufficient(user)) return res.json(errorMessages.privileges)
  if (!departmentIsGranted (user, allowedDepartments)) return res.json(errorMessages.privileges)
  try {
    const { _id } = req.params
    const result = await Maintenance.findByIdAndDelete({ _id })
    res.json(result)
  } catch (error) {
    return res.status(400).json({
      mensaje: "Error al eliminar Mantenimiento",
      error
    })
  }
})

router.delete('/Request/:_id', async (req, res) => {
  const { user } = req.user
  const allowedDepartments = ['Almacén']
  if (roleIsInsufficient(user)) return res.json(errorMessages.privileges)
  if (!departmentIsGranted (user, allowedDepartments)) return res.json(errorMessages.privileges)
  const { _id } = req.params
  try {
    const result = await Request.findByIdAndDelete({ _id })
    res.json(result)
  } catch (error) {
    return res.status(400).json({
      mensaje: "Error al eliminar Solicitud",
      error
    })
  }
})

router.delete('/Piece/:_id', async (req, res) => {
  const { _id } = req.params
  try {
    const result = await Piece.findByIdAndDelete({ _id })
    res.json(result)
  } catch (error) {
    return res.status(400).json({
      mensaje: "Error al eliminar Pieza",
      error
    })
  }
})

module.exports = router
