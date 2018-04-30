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
      <div>
        <div>
          HI THERE!
        </div>
        <div>ID is:</div>
        <div>{this.props.match.params.id}</div>
        <div>Body is:</div>
        <div>{this.state.message}</div>
      </div>
    )
  }
}

export default Message
