import React, { Component } from 'react';
import { Modal } from 'react-bootstrap'

class Toast extends Component {
  state = {
    toastOpen: false,
    title: '',
    message: ''
  }

  componentDidMount() {
    this.props.onRef(this)
  }
  componentWillUnmount() {
    this.props.onRef(null)
  }

  show = (title, message) => {
    this.setState(() => ({
      toastOpen: true,
      title,
      message
    }))
  }

  closeToast = () => {
    this.setState(() => ({
      toastOpen: false,
    }))
  }

  render() {
    const { title, message } = this.state
    return (
      <Modal bsSize='small' show={this.state.toastOpen} onHide={this.closeToast}>
        <Modal.Header closeButton>
          <Modal.Title> {title} </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {message}
        </Modal.Body>
        <Modal.Footer>
          <button onClick={this.closeToast}>Close</button>
        </Modal.Footer>
      </Modal>
    )
  }
}

class ToastBox extends React.Component {
	render() {
    return <Toast {...this.props} />
  }
}

export default Toast;
