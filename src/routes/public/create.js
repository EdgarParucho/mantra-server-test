import express from 'express'
import Active from '../../models/operations/active'
import Closed from '../../models/operations/closed'
import Dispatch from '../../models/storehouse/dispatch'
import Inventory from '../../models/operations/inventory'
import Maintenance from '../../models/operations/maintenance'
import Office from '../../models/operations/office'
import Piece from '../../models/storehouse/piece'
import Request from '../../models/storehouse/request'

const router = express.Router()

router.post('/Active', async(req, res) => {
  const body = req.body
  try {
    const result = await Active.create(body)
    res.status(200).json(result)
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      mensaje: 'Error al registrar "cerrado"',
      error
    })
  }
})

router.post('/Closed', async(req, res) => {
  const body = Object.assign({}, req.body)
  delete body._id
  try {
    const result = await Closed.create(body)
    res.status(200).json(result)
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      mensaje: 'Error al registrar "cerrado"',
      error
    })
  }
})

router.post('/Dispatch', async (req, res) => {
  try {
    delete req.body._id
    const result =  await Dispatch.create(req.body)
    res.json(result)
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      error
    })
  }
})

router.post('/Inventory', async (req, res) => {
  try {
    const body = req.body
    const result = await Inventory.create(body)
    res.json(result)
  } catch (error) {
    res.status(500).json({
      mensaje: 'Error al registrar "inventario"',
      error
    })
  }
})

router.post('/Maintenance', async (req, res) => {
  try {
    const body = req.body
    const result = await Maintenance.create(body)
    res.json(result)
  } catch (error) {
    res.status(500).json({
      mensaje: 'Error al registrar "mantenimiento"',
      error
    })
  }
})

router.post('/Office', async (req, res) => {
  try {
    const body = req.body
    const result = await Office.create(body)
    res.json(result)
  } catch (error) {
    res.status(500).json({
      mensaje: 'Error al registrar "oficina"',
      error
    })
  }
})

router.post('/Piece', async(req, res) => {
  const body = req.body
  try {
    const result = await Piece.create(body)
    res.status(200).json(result)
  } catch (error) {
    return res.status(500).json({
      mensaje: 'Error al crear pieza',
      error
    })
  }
})

router.post('/Request', async (req, res) => {
  try {
    const result =  await Request.create(req.body)
    res.json(result)
  } catch (error) {
    return res.status(500).json({
      error
    })
  }
})

module.exports = router
