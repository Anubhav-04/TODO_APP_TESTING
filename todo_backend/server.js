const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const Todo = require('./models/todoModels')
const dotenv = require('dotenv')

const app = express();
app.use(cors())
app.use(bodyParser.json())
app.use(express.json())
dotenv.config()
const connectDB = async() =>{
    try{
        await mongoose.connect(process.env.MONGODB_URI)
        console.log('MongoDB connected!!')
    }
    catch(error){
        console.error(`Database connection failed ${error}`)
    }

}

app.get("/get_todo",async (req,res) =>{
    try{
        const todos = await Todo.find()
        console.log("Fetched all the todos",todos)
        res.status(200).json(todos)
    }
    catch(e){
        console.error(e)
        res.status(500).json("Something went wrong")
    }
})


app.post("/todo_add", async (req, res) => {
    try {
        const { todo } = req.body; 
        console.log('Added new todo', todo);

        const newTodo = new Todo({ title: todo });
        console.log("Added new todo to DB", newTodo);

        const saveTodo = await newTodo.save();
        console.log('New todo saved', saveTodo);

        res.status(200).json(todo);
    } catch (error) {
        console.error("Error adding todo:", error);
        res.status(500).json({ error: "Failed to add new todo" });
    }
});
connectDB()
const PORT = 3001;
app.listen(PORT,()=>{
    console.log(`Server is running on localhost:${PORT}`)
})