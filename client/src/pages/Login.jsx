import { useState } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';
import './Login.css';

function Login() {
  const [form, setForm] = useState({ username: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.post('/auth/login', form);
      localStorage.setItem('token', data.token);
      localStorage.setItem('role', data.role);

      if (data.role === 'Admin') navigate('/create-software');
      else if (data.role === 'Manager') navigate('/pending-requests');
      else navigate('/request-access');
    } catch (err) {
      alert(err?.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="login-wrapper">
      <form onSubmit={handleSubmit} className="login-form">
        <h2>Welcome Back</h2>

        <label htmlFor="username">Username</label>
        <input
          id="username"
          name="username"
          onChange={handleChange}
          placeholder="Enter your username"
          required
        />

        <label htmlFor="password">Password</label>
        <input
          id="password"
          name="password"
          type="password"
          onChange={handleChange}
          placeholder="Enter your password"
          required
        />

        <button type="submit">Login</button>

        <p>
          Don't have an account?{' '}
          <a href="/signup">Sign Up</a>
        </p>
      </form>
    </div>
  );
}

export default Login;
