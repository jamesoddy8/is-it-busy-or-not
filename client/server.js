const express = require('express');
const path = require('path');
const app = express();
app.use(express.static(path.join(__dirname, 'build')));

// Instantiate Twitter
const Twitter = require('twitter');
const twitterClient = new Twitter({
  consumer_key: 'v1T42u5AlLVzYVejSJ16bcCLl',
  consumer_secret: 'RBWwV7KRzVPVFJPHSiiQ6nSsL3oe3xWKBhcLTvjAGZhxx4R0IY',
  bearer_token: 'AAAAAAAAAAAAAAAAAAAAABlYEwEAAAAAY1R%2FnW6bIf8WlEVR4zwvycOfryc%3DW8PSxjeP7JsrmP4FLMgDsDDOC3daNDTrx1sXGHgxpZrqgN2Kwy'
})

// console.log that your server is up and running
app.listen((process.env.PORT || 8080), () => console.log(`Listening on port ${process.env.PORT || 8080}`));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// GET route for testing ping and getting a pong
app.get('/ping', (req, res) => {
  res.send({ express: 'pong' });
});

// GET route to test connection to front-end
app.get('/test_connection', (req, res) => {
  res.send({ express: 'Express is running and connected to React' });
});

// GET route example for twitter
app.get('/twitter_test', (req, res) => {
  twitterClient.get('search/tweets', { q: ' ', geocode: '51.5072682,-0.1657303,0.9km', count: 100, result_type: "recent" }, function(error, tweets, response) {
  res.send({express: tweets});
  });
});
