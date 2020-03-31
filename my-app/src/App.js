import React, { Component } from "react";
import Archive from "./Routes/Archive";
import Newsbox from "./Routes/Newsbox";
import Settings from "./Routes/Settings";
import { BrowserRouter as Switch, Route } from "react-router-dom";

import { getRssFeed } from "./Functionality/fetchRSS";

async function onPageLoad() {
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

  return feeds;
}

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false, // show loading animation if isLoading true
      savedArticles: {},
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

  async componentDidMount() {
    this.setState({feed: await onPageLoad()})
  }

  render() {
    return (
      <div className="app">
        <Switch>
          <Route exact path="/settings">
            <Settings />
          </Route>
          <Route exact path="/archive">
            <Archive />
          </Route>
          <Route exact path="/">
            { this.state.feed.length > 1 ? <Newsbox feed={this.state.feed}/> : 'Am still loading!'}
          </Route>
        </Switch>
      </div>
    );
  }
}
