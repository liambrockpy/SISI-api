const express = require('express');
const app = express();
const cors = require('cors');
const postsRouter = require('./controllers/posts/posts.router');
const bodyParser = require('body-parser')

const port = 3000;


app.use(cors());

// parse JSON into JS
app.use(bodyParser.json())

// test
app.get('/api', (req, res) => res.status(200).send('Hello World!'));

app.use('/api/posts', postsRouter)

module.exports = app;
