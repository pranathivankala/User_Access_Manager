import { useState, useEffect } from 'react';
import api from '../services/api';
import './RequestAccess.css';

function RequestAccess() {
  const [softwareList, setSoftwareList] = useState([]);
  const [form, setForm] = useState({ softwareId: '', accessType: 'Read', reason: '' });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    api.get('/software')
      .then(res => setSoftwareList(res.data))
      .catch(err => alert('Failed to load software list'));
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    if (!token) {
      alert('You must be logged in to submit a request.');
      return;
    }

    setLoading(true);
    try {
      await api.post('/requests', form, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert('Request submitted successfully!');
      setForm({ softwareId: '', accessType: 'Read', reason: '' });
    } catch (error) {
      console.error(error);
      alert('Failed to submit request. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="request-access-form">
      <select
        name="softwareId"
        value={form.softwareId}
        onChange={handleChange}
        required
      >
        <option value="">Select software</option>
        {softwareList.map((s) => (
          <option value={s.id} key={s.id}>{s.name}</option>
        ))}
      </select>

      <select
        name="accessType"
        value={form.accessType}
        onChange={handleChange}
        required
      >
        <option value="Read">Read</option>
        <option value="Write">Write</option>
        <option value="Admin">Admin</option>
      </select>

      <textarea
        name="reason"
        value={form.reason}
        onChange={handleChange}
        placeholder="Reason"
        required
      />

      <button type="submit" disabled={loading}>
        {loading ? 'Submitting...' : 'Submit Request'}
      </button>
    </form>
  );
}

export default RequestAccess;
