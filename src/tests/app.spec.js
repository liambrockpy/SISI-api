const request = require('supertest')
const app = require('../app')


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
                expect(res.body["comments"]).toEqual([])
                expect(res.body["emojis"].like).toBeFalsy()
                expect(res.body["emojis"].dislike).toBeFalsy()
                expect(res.body["emojis"].surprise).toBeFalsy()
            })
    })
})

describe(`GET ${apiPath}`, () => {

    it('should respond 200 with all posts data', async () => {
        await request(app).get(`${apiPath}`)
            .expect(200)
            .then(res => {
                expect(res.headers['content-type']).toMatch(/json/)
                expect(res.body).toBeDefined()
                expect(res.body.length).toEqual(2)
            })
    })
})

describe(`GET ${apiPath}/:id`, () => {

    it('should respond 200 with specific post data', async () => {
        await request(app).get(`${apiPath}/4adb8a386f8`)
            .expect(200)
            .then(res => {
                expect(res.headers['content-type']).toMatch(/json/)
                expect(res.body["postId"]).toEqual("4adb8a386f8")
            })
    })

    it('should respond 404 when data not found', async () => {
        await request(app).get(`${apiPath}/null`)
            .expect(404)
    })
})



describe(`POST ${apiPath}/:id/comments`, () => {
    it('should respond 201 with updated post data', async () => {
        await request(app).post(`${apiPath}/4adb8a386f8/comments`).send(sampleComment)
            .expect(201)
            .then(res => {
                expect(res.headers['content-type']).toMatch(/json/)
                expect(res.body["postId"]).toEqual("4adb8a386f8")
                expect(res.body["comments"][2].id).toMatch(/[a-z0-9]{11}/i)
                expect(res.body["comments"][2].date).toBeTruthy()
                expect(res.body["comments"][2].text).toEqual(sampleComment.text)
                expect(res.body["comments"][2].gif).toEqual(sampleComment.gif)
            })
    })
})

describe(`POST ${apiPath}/:id/emojis`, () => {
    it('should respond 201 with updated post data and emojis correctly modified after like clicked (for first time)', async () => {
        await request(app).post(`${apiPath}/4adb8a386f8/emojis`).send({ "emoji": "like" })
            .expect(201)
            .then(res => {
                expect(res.headers['content-type']).toMatch(/json/)
                expect(res.body["postId"]).toEqual("4adb8a386f8")
                expect(res.body["emojis"].like).toEqual(2)
                expect(res.body["emojis"].dislike).toEqual(1)
                expect(res.body["emojis"].surprise).toEqual(1)
            })
    })
})

describe(`PUT ${apiPath}/:id/emojis`, () => {
    it.skip('should respond 201 with updated post data when changing from like to dislike', async () => {
        await request(app).put(`${apiPath}/efgh/emojis`).send({ "prev": "like", "next": "dislike" })
            .expect(201)
            .then(res => {
                expect(res.headers['content-type']).toMatch(/json/)
                expect(res.body["postId"]).toEqual("efgh")
                expect(res.body["emojis"].like).toEqual(4)
                expect(res.body["emojis"].dislike).toEqual(9)
                expect(res.body["emojis"].surprise).toEqual(20)
            })
    })
})
