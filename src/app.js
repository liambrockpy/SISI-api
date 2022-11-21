const express = require('express');
const path = require('path');
const app = express();
const cors = require('cors');
const postsRouter = require('./controllers/posts/posts.router');
const bodyParser = require('body-parser')

app.use(express.static(path.join(__dirname, 'public')));

app.use(cors());

// parse JSON into JS
app.use(bodyParser.json())

// app page
app.get('/', (req, res) => res.send('public/index.html'));

app.use('/api/posts', postsRouter)

module.exports = app;
