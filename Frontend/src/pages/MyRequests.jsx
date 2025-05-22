// src/components/MyRequests.jsx
import { useEffect, useState } from 'react';
import api from '../services/api';
import './MyRequests.css';

function MyRequests() {
  const [requests, setRequests] = useState([]);

  const fetchRequests = async () => {
    const token = localStorage.getItem('token');
    try {
      const res = await api.get('/requests/user', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setRequests(res.data);
    } catch (error) {
      console.error('Failed to fetch requests:', error);
    }
  };

  useEffect(() => {
    fetchRequests();

    // Optional: Poll every 60 seconds
    const interval = setInterval(fetchRequests, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="my-requests-container">
      <h2>My Access Requests</h2>
      {requests.length === 0 ? (
        <p>No access requests submitted yet.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Software</th>
              <th>Access Type</th>
              <th>Status</th>
              <th>Reason</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((req) => (
              <tr key={req.id}>
                <td>{req.software.name}</td>
                <td>{req.accessType}</td>
                <td
                  className={`status ${req.status.toLowerCase()}`}
                >
                  {req.status}
                </td>
                <td>{req.reason}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default MyRequests;
