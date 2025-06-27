// frontend/src/pages/TodoPage.jsx
import { useState, useEffect } from 'react';
import API from '../services/api';
import { useNavigate } from 'react-router-dom'; // Keep useNavigate for basic logout

function TodoPage() {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState('');
  const navigate = useNavigate(); // For redirecting on token expiry/logout

  const fetchTodos = async () => {
    try {
      const res = await API.get('/todos');
      setTodos(res.data);
    } catch (err) {
      console.error('Failed to fetch todos:', err);
      // Basic token expiry handling
      if (err.response && err.response.status === 401) {
        localStorage.removeItem('token');
        navigate('/login');
      }
    }
  };

  const createTodo = async () => {
    if (!text.trim()) return;
    try {
      await API.post('/todos', { text });
      setText('');
      fetchTodos();
    } catch (err) {
      console.error('Failed to create todo:', err);
    }
  };

  const toggleTodo = async (id) => {
    try {
      await API.patch(`/todos/${id}`);
      fetchTodos();
    } catch (err) {
      console.error('Failed to toggle todo:', err);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await API.delete(`/todos/${id}`);
      fetchTodos();
    } catch (err) {
      console.error('Failed to delete todo:', err);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div className="p-4 max-w-lg mx-auto">
      <h1 className="text-3xl font-bold mb-4">Your Todos</h1>
      <div className="flex mb-4">
        <input
          className="flex-1 border p-2 mr-2"
          placeholder="Add a new todo"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyPress={(e) => { if (e.key === 'Enter') createTodo(); }}
        />
        <button className="bg-blue-500 text-white p-2 rounded" onClick={createTodo}>Add</button>
      </div>
      <ul className="space-y-2">
        {todos.length === 0 ? (
          <p className="text-gray-500">No todos yet!</p>
        ) : (
          todos.map(todo => (
            <li key={todo._id} className="flex items-center justify-between p-3 border rounded bg-white shadow-sm">
              <span
                className={`cursor-pointer ${todo.completed ? 'line-through text-gray-500' : 'text-gray-800'}`}
                onClick={() => toggleTodo(todo._id)}
              >
                {todo.text}
              </span>
              <button
                className="ml-4 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                onClick={() => deleteTodo(todo._id)}
              >
                Delete
              </button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}

export default TodoPage;