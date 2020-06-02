import React, { Component } from 'react';

class Smokey extends Component {
  constructor(props){
    super(props)
    this.state={
      tweetData: 1
    }
  }

  componentDidMount() {
    // Call our fetch function below once the component mounts
    this.callBackendAPI()
      .then(res => this.setState({ ping: res.express }))
      .catch(err => console.log(err));
  }

  // Tests our /ping GET route from the Express server (look inside server.js)
  callBackendAPI = async () => {
    const response = await fetch('/ping');
    const body = await response.json();

    if (response.status !== 200) {
      throw Error(body.message)
    }
    return body;
  };

  // Handles the API call, updates the state
  handleFetchTweets = async() => {
    this.fetchTweets()
      .then(
        res => this.setState({ tweetData: res.express })
      )

      console.log(this.state.tweetData.statuses)
  };

  // Calls the Express endpoint
  fetchTweets = async () => {
    const response = await fetch('/twitter_test');
    const body = await response.json();
    if (response.status !== 200) {
      throw Error(body.message)
    }
    return body;
  };

  // Sort Tweet response
  // tweetNum = async () => {
  //   console.log(this.state.tweetData.statuses.size)
  // };

  // Main body
  render() {
    return (
      <>
      </>
    )
  }
}

export default Smokey;
