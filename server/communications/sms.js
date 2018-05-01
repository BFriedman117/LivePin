const Twilio = require('twilio')
const { ACCOUNT_SID, AUTH_TOKEN } = require('../../secrets')

const Client = new Twilio(ACCOUNT_SID  || process.env.ACCOUNT_SID, AUTH_TOKEN || process.env.ACCESS_TOKEN)

module.exports = { Client }
