import React, {Component} from 'react'
import axios from 'axios'


class Form extends Component {
  state = {
    body: '',
    email: '',
    validEmail: false,
    phone: '',
    validPhone: false,
    method: 'email',
    focus: null
  }

  handleFocus = focus => {
    this.setState({ focus })
  }

  handleSuccess = type => {
    let success = null
    if (type === 'phone'){
      success = this.state.validPhone
    } else if (type === 'email'){
      success = this.state.validEmail
    }

    if (success){
      return (
        <div className="input-success">✓</div>
      )
    }
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
    let validPhone = output.length === 12
    this.setState({ validPhone })
    return output
  }

  handlePhone = input => {
    let parseInput = this.parsePhone(input)
    let phone = this.displayPhone(parseInput)
    this.setState({ phone })
  }

  handleMessage = body => {
    if (body.length < 40) {
      this.setState({ body })
    }
  }

  validateEmail = email => {
    let re = /^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let success = re.test(String(email).toLowerCase())
    this.setState({validEmail: success})
    return success;
  }

  handleEmail = email => {
    let validEmail = this.validateEmail(email)
    this.setState({ email, validEmail })
  }

  validateSubmit = () => {
    if (this.state.body === ''){
      console.log('nobody')
      return false
    } else if (this.state.validEmail || this.state.phone.length === 12) {
      console.log('looking good')
      return true
    } else {
      console.log('youre missing something')
      return false
    }
  }

  handleSubmit = () => {
    let message = {
      body: this.state.body,
      email: this.state.email !== '' ? this.state.email : null,
      phone: this.state.phone !== '' ? this.parsePhone(this.state.phone) : null
    }

    if (this.validateSubmit()){
      axios.post('/api/message', message)
      .then(response => {
        this.setState({
          body: '',
          email: '',
          phone: '',
          method: 'email'
        })
        return response
      })
      .then(response => console.log('the response is: ', response.status))
      .catch(err => console.log(err))
    }
  }

  setMethod = method => {
    this.setState({ method })
  }

  returnContactMethod = () => {
    if (this.state.method === 'email'){
      return (
        <div className="form-field" >
          <div className={this.state.focus === 'email' ? 'form-header active' : 'form-header'}>Email Address:</div>
          <div className={this.state.focus === 'email' ? 'input-container active' : 'input-container'} onClick={() => this.handleFocus('email')}>
            <input className="form-input" onChange={evt => this.handleEmail(evt.target.value)} value={this.state.email} placeholder="Enter your email address" />
            {
              this.handleSuccess('email')
            }
          </div>
        </div>
      )
    } else if (this.state.method === 'phone'){
      return (
        <div className="form-field" >
          <div className={this.state.focus === 'phone' ? 'form-header active' : 'form-header'}>Phone Number:</div>
          <div className={this.state.focus === 'phone' ? 'input-container active' : 'input-container'} onClick={() => this.handleFocus('phone')}>
            <input className="form-input" onChange={evt => this.handlePhone(evt.target.value)} value={this.state.phone} placeholder="Enter your phone number" />
            {
              this.handleSuccess('phone')
            }
          </div>
        </div>
      )
    }
  }

  render (){
    return (
      <div className="form-container">
          <div className="form-field" >
            <div className={this.state.focus === 'message' ? 'form-header active' : 'form-header'}>Message:</div>
            <div className={this.state.focus === 'message' ? 'input-container active' : 'input-container'} onClick={() => this.handleFocus('message')}>
              <input className="form-input" onChange={evt => this.handleMessage(evt.target.value)} value={this.state.body} placeholder="Type a short message for yourself" />
              {}
            </div>
          </div>
          <div className="form-field method">
            <button className={this.state.method === 'email' ? 'form-method-button active' : 'form-method-button'} onClick={() => this.setMethod('email')}>Send Email</button>
            <button className={this.state.method === 'phone' ? 'form-method-button active' : 'form-method-button'} onClick={() => this.setMethod('phone')}>Send Text Message</button>
          </div>
          {
            this.returnContactMethod()
          }
          <div className="form-field">
            <button className="form-submit" onClick={this.handleSubmit}>Submit</button>
          </div>
      </div>
    )
  }
}

export default Form
