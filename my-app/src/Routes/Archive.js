import React, { Component } from 'react'
import Header from '../Components/Header'
import Search from '../Components/Search'
import ArticleList from "../Components/ArticleList";
import Notification from "../Components/Notification";
import { CSSTransitionGroup } from "react-transition-group";

export default class Archive extends Component {
constructor(props) {
  super(props)

  this.state = {
    notificationShowing: false,
    feed: this.getFeed()
  }
}


  getFeed = () => {
    // check for saved articles in storage
    if (localStorage.getItem("archiveArticles")) {
      this.archive = JSON.parse(localStorage.getItem("archiveArticles"));

      return this.createCategorizedFeed(this.archive);
    } else {
      return null
    }
  }

  createCategorizedFeed = (archive) => {
    // intialize feed as empty array
    const sortedArticles = {};

    // loop through all articles. if category already exists, push article to array. if category does not exist in feed as key, create new key with article as object in array.
    for (const articleLink in archive) {
      const article = {...archive[articleLink], link: {content: articleLink}}

      if (!sortedArticles.hasOwnProperty(article.category)) {
        sortedArticles[article.category] = []
      }

      sortedArticles[article.category].push(article)
    }

    // convert this to the feed style archivelist uses
    const feed = [];
    for (const category in sortedArticles) {
      feed.push({
        category: category,
        articles: sortedArticles[category],
        isToggled: true
      })
    }

    return feed;
  }

  deleteArticleFromArchive = ({name, articleUrl}) => {
    // delete in component feed
    delete this.archive[articleUrl];

    // update local storage
    localStorage.setItem('archiveArticles', JSON.stringify(this.archive));

    // create notif
    this.createNotification(name);

    // clear timer so that all items get deleted at same time
    clearTimeout(this.swipeTimer);
    this.swipeTimer = setTimeout(() => {
    this.setState({feed: this.getFeed()});
    }, 300)
  }

  createNotification = (name) => {
    // If notification remover timer already exists, cancel it.
    clearTimeout(this.notificationTimer)

    // Triggers notification, then removes after 2s
    this.setState({ notificationShowing: name });
    this.notificationTimer = setTimeout(() => {
      this.setState({ notificationShowing: false });
    }, 2000);
  }

  render() {
    return (
      <div>
        <Header leftIcon="chevron-left" leftRoute="/" rightIcon="settings" rightRoute="/settings" title="Archive"/>
        <Search/>
        {this.state.feed.length > 0 ? (
          <ArticleList
            feed={this.state.feed}
            swipeAction={{
              name: "Delete",
              action: this.deleteArticleFromArchive,
            }}
          />
        ) :
        <p>No articles saved yet. Try saving something!</p>}


        <CSSTransitionGroup
        transitionName="notification"
        transitionEnterTimeout={200}
        transitionLeaveTimeout={200}
        >
          {this.state.notificationShowing && (
            <Notification>
              Removed <strong>{this.state.notificationShowing}</strong> from Archive!
            </Notification>
          )}
        </CSSTransitionGroup>
      </div>
    )
  }
}
