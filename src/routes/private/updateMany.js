import express from 'express'
import { models } from 'mongoose'

const router = express.Router()

router.put('/updateMany/:collection', async (req, res) => {
  console.log(req.body)
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
