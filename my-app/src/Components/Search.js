import React, { Component } from 'react'
import { Link } from "react-router-dom";

export default class Search extends Component {
  render() {
    return (
      <form className="p-4 bordered-item">
        <div className="flex bg-bg-secondary w-full rounded font-main font-light text-text-primary items-center px-2">
          <input type="search" name="searchResults" placeholder="Search news" className="flex-auto py-2 px-4 placeholder-text-secondary bg-transparent placeholder-op"/>
          <Link to="/search" className="p-2 th th-loupe-o text-text-secondary" />
        </div>
      </form>
    )
  }
}
