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
    switch (this.props.action.toLowerCase()) {
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
  render() {
    return (
      <img
        src={this.props.url}
        alt={this.props.alt}
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
    this.article = React.createRef();
    this.state = {
      currentX: 0,
      currentY: 0,
      isSwiping: false,
    };
    this.x1 = 0;
    this.y1 = 0;
  }

  getImage = (article) => {
    const defaultImage = "http://placekitten.com/150";
    let image = defaultImage;
    let alt = "";
    if (article.hasOwnProperty("media:content")) {
      image = article["media:content"].url;
    }
    if (article.hasOwnProperty("media:description")) {
      alt = article["media:description"].content;
    }

    return { image: image, alt: alt };
  };

  handleStartPan = (e) => {
    // e.preventDefault();
    e.persist();

    this.x1 = e.clientX;
    this.y1 = e.clientY;

    // register click and drag instead of hover pans.
    this.setState({ isSwiping: true, currentX: 0 });
  };

  handlePan = (e) => {
    e.persist();
    e.preventDefault();

    this.x2 = e.clientX;
    this.y2 = e.clientY;

    // Calculate xDelta and yDelta (diff between x1->x2, y1->y2)
    this.xDelta = this.x2 - this.x1;
    this.yDelta = this.y2 - this.y1;

    console.log(this.y1, this.y2);


    if (this.state.isSwiping && Math.abs(this.xDelta) >= Math.abs(this.yDelta)) {
        let swipePosition = this.xDelta > 0 ? 0 : this.xDelta;
        this.setState({ currentX: swipePosition });

      } else {
        window.scrollBy(0, this.yDelta)
      }
  };

  handleEndPan = (e) => {
    e.preventDefault();
    e.persist();

    if (Math.abs(this.xDelta) > 5 && this.state.isSwiping) {
      /* If drag ends at less than 25% of notification width, swipe all the way to left. Else, reset to 0. */
      const elWidth = this.article.current.offsetWidth;
      let minThreshold = 100;
      let responsiveThreshold = Math.round(elWidth * 0.25);
      const threshold = Math.min(minThreshold, responsiveThreshold);
      let endPosition =
        Math.abs(this.state.currentX) >= Math.abs(threshold) ? `-100%` : 0;

      this.setState({ currentX: endPosition, isSwiping: false });

      /* On successful swipe, add to archive and then reset position */
      if (endPosition) {
        const article = {
          articleUrl: this.props.article.link.content,
          name: this.props.article.title.content,
          description: this.props.article.description.content,
          imageUrl: this.getImage(this.props.article).image,
          imageAlt: this.getImage(this.props.article).alt,
          category: this.props.category,
          pubDate: new Date(this.props.article.pubDate.content).getTime(),
          /* Returns pubDate as number of ms, see: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getTime */
        };

        this.props.swipeAction.action(article);

        // if (this.props.swipeAction.name.toLowerCase() === 'archive') {
        //   setTimeout(() => {
        //     this.setState({ currentX: 0 });
        //   }, 1500);
        // }
      }
    } else if (e.type === "pointerup") {
      /* If type is pointerUp OR user did not move more than 5px while holding, register as click and travel to link */
      // window.location = e.target.href;
    }
  };

  render() {
    return (
      <article
        className={`relative select-none`}
        touch-action="none"
        onPointerMove={this.handlePan}
        onPointerUp={this.handleEndPan}
        onPointerLeave={this.handleEndPan}
        onPointerDown={this.handleStartPan}
        onClick={(e) => {
          e.preventDefault();
        }} /* Prevent mouse clicks when dragging */
        ref={this.article}
      >
        <div
          className={`grid grid-cols-auto-1 px-4 py-4 relative z-10 bg-bg-primary w-full ${
            this.state.isSwiping ? "is-swiping" : "is-not-swiping"
          }`}
          style={{ left: this.state.currentX }}
        >
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
          <ArticleImage
            url={this.getImage(this.props.article).image}
            alt={this.getImage(this.props.article).alt}
          />
        </div>
        <ActionButton action={this.props.swipeAction.name} />
      </article>
    );
  }
}
