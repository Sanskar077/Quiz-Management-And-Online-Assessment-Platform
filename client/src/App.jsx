import { Routes, Route } from 'react-router-dom';

import ProtectedRoute from './components/ProtectedRoute.jsx';

import Landing from './pages/Landing.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import Unauthorized from './pages/Unauthorized.jsx';
import Forbidden from './pages/Forbidden.jsx';
import NotFound from './pages/NotFound.jsx';

import AdminDashboard from './pages/admin/AdminDashboard.jsx';
import StudentDashboard from './pages/student/StudentDashboard.jsx';

function App() {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/unauthorized" element={<Unauthorized />} />
      <Route path="/forbidden" element={<Forbidden />} />

      {/* Admin-only routes */}
      <Route element={<ProtectedRoute role="ADMIN" />}>
        <Route path="/admin" element={<AdminDashboard />} />
      </Route>

      {/* Student-only routes */}
      <Route element={<ProtectedRoute role="STUDENT" />}>
        <Route path="/student" element={<StudentDashboard />} />
      </Route>

      {/* 404 catch-all */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
