const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

let messages = [];

// Middleware
app.use(express.static('public'));
app.use(bodyParser.json());

// Routes
app.post('/send', function(req, res) {
  messages.push(req.body.message);
  res.sendStatus(200);
});

app.get('/messages', function(req, res) {
  res.json({ messages: messages });
});

// Start the server
app.listen(PORT, function() {
  console.log(`Server listening on port ${PORT}`);
});
