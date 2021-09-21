import express from 'express'
import nodemailer from 'nodemailer'
// import { google } from 'googleapis'

const router = express.Router()

router.post('/sendmail', async (req, res) => {
  try {
    const { emails } = req.body
    let transporter = await nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        type: 'OAuth2',
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET
      }
  });

  const emailConfig = {
    from: process.env.EMAIL,
    to: 'parucho.edgar@outlook.es',
    cc: 'edpn.ep@gmail.com',
    auth: {
      user: process.env.EMAIL,
      refreshToken: process.env.REFRESH_TOKEN
    }
  }

  const actions = []
  for (const email of emails) {
    console.log(email.to, email.cc)
    actions.push(
      transporter.sendMail({ ...emailConfig, html: email.html, subject: email.subject })
    )
  }

  Promise.all(actions)
    .then((res) => res.json(res))
    .catch((e) => res.json(e))

  } catch (error) {
    console.log(error);
    res.status(400).json({ error })
  }
})

module.exports = router
