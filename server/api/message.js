const router = require('express').Router()
const {Message} = require('../db/models')
module.exports = router

router.get('/:id', (req, res, next) => {
  Message.findById(req.params.id)
  .then(message => res.json(message))
  .catch(next)
})

router.post('/', (req, res, next) => {
  Message.create(req.body)
  .then(message => res.json(message))
  .catch(next)
})
