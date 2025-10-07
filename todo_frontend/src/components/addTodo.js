import React, { useState } from 'react';
import BackendURL from "../config/config";

const AddTodo = () => {
    const [todo, setTodo] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage(''); // Reset message on submit
        console.log(todo);
        try {
            const response = await fetch(`${BackendURL}/add_todo`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ todo })
            });
            if (response.ok) {
                setMessage('Todo added successfully!');
                
                setTodo(''); // Optionally clear input
            } else {
                setMessage('Failed to add todo!');
            }
            console.log("Response received", response);
        } catch (e) {
            setMessage('Network error!');
            console.log("Error", e);
        }
    };

    return (
        <form className="todo-form" onSubmit={handleSubmit}>
            <input
            className="todo-input" 
                type="text"
                name="addTodos"
                value={todo}
                onChange={(e) => setTodo(e.target.value)}
                placeholder="Add Todos"
                required
            />
            <button className='todo-button' name="Button" type="submit">Add Todo</button>
            {message && <div className='todo-message' name = "Added">{message}</div>}
        </form>
    );
};

export default AddTodo;