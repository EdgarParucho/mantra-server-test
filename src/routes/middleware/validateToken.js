import jwt from 'jsonwebtoken'

const verifyToken = (req, res, next) => {

  if (req.url === '/login') return next()

  const token = req.header('auth-token')
  if (!token) res.json({ error: 'Sessión no registrada' }) 
  else try {
    const userVerfied = jwt.verify(token, process.env.TOKEN)
    req.user = userVerfied
    next()
  } catch (e) {
    res.json({
      error: 'Usuario no identificado',
      e
    })
  }
}

module.exports = verifyToken
