import React, { Component } from "react";
import Header from "../Components/Header";
import Search from "../Components/Search";
import ArticleList from "../Components/ArticleList";
import Notification from "../Components/Notification";
import { CSSTransitionGroup } from "react-transition-group";
import { getRssFeed } from "../Functionality/fetchRSS";

export default class Newsbox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true, // show loading animation if isLoading true
      feed: [],
      notificationShowing: false,
    };
  }

  onPageLoad = async () => {
    /* Initialize object to hold feeds */
    const feeds = [];

    for (const category of this.props.categories) {
      // If category has been enabled via settings, fetch articles
      if (category.enabled) {
        const url =
          "https://rss.nytimes.com/services/xml/rss/nyt/" +
          category.name +
          ".xml";
        const feed = await getRssFeed(url);
        /* If there is content in category, push to object, else do not create property for category */
        if (feed) {
          /* Only need the articles */
          feeds.push({
            category: category.name,
            articles: feed.rss.channel.item,
            isToggled: category.isToggled,
          });
        }
      }
    }

    this.setState({ isLoading: false });

    return feeds;
  };

  saveArticleToArchive = ({
    articleUrl,
    name,
    description,
    imageUrl,
    imageAlt,
    category,
    pubDate,
  }) => {
    const archiveArticle = {
      [articleUrl]: {
        title: {content: name},
        description: {content: description},
        "media:content": {url: imageUrl},
        "media:description": {content: imageAlt},
        category: category,
        pubDate: pubDate,
      },
    };

    // Default archive is empty
    let archive = {};

    // Check for existing archive data
    if (localStorage.getItem("archiveArticles")) {
      archive = JSON.parse(localStorage.getItem("archiveArticles"));
    }

    // Merge archive and new archiveArticle with spread operators
    archive = { ...archive, ...archiveArticle };

    // Set localStorage item
    localStorage.setItem("archiveArticles", JSON.stringify(archive));

    // Create a notification for successful archive;
    this.createNotification(name);

    // Returns archive
    return archive;
  };

  createNotification = (name) => {
    // If notification remover timer already exists, cancel it.
    clearTimeout(this.notificationTimer)

    // Triggers notification, then removes after 2s
    this.setState({ notificationShowing: name });
    this.notificationTimer = setTimeout(() => {
      this.setState({ notificationShowing: false });
    }, 2000);
  }

  async componentDidMount() {
    this.setState({ feed: await this.onPageLoad() });
  }

  render() {
    return (
      <div>
        <Header
          leftIcon="bookmark-1"
          leftRoute="/archive"
          rightIcon="settings"
          rightRoute="/settings"
          title="Newsbox"
        />
        <Search />
        {this.state.isLoading ? (
          <span className="fillerMessage">Getting articles!</span>
        ) : (
          <ArticleList
            feed={this.state.feed}
            categoryStorage={"newsboxCategories"}
            swipeAction={{
              name: "Archive",
              action: this.saveArticleToArchive,
            }}
          />
        )}

        <CSSTransitionGroup
        transitionName="notification"
        transitionEnterTimeout={200}
        transitionLeaveTimeout={200}
        >
          {this.state.notificationShowing && (
            <Notification>
              Added <strong>{this.state.notificationShowing}</strong> to Archive!
            </Notification>
          )}
        </CSSTransitionGroup>
      </div>
    );
  }
}
