import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import './Signup.css';

function Signup() {
  const [form, setForm] = useState({
    username: '',
    password: '',
    role: 'Employee',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/auth/signup', form);
      alert('Signup successful. Redirecting to login...');
      navigate('/login'); 
    } catch (err) {
      alert(err?.response?.data?.message || 'Signup failed');
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-box">
        <h2>Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <input
            name="username"
            value={form.username}
            onChange={handleChange}
            placeholder="Username"
            required
          />
          <input
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Password"
            required
          />
          <select name="role" value={form.role} onChange={handleChange}>
            <option value="Employee">Employee</option>
            <option value="Manager">Manager</option>
            <option value="Admin">Admin</option>
          </select>
          <button type="submit">Sign Up</button>
        </form>

        <p style={{ marginTop: '1rem' }}>
          Already have an account?{' '}
          <span
            onClick={() => navigate('/login')}
            style={{ color: 'blue', cursor: 'pointer', textDecoration: 'underline' }}
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
}

export default Signup;
