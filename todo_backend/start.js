const app = require('./server')

const PORT = process.env.PORT

app.listen(PORT || 3001,()=>{
    console.log(`Server is running on localhost:${PORT}`)
})