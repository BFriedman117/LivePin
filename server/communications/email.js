const nodemailer = require('nodemailer');
const { PASSWORD } = require('../../secrets')

const Transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'livepin.challenge@gmail.com',
    pass: PASSWORD
  }
});

module.exports = { Transporter }
