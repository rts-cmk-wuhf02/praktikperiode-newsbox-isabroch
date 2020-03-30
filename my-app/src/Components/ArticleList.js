import React, { Component } from "react";
import ArticleCategory from "../Components/ArticleCategory";

export default class Category extends Component {
  render() {
    const categories = ["1", "2", "3"];

    return (
        <ul className="bordered-item-b">
          {categories.map(category => (
            <li key={category}>
              <ArticleCategory category={category}/>
            </li>
          ))}
        </ul>
    );
  }
}
