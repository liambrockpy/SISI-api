const request = require('supertest')
const app = require('../app')

const { posts } = require('../../db/posts.json')

const apiPath = '/api/posts'

const samplePost = {
    "title": "Title",
    "description": "Desc",
    "location": { "postcode": "SE1" },
    "labels": ["happy", "sad", "exciting"]
}

const sampleComment = {
    "text": "text string",
    "gif": "unknown data"
}

describe(`GET ${apiPath}`, () => {

    it('should respond 200 with all posts data', async () => {
        await request(app).get(`${apiPath}`)
            .expect(200)
            .then(res => {
                expect(res.headers['content-type']).toMatch(/json/)
                expect(res.body).toBeDefined()
                expect(res.body.length).toEqual(posts.length)
            })
    })
})

describe(`GET ${apiPath}/:id`, () => {

    it('should respond 200 with specific post data', async () => {
        await request(app).get(`${apiPath}/abcd`)
            .expect(200)
            .then(res => {
                expect(res.headers['content-type']).toMatch(/json/)
                expect(res.body["postId"]).toEqual("abcd")
            })
    })

    it('should respond 404 when data not found', async () => {
        await request(app).get(`${apiPath}/null`)
            .expect(404)
    })
})

describe(`POST ${apiPath}`, () => {

    it('should respond 201 with new post data', async () => {
        await request(app).post(`${apiPath}`).send(samplePost)
            .expect(201)
            .then(res => {
                expect(res.headers['content-type']).toMatch(/json/)
                expect(res.body["postId"]).toMatch(/[a-z0-9]{11}/i)
                expect(res.body["date"]).toBeTruthy()
                expect(res.body["title"]).toEqual(samplePost.title)
                expect(res.body["description"]).toEqual(samplePost.description)
                expect(res.body["labels"].length).toEqual(samplePost.labels.length)
                expect(res.body["location"].postcode).toEqual(samplePost.location.postcode)
                expect(res.body["comments"]).toBeNull()
                expect(res.body["emojis"].like).toBeFalsy()
                expect(res.body["emojis"].dislike).toBeFalsy()
                expect(res.body["emojis"].surprise).toBeFalsy()
            })
    })
})

describe(`POST ${apiPath}/:id/comments`, () => {
    it('should respond 201 with updated post data', async () => {
        await request(app).post(`${apiPath}/abcd/comments`).send(sampleComment)
            .expect(201)
            .then(res => {
                expect(res.headers['content-type']).toMatch(/json/)
                expect(res.body["postId"]).toEqual("abcd")
                expect(res.body["comments"][1].id).toMatch(/[a-z0-9]{11}/i)
                expect(res.body["comments"][1].date).toBeTruthy()
                expect(res.body["comments"][1].text).toEqual(sampleComment.text)
                expect(res.body["comments"][1].gif).toEqual(sampleComment.gif)
            })
    })
})

describe(`POST ${apiPath}/:id/emojis`, () => {
    it('should respond 201 with updated post data and emojis correctly modified after like incremented (for first time)', async () => {
        await request(app).post(`${apiPath}/efgh/emojis`).send({ "emoji": "like" })
            .expect(201)
            .then(res => {
                expect(res.headers['content-type']).toMatch(/json/)
                expect(res.body["postId"]).toEqual("efgh")
                expect(res.body["emojis"].like).toEqual(5)
                expect(res.body["emojis"].dislike).toEqual(10)
                expect(res.body["emojis"].surprise).toEqual(20)
            })
    })
})

describe(`PUT ${apiPath}/:id/emojis`, () => {
    it('should respond 201 with updated post data and emojis correctly modified after surprise incremented', async () => {
        await request(app).put(`${apiPath}/efgh/emojis`).send({ "emoji": "surprise" })
            .expect(201)
            .then(res => {
                expect(res.headers['content-type']).toMatch(/json/)
                expect(res.body["postId"]).toEqual("efgh")
                expect(res.body["emojis"].like).toEqual(4)
                expect(res.body["emojis"].dislike).toEqual(9)
                expect(res.body["emojis"].surprise).toEqual(21)
            })
    })
})
