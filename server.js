const express = require('express')
const dotenv = require('dotenv')

//Load env vars
dotenv.config({ path: './config/config.env' })

const app = express()

port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server is listening on port: ${port}`)
})