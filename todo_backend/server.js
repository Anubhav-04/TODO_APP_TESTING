const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const ConnectDB = require('./db.js')
const todoRoutes = require('./routers/todoRouters')
const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use(cors())
app.use(bodyParser.json())
app.use(express.json())
app.use('/api',todoRoutes)
ConnectDB()

const PORT = process.env.PORT

app.listen(PORT || 3001,()=>{
    console.log(`Server is running on localhost:${PORT}`)
})