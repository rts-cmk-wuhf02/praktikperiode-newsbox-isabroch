import React, { Component } from 'react'

export class Notification extends Component {
  render() {
    return (

        <div className={`fixed bottom-0 p-2 text-center rounded z-50 bg-bg-notification text-bg-primary notification text-sm`}>
        {this.props.children}
      </div>

    )
  }
}

export default Notification
