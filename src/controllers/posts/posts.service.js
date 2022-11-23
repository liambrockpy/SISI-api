const postsData = require('../../../db/posts.json')
const uid = require('uid')
const dayjs = require('dayjs')

const findAll = async () => new Promise((res, rej) => {
    const posts = postsData.posts
    res(posts)
})

const find = async (id) => new Promise((res, rej) => {
    const selectedPost = postsData.posts.filter(post => post.postId === id)[0]
    res(selectedPost)
})

const create = async (post) => new Promise((res, rej) => {
    const postId = uid.uid()
    const dateNow = dayjs()

    const newPost = {
        ...post,
        postId,
        date: dateNow,
        comments: null,
        emojis: {
            "like": 0,
            "dislike": 0,
            "surprise": 0
        }
    }

    postsData.posts.push(newPost)
    res(newPost)
})

const createComment = async (id, comment) => new Promise(async (res, rej) => {
    const selectedPost = await find(id)

    let newComment = {
        ...comment,
        id: uid.uid(),
        date: dayjs()
    }

    selectedPost.comments.push(newComment)
    const selectedIndex = postsData.posts.findIndex(post => post.postId === id)
    postsData.posts.splice(selectedIndex, 1, selectedPost)
    res(selectedPost)
})

/**
 * 
 * @param {string} id 
 * @param {'like' | 'dislike' | 'surprise'} emoji 
 * @param {boolean} updateFlag 
 * @returns 
 */
const updateEmoji = async (id, emoji, updateFlag) => new Promise(async (res, rej) => {
    const selectedPost = await find(id)

    let newEmojis = { ...selectedPost.emojis }

    if (updateFlag) {
        switch (emoji) {
            case 'like':
                newEmojis.like += 1
                newEmojis.dislike = Math.max(newEmojis.dislike - 1, 0)
                newEmojis.surprise = Math.max(newEmojis.surprise - 1, 0)
                break;
            case 'dislike':
                newEmojis.dislike += 1
                newEmojis.like = Math.max(newEmojis.like - 1, 0)
                newEmojis.surprise = Math.max(newEmojis.surprise - 1, 0)
                break;
            case 'surprise':
                newEmojis.surprise += 1
                newEmojis.like = Math.max(newEmojis.like - 1, 0)
                newEmojis.dislike = Math.max(newEmojis.dislike - 1, 0)
                break;
            default:
                break;
        }
    } else {
        let incrementedEmojiValue = ++(newEmojis[emoji])

        newEmojis = {
            ...newEmojis,
            [emoji]: incrementedEmojiValue
        }
    }

    selectedPost.emojis = newEmojis

    const selectedIndex = postsData.posts.findIndex(post => post.postId === id)
    postsData.posts.splice(selectedIndex, 1, selectedPost)
    res(selectedPost)
})

module.exports = {
    findAll,
    find,
    create,
    createComment,
    updateEmoji
}
