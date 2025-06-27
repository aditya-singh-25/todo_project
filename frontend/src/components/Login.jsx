// frontend/src/components/Login.jsx
import { useState } from 'react';
import API from '../services/api'; // Correct API import
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/auth/login", { email, password });
      localStorage.setItem('token', res.data.token);
      navigate('/'); // Keep navigating to root for simplicity
    } catch (err) {
      alert(err.response?.data?.error || err.message || 'Login failed');
    }
  };

  return (
    <div className="p-4 max-w-sm mx-auto">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      <form onSubmit={handleLogin} className="space-y-4">
        <input className="w-full border p-2" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input className="w-full border p-2" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button className="w-full bg-blue-500 text-white p-2 rounded" type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;