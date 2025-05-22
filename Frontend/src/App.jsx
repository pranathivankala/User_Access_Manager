import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Signup from './pages/Signup';
import Login from './pages/Login';
import RequestAccess from './pages/RequestAccess';
import CreateSoftware from './pages/CreateSoftware';
import PendingRequests from './pages/PendingRequests';
import MyRequests from './pages/MyRequests';
import Navbar from './components/Navbar';


function App() {
  return (
    <BrowserRouter>
     <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/request-access" element={<RequestAccess />} />
        <Route path="/create-software" element={<CreateSoftware />} />
        <Route path="/pending-requests" element={<PendingRequests />} />
        <Route path="/my-requests" element={<MyRequests />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
