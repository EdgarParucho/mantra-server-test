import express from 'express'
import Product from '../../models/operations/product'
import Office from '../../models/operations/office'
import User from '../../models/general/user'

const router = express.Router()
const roleIsInsufficient = ({ userRole }) => userRole > 1
const errorMessages = {
  privileges: { error: 'Privilegios insuficientes' }
}

router.delete('/Product/:_id', async (req, res) => {
  const { user } = req.user
  if (roleIsInsufficient(user)) return res.json(errorMessages.privileges)
  try {
    const { _id } = req.params
    const result = await Product.findByIdAndDelete({ _id })
    res.json(result)
  } catch (error) {
    return res.status(400).json({
      mensaje: `Error al consultar "${collection}"`,
      error
    })
  }
})

router.delete('/Office/:_id', async (req, res) => {
  const { user } = req.user
  if (roleIsInsufficient(user)) return res.json(errorMessages.privileges)
  try {
    const { _id } = req.params
    const result = await Office.findByIdAndDelete({ _id })
    res.json(result)
  } catch (error) {
    return res.status(400).json({
      mensaje: `Error al consultar "${collection}"`,
      error
    })
  }
})

router.delete('/User/:_id', async (req, res) => {
  const { user } = req.user
  if (roleIsInsufficient(user)) return res.json(errorMessages.privileges)
  try {
    const { _id } = req.params
    const result = await User.findByIdAndDelete({ _id }, { userPassword: 0 })
    res.json(result)
  } catch (error) {
    return res.status(400).json({
      mensaje: `Error al consultar "${collection}"`,
      error
    })
  }
})

module.exports = router
