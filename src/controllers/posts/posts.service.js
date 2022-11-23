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
        comments: [],
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
 * @param {string | {"prev": string, "new": string}} emoji 
 * @param {boolean} isUpdate 
 * @returns 
 */
const updateEmoji = async (id, emoji, isUpdate) => new Promise(async (res, rej) => {
    const selectedPost = await find(id)

    let newEmojis = { ...selectedPost.emojis }

    if (isUpdate && typeof emoji === 'object') {
        newEmojis[emoji.next] += 1
        newEmojis[emoji.prev] = Math.max(newEmojis[emoji.prev] - 1, 0)
    } else {
        newEmojis[emoji] += 1
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
