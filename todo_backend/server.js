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

module.exports = app