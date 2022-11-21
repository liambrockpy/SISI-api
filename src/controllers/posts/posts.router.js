const express = require('express')
const postsService = require('./posts.service')
const postsRouter = express.Router()

postsRouter.get('/', async (req, res) => {
    try {
        const posts = await postsService.findAll()
        res.status(200).send(posts)
    } catch (err) {
        res.status(500).send(err.message);
    }
})

// Get posts by id

postsRouter.get('/:id', async (req, res) => {
    try {
        const requestPost = req.params.postID;
        const selectedPost = await postsService.find(requestPost);
        if (!selectedPost) {
            res.status(404).send("Item not found")
        }
        else {
            res.send(selectedPost);
        }
    }
        catch (err) {
            res.status(500).send({message: err.message});
        }
    }
)


// Post a new post

postsRouter.post("/", async (req, res) => { 
    try {
        const postData = req.body
        const newPost = await postsService.create(postData)
        res.status(201).send(newPost)
    } catch (err) {
        res.status(500).send({message: err.message});
    }
})

// POST COMMENT ON POST 
// /PostID/COMMENTS

postsRouter.post("/:id/comment", async (req, res) => {
    try {
        const comData = req.params.body
        const updatedPost = await postsService.createComment(id, comData)
        res.status(201).send(updatedPost)
    }
    catch (err) {
        res.status(500).send({message: err.message});
    }
})


module.exports = postsRouter;
