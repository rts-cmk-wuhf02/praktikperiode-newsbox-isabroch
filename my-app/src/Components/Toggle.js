import React, { Component } from "react";

export default class Toggle extends Component {
  handleChange = () => {
    this.props.handleToggle({name: this.props.toggleTitle, isEnabled: !this.props.isToggled});
  }

  render() {
    return (
      <label className="toggle">
        <input type="checkbox" className="toggle__checkbox" checked={this.props.isToggled} onChange={this.handleChange}/>
        <h3 className="toggle__title text-text-primary">{this.props.toggleTitle}</h3>
        <div className="toggle__slider">Toggle</div>
      </label>
    );
  }
}
