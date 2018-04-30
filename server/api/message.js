const router = require('express').Router()
const {Message} = require('../db/models')
const {Transporter} = require('../communications/email')
const {Client} = require('../communications/sms')
module.exports = router


router.get('/:id', (req, res, next) => {
  Message.findById(req.params.id)
  .then(message => res.json(message))
  .catch(next)
})

router.post('/', (req, res, next) => {
  Message.create(req.body)
  .then(message => {
    let messageData = message.dataValues

    let mailOptions = {
      from: 'LivePin Challenge <livepin.challenge@gmail.com>',
      to: 'binyaminf@yahoo.com',
      subject: 'The App Works',
      text: `A link to the message is available at http://localhost:8080/message/${messageData.id}`
    }
    Transporter.sendMail(mailOptions, (error, info) => {
      if (error){
        console.log(error)
      } else {
        console.log('Email send: ' + info.response)
      }
    })

    Client.messages.create({
      from: '+12014250260',
      to: '+18455582264',
      body: `No working link yet, but the message is: ${messageData.body}`
    })
    res.json(message)
  })
  .catch(next)
})
