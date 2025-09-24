import React, { useState } from 'react';

const TodoApp = () => {
    const [todo, setTodo] = useState('This is new state');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage(''); // Reset message on submit
        console.log(todo);
        try {
            const response = await fetch('http://localhost:3002/api/add_todo', {
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
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={todo}
                onChange={(e) => setTodo(e.target.value)}
            />
            <button type="submit">Add Todo</button>
            {message && <div>{message}</div>}
        </form>
    );
};

export default TodoApp;
