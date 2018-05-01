import React, {Component} from 'react'
import axios from 'axios'

class Message extends Component {
  state = {
    message: null
  }

  componentDidMount(){
    let id = this.props.match.params.id
    axios.get(`/api/message/${id}`)
    .then(res => {
      this.setState({
        message: res.data.body
      })
    })
    .catch(error => console.log(error))
  }
  render(){
    return (
      <div className="form-container">
        <div className="form-header">The message is:</div>
        <div>{this.state.message}</div>
      </div>
    )
  }
}

export default Message
