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
        dateNow,
        comments: null,
        emoji: null
    }

    postsData.posts.push(newPost)
    res(newPost)
})

const createComment = async (id, comment) => new Promise(async (res, rej) => {
    const selectedPost = await find(id)
    selectedPost.comments.push(comment)
    const selectedIndex = postsData.posts.findIndex(post => post.postId === id)
    postsData.posts.splice(selectedIndex, 1, selectedPost)
    res(selectedPost)
})

/**
 * 
 * @param {string} id 
 * @param {'like' | 'dislike' | 'surprise'} emoji 
 * @returns 
 */

const updateEmoji = async (id, emoji) => new Promise(async (res, rej) => {
    const selectedPost = await find(id)
    //get count (number) of selected emoji
    let incrementedEmoji = parseInt(selectedPost.emojis[emoji])++

    selectedPost.emojis = {
        ...emojis,
        [emoji]: incrementedEmoji
    }
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
