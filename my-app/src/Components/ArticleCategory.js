import React, { Component } from "react";
import ArticleSummary from "../Components/ArticleSummary";

export default class Category extends Component {
  render() {
    const articles = ["1", "2", "3"];

    return (
      <details>
        <summary>
          <h2>Sport</h2>
        </summary>
        <ul>
          {articles.map(article => (
            <li>
              <ArticleSummary article={article}/>
            </li>
          ))}
        </ul>
      </details>
    );
  }
}
