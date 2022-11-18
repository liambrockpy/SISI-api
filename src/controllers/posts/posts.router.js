const express = require('express')
const postsService = require('./posts.service')
const postsRouter = express.Router()

postsRouter.get('/', async (req, res) => {
    try {
        const posts = await postsService.findAll()
        res.status(200).send(posts)
    } catch (err) {
        res.status(500).send(err.message)
    }
})

module.exports = postsRouter
