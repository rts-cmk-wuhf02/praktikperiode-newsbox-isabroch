import React, { Component } from 'react'
import Header from '../Components/Header'
import Search from '../Components/Search'

export default class Archive extends Component {
  render() {
    return (
      <div>
        <Header leftIcon="chevron-left" leftRoute="/" rightIcon="settings" rightRoute="/settings" title="Archive"/>
        <Search/>
      </div>
    )
  }
}
