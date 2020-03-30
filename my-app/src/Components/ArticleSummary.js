import React, { Component } from "react";

class DeleteButton extends Component {
  render() {
    return (
      <button className="absolute top-0 left-0 w-full h-full bg-action-delete text-right">
      <span className="text-lg text-text-button pr-10 th th-trash"></span>
      </button>
    )
  }
}

class ArchiveButton extends Component {
  render() {
    return (
      <button className="absolute top-0 left-0 w-full h-full bg-primary text-right">
      <span className="text-lg text-text-button pr-10 th th-bookmark-1-o"></span>
      </button>
    )
  }
}

class ActionButton extends Component {
  render() {
    switch (this.props.action) {
      case "delete":
        return <DeleteButton/>;

      case "archive":
        return <ArchiveButton/>

      default:
        return null;
    }
  }
}


export default class ArticleSummary extends Component {
  render() {
    return (
      <article className="relative">
        <div className="grid grid-cols-auto-1 px-4 py-4 relative z-10 bg-bg-primary w-full">
          <div className="pl-5 pr-10 overflow-hidden">
            <h3 className="text-text-primary font-bold truncate">
              {this.props.article.title}
            </h3>
            <p className="text-sm text-text-secondary truncate-2line leading-snug">
              {this.props.article.description}
            </p>
          </div>
          <img
            src="http://placekitten.com/100/100"
            alt=""
            width={70}
            height={70}
            className="rounded-full h-16 w-16 order-first"
          />
        </div>
        <ActionButton action="archive"/>
      </article>
    );
  }
}
