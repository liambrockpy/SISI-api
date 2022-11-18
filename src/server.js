const app = require('./app')

const port = 3000

app.listen(port, () => {
    console.log(`[SERVER]: Server running at http://localhost:${port}/api/posts`)
})
