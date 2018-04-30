const Sequelize = require('sequelize')
const db = require('../db')

const Message = db.define('message', {
  body: {
    type: Sequelize.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING
  },
  phone: {
    type: Sequelize.INTEGER
  }
})

module.exports = Message
