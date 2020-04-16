import React, { Component } from "react";
import ArticleSummary from "../Components/ArticleSummary";
import categoryItem from "../media/icn_surfing.svg";
import { CSSTransitionGroup } from "react-transition-group";


export default class Category extends Component {
  constructor(props) {
    super(props);
    this.dropdownController = React.createRef();
    this.dropdownContent = React.createRef();
  }

  /* Loops through a container's direct children and adds their heights together. */
  getInnerHeight = (container) => {
    const children = container.childNodes[0].children;
    // console.log(children[0].children);

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
    const wasOpen = startsOpened ? false : dropdownController.open;

    if (wasOpen) {
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

  manageToggleInLocalStorage = (toggleStatus, categoryStorage) => {
    const categories = JSON.parse(localStorage.getItem(categoryStorage));
    const index = categories.findIndex(
      (category) => category.name === this.props.category
    );
    categories[index].isToggled = toggleStatus;
    localStorage.setItem(categoryStorage, JSON.stringify(categories));
  };

  /* Sets CSS variables, which will trigger transitions */
  animateHeight = (container, isOpen, transitionTime) => {
    const height = isOpen ? this.getInnerHeight(container) : 0;
    console.log(container);
    container.style = `--childHeight: ${height}px; --transitionTime: ${transitionTime}ms`;
  }

  handleClick(e) {
    e.preventDefault();

    // Note new toggle status in localStorage
    this.manageToggleInLocalStorage(!this.dropdownController.current.open, this.props.categoryStorage);

    this.triggerDropdown(
      this.dropdownController.current,
      this.dropdownContent.current
    );
  }

  componentDidMount() {
    // Match toggle status of last time app was used
    if (this.props.isToggled) {
      this.triggerDropdown(
        this.dropdownController.current,
        this.dropdownContent.current,
        true
      );
    }
  }

  render() {
    return (
      <details ref={this.dropdownController}>
        <summary
          className="category__dropdown flex items-center px-4 py-3 text-text-primary bordered-item-t"
          touch-action="none"
          onClick={(e) => e.preventDefault()}
          onPointerDown={(e) => this.handleClick(e)}
        >
          <img
            src={categoryItem}
            width={35}
            height={35}
            alt=""
            className="inline p-2 shadow-black rounded-full"
          />

          <h2 className="inline pl-2 font-bold uppercase">
            {this.props.category}
          </h2>
        </summary>
        <ul className="category__content-container" ref={this.dropdownContent}>
        <CSSTransitionGroup
        transitionName="article"
        transitionEnterTimeout={500}
        transitionLeaveTimeout={500}
        >
          {this.props.articles.map((article) => (
            <li
              className="category__content bordered-item-t"
              key={article.link.content}
            >
              <ArticleSummary article={article} category={this.props.category} swipeAction={this.props.swipeAction} />
            </li>
          ))}
          </CSSTransitionGroup>
        </ul>
      </details>
    );
  }
}
