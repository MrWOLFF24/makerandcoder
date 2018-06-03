const express = require('express')
const router = express.Router()
const nodemailer = require('nodemailer')
const mg = require('nodemailer-mailgun-transport')

const auth = {
    auth: {
      api_key: 'api_key',
      domain: 'domain'
    }
  }

router.post('/formContact', (req, res) => {

    const transporter = nodemailer.createTransport(mg(auth))

    const mailOptions = {
      to: 'test@test.fr',
      from: `${req.body.name} <${req.body.email}>`,
      subject: 'Contact Form | MAKER & CODER',
      text: req.body.message
    }

    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        res.status(401).send('Votre message n\'a pas pu être envoyé');
      }
      res.status(200).send('Votre message a bien été envoyé')
    })
});

module.exports = router
