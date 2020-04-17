import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Header extends Component {
  render() {
    return (
      <header className="grid p-6 grid-cols-header text-center items-center text-lg text-text-primary bordered-item-b bg-bg-primary sticky z-40 top-0 overflow-hidden">
        {this.props.leftIcon ? (
          <Link to={this.props.leftRoute} className={`increaseTouchArea th ${`th-${this.props.leftIcon}`}`.trim()}>
          </Link>
        ) : null}
        <h1 className="font-bold font-main">{this.props.title}</h1>
        {this.props.rightIcon ? (
          <Link to={this.props.rightRoute} className={`increaseTouchArea th ${`th-${this.props.rightIcon}`}`.trim()}>
          </Link>
        ) : null}
      </header>
    );
  }
}
