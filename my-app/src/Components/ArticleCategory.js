import React, { Component } from "react";
import ArticleSummary from "../Components/ArticleSummary";
import categoryItem from "../media/icn_surfing.svg";

export default class Category extends Component {
  constructor(props) {
    super(props);
    this.dropdownController = React.createRef();
    this.dropdownContent = React.createRef();
    this.state = {
      categoryIsOpen: true
    };
  }

  /* Loops through a container's direct children and adds their heights together. */
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
    /* On page load, don't want animation. So if starting opened, have animation speed of 0s to prevent jank. */
    const transitionTime = startsOpened ? 0 : 400;

    /* If startsOpened is true, it should trigger closed -> open. Otherwise, check the open attribute on the dropdownController. */
    const isOpen = startsOpened ? false : dropdownController.open;

    if (isOpen) {
      // On toggling open -> closed: Animate then close dropdown.
      this.animateHeight(dropdownContentContainer, false, transitionTime);
      dropdownController.classList.remove("category--is-open");
      setTimeout(() => {
        dropdownController.open = false;
      }, transitionTime);
    } else {
      // On toggling closed -> open: Open dropdown then animate.
      dropdownController.open = true;
      dropdownController.classList.add("category--is-open");
      this.animateHeight(dropdownContentContainer, true, transitionTime);
    }
  };

  /* Sets CSS variables, which will trigger transitions */
  animateHeight = (container, isOpen, transitionTime) => {
    const height = isOpen ? this.getInnerHeight(container) : 0;
    container.style = `--childHeight: ${height}px; --transitionTime: ${transitionTime}ms`;
  };

  handleClick(e) {
    e.preventDefault();
    e.persist();

    const isTriggeringDropdown = e.target.classList.contains(
      "category__dropdown"
    );

    if (!isTriggeringDropdown) {
      return;
    }

    this.triggerDropdown(
      this.dropdownController.current,
      this.dropdownContent.current
    );
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

    return (
      <details ref={this.dropdownController}>
        <summary
          className="category__dropdown flex items-center px-4 py-3 text-text-primary bordered-item-t"
          touch-action="none"
          onClick={e => e.preventDefault()}
          onPointerDown={e => this.handleClick(e)}
        >
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
