import React, { Component } from "react";
import ArticleSummary from "../Components/ArticleSummary";
import categoryItem from "../media/icn_surfing.svg";

export default class Category extends Component {
  render() {
    const articles = ["1", "2", "3"];

    return (
      <details className="category">
        <summary className="category__dropdown flex items-center px-4 py-3 text-text-primary bordered-item">
          <img
            src={categoryItem}
            width={35}
            height={35}
            alt=""
            className="inline p-2 shadow-xl rounded-full"
          />
          <h2 className="inline pl-2 font-bold uppercase">Sport</h2>
        </summary>
        <ul>
          {articles.map(article => (
            <li>
              <ArticleSummary article={article} />
            </li>
          ))}
        </ul>
      </details>
    );
  }
}
