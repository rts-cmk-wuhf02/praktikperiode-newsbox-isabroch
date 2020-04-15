import React, { Component } from "react";
import Header from "../Components/Header";
import Toggle from "../Components/Toggle";
import VersionNumber from "../Components/VersionNumber";

class ToggleList extends Component {
  render() {
    const items = this.props.items;

    if (items && items.length > 0) {
      const toggles = items.map((item) => (
        <li className="bordered-item-between uppercase font-bold text-text-primary" key={item.name}>
          <Toggle toggleTitle={item.name} isToggled={item.enabled} handleToggle={this.props.handleToggle} componentClass="p-5"/>
        </li>
      ));

      return (
        <ul className={`rounded-lg overflow-hidden bg-bg-primary shadow-black max-w-lg w-full ${this.props.componentClass}`}>
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
      <div className="bg-bg-secondary page">
        <Header
          leftIcon="chevron-left"
          leftRoute="/"
          rightIcon=""
          rightRoute=""
          title="News Settings"
        />

        <div className="flex flex-col items-center mx-4">
          <h2 className="mt-10 text-center leading-tight title-divider">
            <span className="text-primary font-bold text-3xl">Manage</span><br />
            <span className="text-text-secondary text-xl">Categories</span>
          </h2>

          <ToggleList items={this.props.categories} handleToggle={this.props.handleToggle} componentClass="mt-16 mb-20" />

          <button className="inline-block uppercase font-label text-text-primary border-solid border-bg-tertiary border px-4 py-3 tracking-wider rounded-full focus:outline-none focus:shadow-outline" onClick={this.props.handleColorMode}>Toggle dark mode</button>
          <VersionNumber componentClass="block text-center text-text-secondary text-xs mt-auto mb-10"/>
        </div>
      </div>
    );
  }
}
