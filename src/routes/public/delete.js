import express from 'express'

import Piece from '../../models/storehouse/piece'
import Active from '../../models/operations/active'
import Request from '../../models/storehouse/request'
import Maintenance from '../../models/operations/maintenance'

const router = express.Router()

router.delete('/Active/:_id', async (req, res) => {
  const { _id } = req.params
  try {
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
  const { _id } = req.params
  try {
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
