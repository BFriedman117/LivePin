const Twilio = require('twilio')
const { ACCOUNT_SID, AUTH_TOKEN } = require('../../secrets')

const Client = new Twilio(ACCOUNT_SID, AUTH_TOKEN)
module.exports = { Client }
