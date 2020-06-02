import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';


class App extends Component {

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

  // Main body
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
        </p>
          <div>
            <button type="button" className="nobtn" onClick={() => this.handleFetchTweets()}>Grab tweets</button>
          </div>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
        </a>
        </header>
      </div>
    )
  }
}

export default App;