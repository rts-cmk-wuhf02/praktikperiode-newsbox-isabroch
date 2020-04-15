import React, { Component } from "react";
import Archive from "./Routes/Archive";
import Newsbox from "./Routes/Newsbox";
import Settings from "./Routes/Settings";
import { BrowserRouter as Switch, Route } from "react-router-dom";


export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      categories: this.getCategoryStart(),
    };
  }

  getCategoryStart = () => {
    // Default category settings
    let categories = [
      { name: "Europe", isToggled: false, enabled: true },
      { name: "Arts", isToggled: false, enabled: true },
      { name: "Health", isToggled: false, enabled: true },
      { name: "Technology", isToggled: false, enabled: true },
      { name: "Sports", isToggled: false, enabled: true },
    ];
    // If categories exist in localStorage, copy settings from there. Else, use default category settings.
    if (localStorage.getItem("newsboxCategories")) {
      categories = JSON.parse(localStorage.getItem("newsboxCategories"));
    }

    // Set category this.state.
    localStorage.setItem("newsboxCategories", JSON.stringify(categories));
    return categories;
  };

  handleToggle = (toggledCategory) => {
    const newCategoryState = this.getCategoryStart();

    const index =    newCategoryState.findIndex( category => category.name === toggledCategory.name );

    newCategoryState[index].enabled = toggledCategory.isEnabled;

    localStorage.setItem("newsboxCategories", JSON.stringify(newCategoryState));

    this.setState({categories: newCategoryState});
  }

  render() {
    return (
      <div className="app">
        <Switch>
          <Route exact path="/settings">
            <Settings categories={this.state.categories} handleToggle={this.handleToggle}/>
          </Route>
          <Route exact path="/archive">
            <Archive />
          </Route>
          <Route exact path="/">
            <Newsbox categories={this.state.categories}/>
          </Route>
        </Switch>
      </div>
    );
  }
}
