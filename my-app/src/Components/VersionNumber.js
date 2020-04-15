import React, { Component } from 'react'

export default class VersionNumber extends Component {
  render() {
    const versionNumber = "4.8.15.16.23.42";

    return (
        <span className={this.props.componentClass}>Version {versionNumber}</span>
    )
  }
}
