import express from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { models } from 'mongoose'
import Cerrado from '../../models/operations/cerrado'

const router = express.Router()

router.post('/login', async (req, res) => {
  const model = models['User']
  const { idDocument, userPassword } = req.body  
  try {
    const userFinded = await model.findOne({ idDocument })
    if (!userFinded) return res.json({ error: 'Credenciales incorrectas' })

    const passwordIsCorrect = await bcrypt.compare(userPassword, userFinded.userPassword)
    if (!passwordIsCorrect) return res.json({ error: 'Credenciales incorrectas' })
    if (!userFinded.allowLogin) return res.json({ error: 'Acceso denegado' })

    userFinded.userPassword = null
    const token = jwt.sign({ user: userFinded }, process.env.TOKEN_SECRET)
    res.header('auth-token', token).json({ token, user: userFinded })

  } catch (error) {
    console.log(error)
    return res.status(400).json({
      error
    })
  }
})

router.get('/cerrados', async (req, res) => {
  try {
    const result = await models['Request'].find()
    res.json(result)
  } catch (error) {
    res.status(400).json({ error })
  }
})

router.get('/closeds', async (req, res) => {
  try {
    const result = await models['Closed'].find()
    res.json(result)
  } catch (error) {
    res.status(400).json({ error })
  }
})

router.get('/:collection/:filter', async (req, res) => {
  const { collection } = req.params
  const model = models[collection]
  const filter = collection === 'Closed'
    ? { "reportedAt": { "$gte": req.params.filter } }
    : {}
  try {
    const queryResult = await model.find(filter, { userPassword: 0 })
    res.json(queryResult)
  } catch (error) {
    return res.status(400).json({
      mensaje: `Error al consultar "${collection}"`,
      error
    })
  }
})

router.post('/find/:collection', async (req, res) => {
  const { collection } = req.params
  const model = models[collection]
  const { filter } = req.body
  try {
    const queryResult = await model.find(filter)
    res.json(queryResult)
  } catch (error) {
    return res.status(500).json({
      mensaje: `Error al consultar modelo "${collection}"`,
      error
    })
  }
})

module.exports = router
