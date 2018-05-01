const Twilio = require('twilio')
// const { ACCOUNT_SID, AUTH_TOKEN } = require('../../secrets')

// const Client = new Twilio(ACCOUNT_SID || process.env.ACCOUNT_SID, AUTH_TOKEN || process.env.AUTH_TOKEN)
const Client = new Twilio('AC2358da5c2ac2a005f53aee0846f76b85', '82480838e9b41ca2fc04c81978fe2b6a')

module.exports = { Client }
