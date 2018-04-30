import React, {Component} from 'react'

class Data extends Component {
  state = {
    body: '',
    email: '',
    phone: '',
    warning: ''
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
    if (type === 'phone' && this.isValidNum(value)){
      if (value.length === 3 || value.length === 7){
        value = value + '-'
      }
      if (value.length <= 12){
        this.setState({ phone: value })
      }
    } else {
      this.setState({
        [type]: value
      })
    }
  }

  render (){
    return (
      <div>
        <div>
          <div>{this.state.warning}</div>
          <input onChange={evt => this.handleInput(evt.target.value, 'body')} value={this.state.body} />
          <input onChange={evt => this.handleInput(evt.target.value, 'email')} value={this.state.email} />
          <input onChange={evt => this.handleInput(evt.target.value, 'phone')} value={this.state.phone} />
          <button onClick={() => console.log(this.state)}>Get State</button>
        </div>
      </div>
    )
  }
}

export default Data
