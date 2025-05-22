import { useState } from 'react';
import api from '../services/api';
import './CreateSoftware.css';

function CreateSoftware() {
  const [form, setForm] = useState({ name: '', description: '', accessLevels: [] });

  const handleChange = (e) => {
    const { name, value, checked } = e.target;
    if (name === 'accessLevels') {
      const updated = checked
        ? [...form.accessLevels, value]
        : form.accessLevels.filter(level => level !== value);
      setForm({ ...form, accessLevels: updated });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      await api.post('/software', form, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert('Software created successfully!');
    } catch (error) {
      console.error(error);
      alert('Failed to create software. Please try again.');
    }
  };

  return (
    <form className="form-container" onSubmit={handleSubmit}>
      <h2>Create New Software</h2>
      <input
        name="name"
        onChange={handleChange}
        placeholder="Software Name"
        required
      />
      <textarea
        name="description"
        onChange={handleChange}
        placeholder="Description"
        required
      />
      
      <div className="access-levels">
        <label>
          <input
            type="checkbox"
            name="accessLevels"
            value="Read"
            onChange={handleChange}
          />
          Read
        </label>
        <label>
          <input
            type="checkbox"
            name="accessLevels"
            value="Write"
            onChange={handleChange}
          />
          Write
        </label>
        <label>
          <input
            type="checkbox"
            name="accessLevels"
            value="Admin"
            onChange={handleChange}
          />
          Admin
        </label>
      </div>

      <button type="submit">Create Software</button>
    </form>
  );
}

export default CreateSoftware;
