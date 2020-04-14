import React, { Component } from 'react'
import Header from '../Components/Header'
import Search from '../Components/Search'
import ArticleList from '../Components/ArticleList'
import { getRssFeed } from "../Functionality/fetchRSS";


export default class Newsbox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true, // show loading animation if isLoading true
      feed: [],
      categories: [
        { name: "Europe", toggledOn: true },
        { name: "Arts", toggledOn: true },
        { name: "Health", toggledOn: true },
        { name: "Technology", toggledOn: true },
        { name: "Sports", toggledOn: true }
      ]
    };
  }


onPageLoad = async () => {
  /* Categories to get feeds from */
  const categories = ["Europe", "Arts", "Health", "Technology", "Sports"];
  /* Initialize object to hold feeds */
  const feeds = [];

  for (const category of categories) {
    const url =
      "https://rss.nytimes.com/services/xml/rss/nyt/" + category + ".xml";
    const feed = await getRssFeed(url);
    /* If there is content in category, push to object, else do not create property for category */
    if (feed) {
      /* Only need the articles */
      feeds.push({category: category, articles: feed.rss.channel.item});
    }
  }

  this.setState({isLoading: false})

  return feeds;
}

  async componentDidMount() {
    this.setState({feed: await this.onPageLoad()})
  }

  render() {
    return (
      <div>
        <Header leftIcon="bookmark-1" leftRoute="/archive" rightIcon="settings" rightRoute="/settings" title="Newsbox"/>
        <Search/>
        {this.state.isLoading ? "Getting articles!" : <ArticleList feed={this.state.feed}/>}
      </div>
    )
  }
}
