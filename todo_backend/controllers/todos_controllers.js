const express = require('express')
const Todo = require('../models/todoModels')
const logger = require('../utils/logger')

exports.get_todo = async (req,res) =>{
    try{
        const todos = await Todo.find()
        logger.info(`Fetched all the todos ${JSON.stringify(todos)}`)
        res.status(200).json(todos)
    }
    catch(e){
        logger.error(e)
        res.status(500).json("Something went wrong")
    }
}

exports.add_todo = async (req, res) => {
    try {
        const {todo} = req.body; 
        logger.info(`Adding the todos ${JSON.stringify(todo)}`)

        const newTodo = new Todo({ title:todo });
        logger.info(`Adding the todos ${JSON.stringify(newTodo)}`)

        const saveTodo = await newTodo.save();
        logger.info(`Saving the todos ${JSON.stringify(saveTodo)}`)

        res.status(200).json(saveTodo);
    } catch (error) {
        logger.error("Error adding todo:", error);
        res.status(500).json({ error: "Failed to add new todo" });
    }
}