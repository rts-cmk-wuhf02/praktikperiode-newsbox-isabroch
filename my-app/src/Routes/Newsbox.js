import React, { Component } from 'react'
import Header from '../Components/Header'

export default class Newsbox extends Component {
  render() {
    return (
      <div>
        <Header leftIcon="bookmark-1" leftRoute="/archive" rightIcon="settings" rightRoute="/settings" title="Newsbox"/>
      </div>
    )
  }
}
