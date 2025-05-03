require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const db = require('./db')
const models = require('./models/models')
const router = require('./routes/index')
const errorMiddleware = require('./middleware/errorMiddleware');

const PORT = process.env.PORT || 5000

const corsOptions ={
    origin: process.env.CLIENT_URL,
    credentials:true,
    optionSuccessStatus:200
}
app.use(cors(corsOptions));
app.use(express.json())
app.use('/api', router)

app.use(errorMiddleware);

const start = async () => {
    try {
        await db.authenticate()
        await db.sync()
        app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
    } catch (e) {
        console.log(e)
        throw e
    }
}

start()