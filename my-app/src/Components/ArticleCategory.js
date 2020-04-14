import React, { Component } from "react";
import ArticleSummary from "../Components/ArticleSummary";
import categoryItem from "../media/icn_surfing.svg";

export default class Category extends Component {
  constructor(props) {
    super(props);
    this.dropdownController = React.createRef();
    this.dropdownContent = React.createRef();
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

    // Note new toggle status in localStorage
    this.manageToggleInLocalStorage(dropdownController.open)
  };

  manageToggleInLocalStorage = (toggleStatus) => {
    const categories = JSON.parse(localStorage.getItem('categories'));
    const index = categories.findIndex( category => category.name === this.props.category);
    categories[index].isToggled = toggleStatus;
    localStorage.setItem('categories', JSON.stringify(categories));
  }

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
    // Match toggle status of last time app was used
    if(this.props.isToggled) {
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

          <h2 className="inline pl-2 font-bold uppercase">{this.props.category}</h2>
        </summary>
        <ul className="category__content-container" ref={this.dropdownContent}>
          {this.props.articles.map(article => (
            <li className="category__content bordered-item-t" key={article.link.content}>
              <ArticleSummary article={article} />
            </li>
          ))}
        </ul>
      </details>
    );
  }
}
