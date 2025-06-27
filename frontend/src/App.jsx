// frontend/src/App.jsx
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import ProtectedRoute from './components/ProtectedRoute';
import TodoPage from './pages/TodoPage';

function App() {
  return (
    <BrowserRouter>
      <nav className="p-4 bg-gray-200 flex gap-4 justify-center">
        {/* Simple navigation links */}
        <Link to="/login">Login</Link>
        <Link to="/signup">Signup</Link>
        <Link to="/todos">Todos</Link>
        {/* Simple logout button */}
        <button onClick={() => { localStorage.removeItem('token'); window.location.href = '/login'; }}>Logout</button>
      </nav>
      <Routes>
        {/* Protect the /todos route */}
        <Route path="/todos" element={<ProtectedRoute><TodoPage /></ProtectedRoute>} />
        {/* The root path "/" could redirect to /todos if logged in, or /login if not */}
        <Route path="/" element={<ProtectedRoute><TodoPage /></ProtectedRoute>} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;