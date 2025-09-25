const express = require('express')
const Todo = require('../models/todoModels')

exports.get_todo = async (req,res) =>{
    try{
        const todos = await Todo.find()
        console.log("Fetched all the todos",todos)
        res.status(200).json(todos)
    }
    catch(e){
        //console.error(e)
        res.status(500).json("Something went wrong")
    }
}

exports.add_todo = async (req, res) => {
    try {
        const { todo } = req.body; 
        console.log('Added new todo', todo);

        const newTodo = new Todo({ title: todo });
        console.log("Added new todo to DB", newTodo);

        const saveTodo = await newTodo.save();
        console.log('New todo saved', saveTodo);

        res.status(200).json(todo);
    } catch (error) {
        // console.error("Error adding todo:", error);
        res.status(500).json({ error: "Failed to add new todo" });
    }
}