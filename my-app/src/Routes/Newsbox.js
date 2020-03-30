import React, { Component } from 'react'
import Header from '../Components/Header'
import Search from '../Components/Search'

export default class Newsbox extends Component {
  render() {
    return (
      <div>
        <Header leftIcon="bookmark-1" leftRoute="/archive" rightIcon="settings" rightRoute="/settings" title="Newsbox"/>
        <Search/>
      </div>
    )
  }
}
