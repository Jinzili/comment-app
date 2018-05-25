import React, { Component } from 'react'
import PropTypes from 'prop-types'

class CommentInput extends Component {

  static propTypes = {
    onSubmit: PropTypes.func
  }

  constructor(){
    super()
    this.state = {
      username: '',
      content: '',
    }
  }

  componentWillMount(){
    this._loadUsername()
  }

  componentDidMount(){
    this.textarea.focus()
  }

  handleUsernameChange(e){
    this.setState({
      username: e.target.value
    })
  }

  handleUsernameBlur(e){
      this._saveUserName(e.target.value)
  }

  _loadUsername(){
    const username = localStorage.getItem('username')
    if(username){
      this.setState({username})
    }
  }

  _saveUserName(username){
    localStorage.setItem('username', username)
  }

  handleContentChange(e){
    this.setState({
      content: e.target.value
    })
  }

  handleSubmit(){
    if(this.props.onSubmit){
      this.props.onSubmit({
        username: this.state.username,
        content: this.state.content,
        createdTime: +new Date()
      })
    }
    this.setState({content: ''})
  }

  render () {
    return (
      <div className='comment-input'>
        <div className='comment-field'>
          <span className='comment-field-name'>用户名：</span>
          <div className='comment-field-input'>
            <input
              value={this.state.username}
              onChange={this.handleUsernameChange.bind(this)}
              onBlur={this.handleUsernameBlur.bind(this)}/>
          </div>
        </div>
        <div className='comment-field'>
          <span className='comment-field-name'>评论内容：</span>
          <div className='comment-field-input'>
            <textarea
              ref={(textarea) => this.textarea = textarea}
              value={this.state.content}
              onChange={this.handleContentChange.bind(this)}/>
          </div>
        </div>
        <div className='comment-field-button'>
          <button
            onClick={this.handleSubmit.bind(this)}>
            发布
          </button>
        </div>
      </div>
    )
  }
}

export default CommentInput
