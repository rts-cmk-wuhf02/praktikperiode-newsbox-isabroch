import React, { Component } from "react";

export default class Header extends Component {
  render() {
    return (
      <header class="grid p-6 grid-cols-header text-center items-center text-lg text-text-primary border-solid border-b-2 border-bg-secondary">
        <button className={`th ${`th-${this.props.leftIcon}` || ''}`.trim()}></button>
        <h1 className="font-bold font-main">{this.props.title}</h1>
        <button className={`th ${`th-${this.props.rightIcon}`|| ''}`.trim()}></button>
      </header>
    );
  }
}
