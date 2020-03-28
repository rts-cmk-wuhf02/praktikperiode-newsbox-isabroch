import React, { Component } from "react";

export default class ArticleSummary extends Component {
  render() {
    return (
      <article>
        <div>
          <h3>{this.props.article}</h3>
          <p>Description</p>
          <img src="" alt="" width={100} height={100} />
        </div>
        <button></button>
      </article>
    );
  }
}
