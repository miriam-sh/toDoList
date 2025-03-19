import React, { useEffect, useState } from 'react';
import service from './service.js';
import { IconButton } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home'
import { useNavigate } from 'react-router';

export const ManageToDoList = () => {
    const [newTodo, setNewTodo] = useState("");
    const [todos, setTodos] = useState([]);

    async function getTodos() {
        const todos = await service.getTasks();
        setTodos(todos);
    }

    async function createTodo(e) {
        e.preventDefault();
        await service.addTask(newTodo);
        setNewTodo("");//clear input
        await getTodos();//refresh tasks list (in order to see the new one)
    }

    async function updateCompleted(todo, isComplete) {
        await service.setCompleted(todo.id, isComplete);
        await getTodos();//refresh tasks list (in order to see the updated one)
    }

    async function deleteTodo(id) {
        await service.deleteTask(id);
        await getTodos();//refresh tasks list
    }

    const nav = useNavigate()

    useEffect(() => {
        getTodos();
    }, []);

    return (
        <>
            <IconButton
                style={{ marginTop: "8%" }}
                onClick={() => { nav("/login") }}
                className="roundButton"><HomeIcon></HomeIcon>
            </IconButton>
            <section className="todoapp">
                <header className="header">
                    <h1>todos</h1>
                    <form onSubmit={createTodo}>
                        <input className="new-todo" placeholder="Well, let's take on the day" value={newTodo} onChange={(e) => setNewTodo(e.target.value)} />
                    </form>
                </header>
                <section className="main" style={{ display: "block" }}>
                    <ul className="todo-list">
                        {todos.map(todo => {
                            return (
                                <li className={todo.isComplete ? "completed" : ""} key={todo.id}>
                                    <div className="view">
                                        <input className="toggle" type="checkbox" defaultChecked={todo.isComplete} onChange={(e) => updateCompleted(todo, e.target.checked)} />
                                        <label>{todo.name}</label>
                                        <button className="destroy" onClick={() => deleteTodo(todo.id)}></button>
                                    </div>
                                </li>
                            );
                        })}
                    </ul>
                </section>
            </section >
        </>
    );
}
