import express from 'express'
import bcrypt from 'bcryptjs'

import Active from '../../models/operations/active'
import Closed from '../../models/operations/closed'
import Inventory from '../../models/operations/inventory'
import Maintenance from '../../models/operations/maintenance'
import Office from '../../models/operations/office'
import Piece from '../../models/storehouse/piece'
import Request from '../../models/storehouse/request'
import Misc from '../../models/operations/misc'
import User from '../../models/general/user'

const router = express.Router()
const roleIsInsufficient = ({ userRole }) => userRole > 2
const departmentIsGranted = ({ department }, allowedDepartments) => allowedDepartments.includes(department)
const errorMessages = {
  privileges: { error: 'Privilegios insuficientes' },
  department: { error: 'Función denegada al departamento registrado en tu cuenta' }
}

router.put('/Active/:id', async(req, res) => {
  const { user } = req.user
  const allowedDepartments = ['Operaciones']
  if (roleIsInsufficient(user)) return res.json(errorMessages.privileges)
  if (!departmentIsGranted (user, allowedDepartments)) return res.json(errorMessages.privileges)
  try {
    const _id = req.params.id
    const body = req.body
    const queryResult = await Active.findOneAndUpdate({ _id }, body, { new: true })
    res.json(queryResult)
  } catch (error) {
      return res.status(400).json({
        mensaje: 'Error al actualizar "activo"',
        error
      })
  }
})

router.put('/Correlative', async (req, res) => {
  try {
    const filter = { ref: 'correlate' }
    const body = { "$inc": { val: 1 } } 
    const result = await Misc.findOneAndUpdate(filter, body)
    res.json(result)
  } catch (error) {
    res.status(500).json({
      mensaje: 'Error al actualizar "correlativo"',
      error
    })
  }
})

router.put('/Closed/:id', async(req, res) => {
  const { user } = req.user
  const allowedDepartments = ['Operaciones']
  if (roleIsInsufficient(user)) return res.json(errorMessages.privileges)
  if (!departmentIsGranted (user, allowedDepartments)) return res.json(errorMessages.privileges)
  const _id = req.params.id
  const body = req.body
  try {
    const queryResult = await Closed.findByIdAndUpdate({ _id }, body, {new: true})
    res.json(queryResult)
  } catch (error) {
      return res.status(400).json({
        mensaje: 'Error al actualizar "cerrado"',
        error
      })
  }
})

router.put('/Inventory/:id', async (req, res) => {
  const { user } = req.user
  const allowedDepartments = ['Operaciones']
  if (roleIsInsufficient(user)) return res.json(errorMessages.privileges)
  if (!departmentIsGranted (user, allowedDepartments)) return res.json(errorMessages.privileges)
  try {
    const _id = req.params.id
    const newBody = req.body
    const result = await Inventory.findOneAndUpdate(
      { _id }, newBody, { new: true }
    )
    res.json(result)
  } catch (error) {
    res.status(500).json({
      mensaje: 'Error al actualizar "inventario"',
      error
    })
  }
})

router.put('/Maintenance/:id', async (req, res) => {
  const { user } = req.user
  const allowedDepartments = ['Operaciones']
  if (roleIsInsufficient(user)) return res.json(errorMessages.privileges)
  if (!departmentIsGranted (user, allowedDepartments)) return res.json(errorMessages.privileges)
  try {
    const _id = req.params.id
    const newBody = req.body
    const result = await Maintenance.findOneAndUpdate(
      { _id }, newBody, { new: true }
    )
    res.json(result)
  } catch (error) {
    res.status(500).json({
      mensaje: 'Error al actualizar "mantenimiento"',
      error
    })
  }
})

router.put('/Office/:id', async (req, res) => {
  const { user } = req.user
  const allowedDepartments = ['Operaciones']
  if (roleIsInsufficient(user)) return res.json(errorMessages.privileges)
  if (!departmentIsGranted (user, allowedDepartments)) return res.json(errorMessages.privileges)
  try {
    const _id = req.params.id
    const body = req.body
    const result = await Office.findOneAndUpdate({ _id }, body, { new: true })
    res.json(result)
  } catch (error) {
    res.status(500).json({
      mensaje: 'Error al actualizar "oficina"',
      error
    })
  }
})

router.put('/Piece/:id', async (req, res) => {
  try {
    const _id = req.params.id
    const body = req.body
    console.log(body)
    const result =  await Piece.findOneAndUpdate({ _id }, body, { new: true })
    console.log(result)
    res.json(result)
  } catch (error) {
    return res.status(500).json({
      error
    })
  }
})

router.put('/Request/:id', async (req, res) => {
  const { user } = req.user
  const allowedDepartments = ['Almacén']
  if (roleIsInsufficient(user)) return res.json(errorMessages.privileges)
  if (!departmentIsGranted (user, allowedDepartments)) return res.json(errorMessages.privileges)
  try {
    const _id = req.params.id
    const body = req.body
    const result =  await Request.findByIdAndUpdate({ _id }, body)
    res.json(result)
  } catch (error) {
    return res.status(500).json({
      error
    })
  }
})

router.put('/Account/:_id', async (req, res) => {
  try {
    const { _id } = req.params
    const body = req.body
    if (body.userPassword) {
      const salt = await bcrypt.genSalt(10)
      body.userPassword = await bcrypt.hash(body.userPassword, salt)
    }
    const result = await User.findByIdAndUpdate({ _id }, body)
    res.json(result)
  } catch (error) {
    res.status(500).json({ error })
  }
})


module.exports = router
