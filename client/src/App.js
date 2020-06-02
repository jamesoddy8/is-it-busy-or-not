import React,{Component} from 'react';
import logo from './logo.svg';
import './App.css';
var Twitter = require('twitter');

  var client = new Twitter({
    // consumer_key: '',
    // consumer_secret: '',
    bearer_token: process.env.TWITTER_BEARER_TOKEN
  })


  class App extends Component {

    constructor(props){
      super(props);

    }

  makeApiCall() {
    client.get('search/tweets', {q: 'node.js'}, function(error, tweets, response) {
      console.log(tweets);
   });
  }


  render() {
    return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <div>
            <button type="button" class="nobtn" onClick={() => this.makeApiCall()}>✗</button>
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
  )}
}

export default App;