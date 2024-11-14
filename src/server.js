const express = require('express')
const config = require('./config')
const app = express()
const { surveyRouter } = require("./routes/surveyRoutes")

app.use(express.json())
app.use('/api/surveys', surveyRouter)

app.listen(config.PORT, () => {
    console.log(`Your app is live http://localhost:${config.PORT}`)
})