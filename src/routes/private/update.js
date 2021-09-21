import express from 'express'
import bcrypt from 'bcryptjs'

import Client from '../../models/operations/client'
import Product from '../../models/operations/product'
import User from '../../models/general/user'
import Email from '../../models/general/email'

const router = express.Router()

router.put('/Client/:_id', async(req, res) => {
  try {
    const { user } = req.user
    if (user.userRole > 1) return res.json({ error: 'Privilegios insuficientes' })

    const { _id } = req.params
    const body = req.body
    const result = await Client.findOneAndUpdate({ _id }, body, { new: true })
    res.json(result)
  } catch (error) {
      return res.status(400).json({
        mensaje: 'Error al actualizar "cliente"',
        error
      })
  }
})

router.put('/Product/:_id', async (req, res) => {
  try {
    const { user } = req.user
    if (user.userRole > 1) return res.json({ error: 'Privilegios insuficientes' })
    const { _id } = req.params
    const body = req.body
    const result = await Product.findOneAndUpdate({ _id }, body, { new: true })
    res.json(result)
  } catch (error) {
    res.status(500).json({
      mensaje: 'Error al actualizar "producto"',
      error
    })
  }
})

router.put('/User/:_id', async (req, res) => {
  try {
    const { user } = req.user
    if (user.userRole > 1) return res.json({ error: 'Privilegios insuficientes' })
    const { _id } = req.params
    const body = req.body
    if (body.userPassword) {
      const salt = await bcrypt.genSalt(10)
      body.userPassword = await bcrypt.hash(body.userPassword, salt)
    }
    const result = await User.findOneAndUpdate(
      { _id }, body, { new: true }
    )
    res.json(result)
  } catch (error) {
    res.status(500).json({ error })
  }
})

router.put('/Email/:_id', async (req, res) => {
  try {
    const { user } = req.user
    if (user.userRole > 1) return res.json({ error: 'Privilegios insuficientes' })
    const { _id } = req.params
    const body = req.body
    const result = await Email.findOneAndUpdate({ _id }, body, { new: true })
    res.json(result)
  } catch (error) {
    res.status(500).json({
      mensaje: 'Error al actualizar "email"',
      error
    })
  }
})

module.exports = router
