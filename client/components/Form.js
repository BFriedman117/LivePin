import React, {Component} from 'react'
import axios from 'axios'


class Form extends Component {
  state = {
    body: '',
    email: '',
    validEmail: false,
    phone: '',
    method: 'email'
  }

  parsePhone = input => {
    let numbers = '0123456789'.split('')
    let parsedNumber = ''
    for (let i = 0; i < 12; i++){
      if (numbers.indexOf(input[i]) > -1){
        parsedNumber += input[i]
      }
    }
    return parsedNumber
  }

  displayPhone = input => {
    let output = ''
    for (let i = 0; i < input.length; i++){
      if (output.length === 3 || output.length === 7){
        output += '-'
      }
      output += input[i]
    }
    return output
  }

  handlePhone = input => {
    let phone = this.parsePhone(input)
    let test = this.displayPhone(phone)
    this.setState({ phone: test })
  }

  handleMessage = body => {
    if (body.length < 40) {
      this.setState({ body })
    }
  }

  validateEmail = email => {
    let re = /^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  handleEmail = email => {
    let validEmail = this.validateEmail(email)
    this.setState({ email, validEmail })
  }

  handleSubmit = () => {
    let message = {
      body: this.state.body,
      email: this.state.email !== '' ? this.state.email : null,
      phone: this.state.phone !== '' ? this.parsePhone(this.state.phone) : null
    }
    axios.post('/api/message', message)
    .then(() => {
      this.setState({
        body: '',
        email: '',
        phone: '',
        method: 'email'
      })
    })
    .catch(err => console.log(err))
  }

  setMethod = method => {
    this.setState({ method })
  }

  returnMethod = () => {
    if (this.state.method === 'email'){
      return (
        <div className="form-field" >
          <div className="form-header">Email Address:</div>
          <input className="form-input" onChange={evt => this.handleEmail(evt.target.value)} value={this.state.email} placeholder="Enter your email address" />
        </div>
      )
    } else if (this.state.method === 'text'){
      return (
        <div className="form-field" >
          <div className="form-header">Phone Number:</div>
          <input className="form-input" onChange={evt => this.handlePhone(evt.target.value)} value={this.state.phone} placeholder="Enter your phone number" />
        </div>
      )
    }
  }

  render (){
    return (
      <div className="form-container">
          <div className="form-field" >
            <div className="form-header">Message:</div>
            <input className="form-input" onChange={evt => this.handleMessage(evt.target.value)} value={this.state.body} placeholder="Type a short message for yourself" />
          </div>
          <div className="form-field method">
            <button className={this.state.method === 'email' ? 'form-method-button active' : 'form-method-button'} onClick={() => this.setMethod('email')}>Send Email</button>
            <button className={this.state.method === 'text' ? 'form-method-button active' : 'form-method-button'} onClick={() => this.setMethod('text')}>Send Text Message</button>
          </div>
          {
            this.returnMethod()
          }
          <div className="form-field">
            <button className="form-submit" onClick={this.handleSubmit}>Submit</button>
          </div>
      </div>
    )
  }
}

export default Form
