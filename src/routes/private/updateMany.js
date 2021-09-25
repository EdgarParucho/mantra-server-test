import express from 'express'
import { models } from 'mongoose'

const router = express.Router()
const roleIsInsufficient = ({ userRole }) => userRole > 1
const errorMessages = {
  privileges: { error: 'Privilegios insuficientes' }
}

router.put('/updateMany/:collection', async (req, res) => {
  const { user } = req.user
  if (roleIsInsufficient(user)) return res.json(errorMessages.privileges)
  const { collection } = req.params
  const model = models[collection]
  const { query, update, options } = req.body
  try {
    const queryResult = await model.updateMany(query, update, options)
    res.json(queryResult)
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      mensaje: `Error al actualizar modelo "${collection}"`,
      error
    })
  }
})

module.exports = router
