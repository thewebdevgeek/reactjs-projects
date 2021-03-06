import React, { Component } from "react";
import "./App.css";
import "./style/style.css";
import YTSearch from "youtube-api-search";
import SearchBar from "./components/SearchBar";
import VideoList from "./components/VideoList/VideoList";
import VideoDetail from "./components/VideoDetail";
// environment variables
//using.env--restart the app for keys to take effect
const { API_KEY } = process.env;
console.log("API_KEY", API_KEY);
//using js keys
const keys = require("./config/keys");
// console.log("keys", keys);

class App extends Component {
  //set state on page load with default search options
  componentDidMount() {
    console.log("componentDidMount called!");
    // previously this request was made in constructor
    YTSearch(
      {
        key: keys.youtubeAPIKey,
        term: "surfboards",
      },
      (videos) => {
        // console.log("data", videos);
        // this.setState({ videos: videos });--ES6 Syntax
        this.setState({ videos: videos, selectedVideo: videos[0] });
      }
    );
  }

  constructor(props) {
    super(props);
    this.state = { videos: [], selectedVideo: null };
  }
  render() {
    return (
      <div className="App">
        <SearchBar />
        <div className="row">
          <VideoDetail video={this.state.selectedVideo} />
          {/* Pass the selectedVideo as a prop to  VideoList*/}
          <VideoList
            onVideoSelect={(selectedVideo) => {
              console.log("on click selectedVideo", selectedVideo);
              return this.setState({ selectedVideo: selectedVideo });
            }}
            videos={this.state.videos}
          />
        </div>
      </div>
    );
  }
}

export default App;
