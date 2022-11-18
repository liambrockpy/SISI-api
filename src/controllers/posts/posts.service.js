const postsData = require('../../../db/posts.json')

const findAll = async () => new Promise((res, rej) => {
    const posts = postsData.posts
    res(posts)
})

module.exports = {
    findAll
}
