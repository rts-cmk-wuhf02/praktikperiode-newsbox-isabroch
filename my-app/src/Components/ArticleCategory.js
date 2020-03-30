import React, { Component } from "react";
import ArticleSummary from "../Components/ArticleSummary";
import categoryItem from "../media/icn_surfing.svg";

export default class Category extends Component {
  constructor(props) {
    super(props);
    this.dropdownController = React.createRef();
    this.dropdownContent = React.createRef();
  }

  getInnerHeight = container => {
    const children = container.childNodes;

    let totalHeight = 0;

    for (const child of children) {
      totalHeight += child.offsetHeight;
    }

    return totalHeight;
  };

  triggerDropdown = (
    dropdownController,
    dropdownContentContainer,
    startsOpened
  ) => {
    const transitionTime = startsOpened ? 0 : 400;

    const isOpen = !startsOpened && dropdownController.open;

    if (isOpen) {
      // On toggling open -> closed: Animate then close dropdown.
      this.animateHeight(dropdownContentContainer, false, transitionTime);
      dropdownController.classList.remove("category--is-open");
      setTimeout(() => {
        dropdownController.open = false;
      }, transitionTime);
    } else {
      // On toggling closed -> open: Open dropdown then animate.
      dropdownController.classList.add("category--is-open");
      dropdownController.open = true;
      this.animateHeight(dropdownContentContainer, true, transitionTime);
    }
  };

  animateHeight = (container, isOpen, transitionTime) => {
    const height = isOpen ? this.getInnerHeight(container) : 0;
    console.log(height);
    container.style = `--childHeight: ${height}px; --transitionTime: ${transitionTime}ms`;
  };

  handleClick(e, containerClass) {
    e.preventDefault();
    e.persist();
    const isTriggeringDropdown = e.target.classList.contains(
      "category__dropdown"
    );

    if (!isTriggeringDropdown) {
      return;
    }

    const dropdownController = e.currentTarget;
    const dropdownContentContainer = e.currentTarget.querySelector(
      containerClass
    );

    this.triggerDropdown(dropdownController, dropdownContentContainer);
  }

  componentDidMount() {
    this.triggerDropdown(
      this.dropdownController.current,
      this.dropdownContent.current,
      true
    );
  }

  render() {
    const articles = ["1", "2", "3"];
    const isOpen = true;

    return (
      <details
        className={"category " + isOpen && "category--is-open"}
        open={isOpen}
        ref={this.dropdownController}
        onClick={e => this.handleClick(e, ".category__content-container")}
      >
        <summary className="category__dropdown flex items-center px-4 py-3 text-text-primary bordered-item-t">
          <img
            src={categoryItem}
            width={35}
            height={35}
            alt=""
            className="inline p-2 shadow-xl rounded-full"
          />
          <h2 className="inline pl-2 font-bold uppercase">Sport</h2>
        </summary>
        <ul className="category__content-container" ref={this.dropdownContent}>
          {articles.map(article => (
            <li className="category__content bordered-item-t" key={article}>
              <ArticleSummary article={article} />
            </li>
          ))}
        </ul>
      </details>
    );
  }
}
