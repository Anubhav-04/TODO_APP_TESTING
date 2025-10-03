/** @format */

import React, { useState, useEffect } from "react";
import BackendURL from "../config/config";
import TodoItem from "./todoItem";
import AddTodo from "./addTodo";
import "../TodoApp.css";

const TodoApp = () => {
  const [message, setMessage] = useState("");
  const [todos, setTodos] = useState([]);

  // Fetch todos from backend
  const fetchTodos = async () => {
    try {
      const response = await fetch(`${BackendURL}/get_todo`);
      if (!response.ok) throw new Error("Fetch failed");
      const data = await response.json();
      setTodos(data);
      setMessage("List of todos Above")
    } catch (e) {
      setMessage("Failed to load todos");
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);
  return (
    <div>
      <div className='App'>
        <AddTodo onAdd={AddTodo} />
      </div>
      <ul className='todo-list'>
        {todos.map((item, idx) => (
          <TodoItem key={idx} item={item} />
        ))}
      </ul>
       {message && <div className='todo-message'>{message}</div>}
    </div>
  );
};

export default TodoApp;
