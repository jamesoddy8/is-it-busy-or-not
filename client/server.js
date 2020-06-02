const express = require('express');
const bodyParser = require('body-parser')
const path = require('path');
const app = express();
app.use(express.static(path.join(__dirname, 'build')));

app.get('/ping', function (req, res) {
 return res.send('pong');
});

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(process.env.PORT || 8080);


var Twitter = require('twitter');

var client = new Twitter({
  consumer_key: 
  consumer_secret:
  bearer_token: 
})

function makeApiCall() { 
  client.get('search/tweets', {q: 'node.js'}, function(error, tweets, response) {
    console.log(tweets);
 });
}

console.log("----")
makeApiCall()
console.log("----")