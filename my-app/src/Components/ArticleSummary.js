import React, { Component } from "react";

class DeleteButton extends Component {
  render() {
    return (
      <button className="absolute top-0 left-0 w-full h-full bg-action-delete text-right">
        <span className="text-lg text-text-button pr-10 th th-trash"></span>
      </button>
    );
  }
}

class ArchiveButton extends Component {
  render() {
    return (
      <button className="absolute top-0 left-0 w-full h-full bg-primary text-right">
        <span className="text-lg text-text-button pr-10 th th-bookmark-1-o"></span>
      </button>
    );
  }
}

class ActionButton extends Component {
  render() {
    switch (this.props.action) {
      case "delete":
        return <DeleteButton />;

      case "archive":
        return <ArchiveButton />;

      default:
        return null;
    }
  }
}

class ArticleImage extends Component {
  getImage() {
    const defaultImage = "http://placekitten.com/150";
    let image = defaultImage;
    if (this.props.article.hasOwnProperty("media:content")) {
      image = this.props.article["media:content"].url;
    }

    return image;
  }

  render() {
    return (
      <img
        src={this.getImage()}
        alt=""
        width={70}
        height={70}
        className="rounded-full h-16 w-16 order-first"
      />
    );
  }
}

export default class ArticleSummary extends Component {
  constructor(props) {
    super(props);
    this.el = React.createRef()
    this.state = {
       totalMoved: 0,
       currentX: 0,
       isSwiping: false,
    }
  }


  handleStartPan = (e) => {
    e.preventDefault();
       // Detect if click/tap or hold (longer than 0.1ms)
    this.clickTimer = setTimeout( () => {
      this.setState({isSwiping: true, totalMoved: 0, currentX: 0});
    }, 100)
  };

  handlePan = (e) => {
    e.persist();

    if (this.state.isSwiping) {
      let scrollPosition = this.state.currentX + e.movementX;
      if (scrollPosition > 0) { scrollPosition = 0 }
      this.setState({currentX: scrollPosition});
      // Calculate x movement of mouse to account for clicking and holding, but not dragging.
      this.setState({totalMoved: this.state.totalMoved + Math.abs(e.movementX)})
      e.preventDefault();
    }
  };

  handleEndPan = (e) => {
    clearTimeout(this.clickTimer);
    e.persist();

    if (this.state.isSwiping && this.state.totalMoved > 5) {
      /* If drag ends at less than 25% of notification width, swipe all the way to left. Else, reset to 0. */
      const elWidth = this.el.current.offsetWidth;
      const threshold = Math.round(elWidth * 0.25) * -1;
      let endPosition = this.state.currentX < threshold ? `-100%` : 0;
      this.setState({currentX: endPosition, isSwiping: false});

      /* Reset after a bit */
      if (endPosition) {
        setTimeout(() => {
          this.setState({currentX: 0})
        }, 1500);
      }
    } else if (e.type === "pointerup") {
      /* If type is pointerUp, tap is less than 0.1s in duration OR user did not move more than 5px while holding, register as click and travel to link */
      window.location = e.target.href;
    }
  }

  render() {
   return (
      <article
        className="relative select-none"
        onPointerMove={this.handlePan}
        onPointerUp={this.handleEndPan}
        onPointerLeave={this.handleEndPan}
        onPointerDown={this.handleStartPan}
        onClick={(e) => e.preventDefault()} /* Prevent mouse clicks when dragging */
        ref={this.el}
      >
        <div className={`grid grid-cols-auto-1 px-4 py-4 relative z-10 bg-bg-primary w-full ${this.state.isSwiping ? "is-swiping" : "is-not-swiping"}`} style={ {left: this.state.currentX} }>
          <div className="pl-5 pr-10 overflow-hidden">
            <h3 className="text-text-primary font-bold truncate">
              <a
                className="article__link"
                href={this.props.article.link.content}
              >
                {this.props.article.title.content}
              </a>
            </h3>
            <p className="text-sm text-text-secondary truncate-2line leading-snug">
              {this.props.article.description.content}
            </p>
          </div>
          <ArticleImage {...this.props} />
        </div>
        <ActionButton action="archive" />
      </article>
    );
  }
}
