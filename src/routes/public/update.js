import express from 'express'

import Active from '../../models/operations/active'
import Closed from '../../models/operations/closed'
import Inventory from '../../models/operations/inventory'
import Maintenance from '../../models/operations/maintenance'
import Office from '../../models/operations/office'
import Piece from '../../models/storehouse/piece'
import Request from '../../models/storehouse/request'
import Misc from '../../models/operations/misc'

const router = express.Router()

router.put('/Active/:id', async(req, res) => {
  if (req.user.user.department !== 'Operaciones') return res.json({ error: `Función no permitida para el área de ${req.user.user.department}` })
  const _id = req.params.id
  const body = req.body
  try {
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
  if (req.user.user.department !== 'Operaciones') return res.json({ error: `Función no permitida para el área de ${req.user.user.department}` })
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
  if (req.user.user.department !== 'Operaciones') return res.json({ error: `Función no permitida para el área de ${req.user.user.department}` })
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
  if (req.user.user.department !== 'Operaciones') return res.json({ error: `Función no permitida para el área de ${req.user.user.department}` })
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
  if (req.user.user.department !== 'Operaciones') return res.json({ error: `Función no permitida para el área de ${req.user.user.department}` })
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
  const _id = req.params.id
  const body = req.body
  try {
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
  const _id = req.params.id
  const body = req.body
  try {
    const result =  await Request.findByIdAndUpdate({ _id }, body)
    res.json(result)
  } catch (error) {
    return res.status(500).json({
      error
    })
  }
})

module.exports = router
