import express from 'express'
import bcrypt from 'bcryptjs'
import Client from '../../models/operations/client'
import Product from '../../models/operations/product'
import User from '../../models/general/user'

const router = express.Router()
const roleIsInsufficient = ({ userRole }) => userRole > 1
const errorMessages = {
  privileges: { error: 'Privilegios insuficientes' }
}

router.post('/Client', async (req, res) => {
  const { user } = req.user
  if (roleIsInsufficient(user)) return res.json(errorMessages.privileges)
  try {
    const body = req.body
    const result = await Client.create(body)
    res.json(result)
  } catch (error) {
    res.json({
      mensaje: 'Error al registrar "cliente"',
      error
    })
  }
})

router.post('/Product', async (req, res) => {
  const { user } = req.user
  if (roleIsInsufficient(user)) return res.json(errorMessages.privileges)
  try {
    const product = req.body
    const result = await Product.create(product)
    res.json(result)
  } catch (error) {
    res.status(500).json({
      mensaje: 'Error al registrar "producto"',
      error
    })
  }
})

router.post('/User', async (req, res) => {
  const { user } = req.user
  if (roleIsInsufficient(user)) return res.json(errorMessages.privileges)
  try {
  const body = req.body
    const salt = await bcrypt.genSalt(10);
    body.userPassword = await bcrypt.hash(req.body.userPassword, salt)
    const result = await User.create(body)
    res.json(result)
  } catch (error) {
    return res.status(400).json({
      error
    })
  }
})

module.exports = router
