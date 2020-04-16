import React, { Component } from "react";
import Archive from "./Routes/Archive";
import Newsbox from "./Routes/Newsbox";
import Settings from "./Routes/Settings";
import { BrowserRouter as Switch, Route } from "react-router-dom";

function getDefaultColorMode() {
  // check if colormode settings exist in storage
  // else check if user has color preference for dark mode
  // else default to light mode

  let colorMode = "light";

  const storedColorMode = localStorage.getItem("colorMode");
  if (storedColorMode) {
    colorMode = storedColorMode;
  } else if (window.matchMedia("prefers-color-scheme: dark")) {
    colorMode = "dark";
  }

  // create colorMode item!
  localStorage.setItem("colorMode", colorMode)

  console.log(colorMode);

  return colorMode;
}

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      categories: this.getCategoryStart(),
      isLightMode: getDefaultColorMode() === 'light'
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

  handleCategoryToggle = (toggledCategory) => {
    const newCategoryState = this.getCategoryStart();

    const index =    newCategoryState.findIndex( category => category.name === toggledCategory.name );

    newCategoryState[index].enabled = toggledCategory.isEnabled;

    localStorage.setItem("newsboxCategories", JSON.stringify(newCategoryState));

    this.setState({categories: newCategoryState});
  }

  changeColorMode = () => {
    const newColorMode = !this.state.isLightMode ? "light" : "dark";
    console.log(newColorMode);
    localStorage.setItem("colorMode", newColorMode)
    this.setState({isLightMode: !this.state.isLightMode});
  }

  render() {
    return (
      <div className={`bg-bg-primary app app--${this.state.isLightMode ? 'light' : 'dark'}`}>
        <Switch>
          <Route exact path="/settings">

            <Settings categories={this.state.categories} handleToggle={this.handleCategoryToggle} handleColorMode={this.changeColorMode}/>

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
