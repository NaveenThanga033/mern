import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TodoList = () => {
  const [task, setTask] = useState('');
  const [todos, setTodos] = useState([]);

  const fetchTodos = async () => {
    const res = await axios.get('http://localhost:5000/api/todos');
    setTodos(res.data);
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const addTodo = async () => {
    if (!task) return;
    await axios.post('http://localhost:5000/api/todos', { task });
    setTask('');
    fetchTodos();
  };

  const toggleComplete = async (id, completed) => {
    await axios.put(`http://localhost:5000/api/todos/${id}`, { completed: !completed });
    fetchTodos();
  };

  const deleteTodo = async (id) => {
    await axios.delete(`http://localhost:5000/api/todos/${id}`);
    fetchTodos();
  };

  return (
    <div style={{ maxWidth: 400, margin: 'auto', padding: 20 }}>
      <h2>📝 To-Do List</h2>
      <input
        value={task}
        onChange={(e) => setTask(e.target.value)}
        placeholder="Enter task"
        style={{ padding: 8, width: '80%' }}
      />
      <button onClick={addTodo} style={{ padding: 8, marginLeft: 10 }}>Add</button>
      <ul>
        {todos.map(todo => (
          <li key={todo._id} style={{ margin: '10px 0' }}>
            <span
              onClick={() => toggleComplete(todo._id, todo.completed)}
              style={{
                cursor: 'pointer',
                textDecoration: todo.completed ? 'line-through' : 'none'
              }}
            >
              {todo.task}
            </span>
            <button onClick={() => deleteTodo(todo._id)} style={{ marginLeft: 10 }}>❌</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
