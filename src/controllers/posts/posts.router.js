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
        const requestPost = req.params.id;
        const selectedPost = await postsService.find(requestPost);
        if (!selectedPost) {
            res.status(404).send("Item not found")
        }
        else {
            res.send(selectedPost);
        }
    }
    catch (err) {
        res.status(500).send({ message: err.message });
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
        res.status(500).send({ message: err.message });
    }
})

// Pos comment

postsRouter.post("/:id/comments", async (req, res) => {
    try {
        const postId = req.params.id;
        const comData = req.body
        const updatedPost = await postsService.createComment(postId, comData)
        res.status(201).send(updatedPost)
    }
    catch (err) {
        res.status(500).send({ message: err.message });
    }
})

postsRouter.post("/:id/emojis", async (req, res) => {
    try {
        const postId = req.params.id;
        const emojiData = req.body
        const updatedEmoji = await postsService.updateEmoji(postId, emojiData.emoji, false)
        res.status(201).send(updatedEmoji)
    }
    catch (err) {
        res.send(500).send({ message: err.message })
    }

})

postsRouter.put("/:id/emojis", async (req, res) => {
    try {
        const postId = req.params.id;
        const emojiData = req.body
        // ? TODO: implement toggling of emojis using new data type to increment/decrement appropriately
        // const updatedEmoji = await postsService.updateEmoji(postId, emojiData.emoji, true)
        const updatedEmoji = await postsService.updateEmoji(postId, emojiData.emoji, false)
        res.status(201).send(updatedEmoji)
    }
    catch (err) {
        res.send(500).send({ message: err.message })
    }

})

module.exports = postsRouter;
