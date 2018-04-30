import React, {Component} from 'react'
import axios from 'axios'

class Form extends Component {
  state = {
    body: '',
    email: '',
    phone: '',
    method: null
  }

  isValidNum = string => {
    const numbers = '0123456789-'.split('')
    let i;
    for (i = 0; i < string.length; i++){
      if (numbers.indexOf(string[i]) === -1) {
        return false
      } else {
        return true
      }
    }
  }

  handleInput = (value, type) => {
    if (type === 'phone'){
      if (this.isValidNum(value) && value.length <= 10){
        this.setState({ phone: value })
      }
    } else {
      this.setState({
        [type]: value
      })
    }
  }

  handleSubmit = () => {
    let message = {
      body: this.state.body,
      email: this.state.email !== '' ? this.state.email : null,
      phone: this.state.phone !== '' ? this.state.phone : null
    }
    axios.post('/api/message', message)
    .then(res => console.log(res))
    .then(() => {
      this.setState({
        body: '',
        email: '',
        phone: '',
        method: null
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
          <div>Email:</div>
          <input onChange={evt => this.handleInput(evt.target.value, 'email')} value={this.state.email} />
        </div>
      )
    } else if (this.state.method === 'text'){
      return (
        <div className="form-field" >
          <div>Phone:</div>
          <input onChange={evt => this.handleInput(evt.target.value, 'phone')} value={this.state.phone} />
        </div>
      )
    }
  }

  render (){
    return (
      <div>
          <div className="form-field" >
            <div>Message:</div>
            <textarea onChange={evt => this.handleInput(evt.target.value, 'body')} value={this.state.body} />
          </div>
          <div>
            <button onClick={() => this.setMethod('email')}>Send Email</button>
            <button onClick={() => this.setMethod('text')}>Send Text Message</button>
          </div>
          {
            this.returnMethod()
          }
          <button onClick={this.handleSubmit}>Submit</button>
      </div>
    )
  }
}

export default Form
