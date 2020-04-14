import React, { Component } from "react";
import Header from "../Components/Header";
import Search from "../Components/Search";
import ArticleList from "../Components/ArticleList";
import { getRssFeed } from "../Functionality/fetchRSS";

export default class Newsbox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true, // show loading animation if isLoading true
      feed: [],
      categories: this.manageCategoryToggles(),
    };


  }

  onPageLoad = async () => {
    /* Initialize object to hold feeds */
    const feeds = [];

    for (const category of this.state.categories) {
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

  manageCategoryToggles = () => {
    // Default category settings
    let categories = [
      { name: "Europe", isToggled: false, enabled: true },
      { name: "Arts", isToggled: false, enabled: true },
      { name: "Health", isToggled: false, enabled: true },
      { name: "Technology", isToggled: false, enabled: true },
      { name: "Sports", isToggled: false, enabled: true },
    ];
    // If categories exist in localStorage, copy settings from there. Else, use default category settings.
    if (localStorage.getItem('categories')) {
      categories = JSON.parse(localStorage.getItem('categories'));
    }

    // Set category state
    localStorage.setItem('categories', JSON.stringify(categories))
    return categories
  };

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
          "Getting articles!"
        ) : (
          <ArticleList feed={this.state.feed} />
        )}
      </div>
    );
  }
}
