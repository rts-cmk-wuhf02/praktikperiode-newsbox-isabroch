import React, { Component } from "react";
import Header from "../Components/Header";
import Toggle from "../Components/Toggle";
import VersionNumber from "../Components/VersionNumber";

class ToggleList extends Component {
  render() {
    const items = this.props.items;

    if (items && items.length > 0) {
      const toggles = items.map((item) => (
        <li className="bordered-item-between p-4" key={item.name}>
          <Toggle toggleTitle={item.name} isToggled={item.enabled} handleToggle={this.props.handleToggle}/>
        </li>
      ));

      return (
        <ul className="my-10 mx-5 rounded overflow-hidden bg-bg-primary">
          {toggles}
        </ul>
      );
    } else {
      return <div>No options available!</div>;
    }
  }
}

export default class Settings extends Component {
    render() {

    return (
      <div className="bg-bg-secondary">
        <Header
          leftIcon="chevron-left"
          leftRoute="/"
          rightIcon=""
          rightRoute=""
          title="News Settings"
        />

        {/* Title */}
        <h2>
          <span className="">Manage</span>
          <span className="">Categories</span>
        </h2>

        <ToggleList items={this.props.categories} handleToggle={this.props.handleToggle} />

        <button>Toggle dark mode</button>
        <VersionNumber />
      </div>
    );
  }
}
