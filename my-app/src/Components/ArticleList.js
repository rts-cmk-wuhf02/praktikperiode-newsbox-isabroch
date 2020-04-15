import React, { Component } from "react";
import ArticleCategory from "../Components/ArticleCategory";
import { CSSTransitionGroup } from "react-transition-group";

export default class Category extends Component {
  render() {
    return (
        <ul className="bordered-item-b">

          {this.props.feed.map(({category, articles, isToggled}) => (
            <li key={category}>
              <ArticleCategory category={category} articles={articles} isToggled={isToggled} swipeAction={this.props.swipeAction}/>
            </li>
          ))}

        </ul>
    );
  }
}
