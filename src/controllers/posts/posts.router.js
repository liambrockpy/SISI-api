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

postsRouter.get('/:id', (req, res) => {
    try {
        const requestPost = req.params.postID;
        const selectedPost = postsService.find(requestPost);
        if (!selectedPost) {
            throw new Error("There is no post with that ID")
        }
        else {
            res.send(selectedPost);
        }
    }
        catch (error) {
            res.status(404).send({message: error.message});
        }
    }
)


// Post a new post

postsRouter.post("/", (req, res) => {
    try {
        const postData = req.body
        const newPost = postsService.create(postData)
        res.status(201).send(newPost)
    } catch (error) {
        res.status(404).send({message: error.message});
    }
})

// POST COMMENT ON POST 
// /PostID/COMMENTS

postsRouter.post("/:id/comment", (req, res) => {
    try {
        const comData = req.body
        const newComment = postsService.createComment(comData)
        res.status(201).send(newComment)
    }
    catch (error) {
        res.status(404).send({message: error.message});
    }
})


module.exports = postsRouter;
