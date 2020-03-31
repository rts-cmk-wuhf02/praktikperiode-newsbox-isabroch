import React, { Component } from "react";
import ArticleCategory from "../Components/ArticleCategory";

export default class Category extends Component {
  render() {
    const categories = this.props.feed;

    return (
        <ul className="bordered-item-b">
          {categories.map(({category, articles}) => (
            <li key={category}>
              <ArticleCategory category={category} articles={articles}/>
            </li>
          ))}
        </ul>
    );
  }
}
