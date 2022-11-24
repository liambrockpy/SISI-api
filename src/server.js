const app = require('./app')

const port = process.env.PORT || 3000; // if there is no PORT env variable, 3000 will be used

app.listen(port, () => {
    console.log(`[SERVER]: Server running on port ${port}`)
})
