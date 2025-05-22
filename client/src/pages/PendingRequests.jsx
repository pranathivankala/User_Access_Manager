import { useEffect, useState } from 'react';
import api from '../services/api';
import './PendingRequests.css'; 

function PendingRequests() {
  const [requests, setRequests] = useState([]);

  const fetchRequests = async () => {
    const token = localStorage.getItem('token');
    const { data } = await api.get('/requests', {
      headers: { Authorization: `Bearer ${token}` },
    });
    setRequests(data);
  };

  const updateStatus = async (id, status) => {
    const token = localStorage.getItem('token');
    await api.patch(`/requests/${id}`, { status }, {
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchRequests();
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  return (
    <div className="requests-container">
      {requests.map(req => (
        <div key={req.id} className="request-card">
          <p><b>User:</b> {req.user.username}</p>
          <p><b>Software:</b> {req.software.name}</p>
          <p><b>Type:</b> {req.accessType}</p>
          <p><b>Reason:</b> {req.reason}</p>
          <div className="button-group">
            <button className="button-approve" onClick={() => updateStatus(req.id, 'Approved')}>
              Approve
            </button>
            <button className="button-reject" onClick={() => updateStatus(req.id, 'Rejected')}>
              Reject
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default PendingRequests;
