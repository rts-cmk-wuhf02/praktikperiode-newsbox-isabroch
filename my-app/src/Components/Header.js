import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Header extends Component {
  render() {
    return (
      <header class="grid p-6 grid-cols-header text-center items-center text-lg text-text-primary border-solid border-b-2 border-bg-secondary">
        {this.props.leftIcon ? (
          <Link to={this.props.leftRoute}>
            <span className={`th ${`th-${this.props.leftIcon}`}`.trim()}></span>
          </Link>
        ) : null}
        <h1 className="font-bold font-main">{this.props.title}</h1>
        {this.props.rightIcon ? (
          <Link to={this.props.rightRoute}>
            <span className={`th ${`th-${this.props.rightIcon}`}`.trim()}></span>
          </Link>
        ) : null}
      </header>
    );
  }
}
