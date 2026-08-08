import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import Spinner from './Spinner.jsx';

/**
 * Route guard: requires an authenticated user.
 *
 * - While the session is being restored, shows a spinner.
 * - If not logged in, redirects to /login and remembers where the user was
 *   headed (via location state) so login can send them back.
 * - Optionally restricts access to a specific role; a logged-in user with the
 *   wrong role is sent to /forbidden.
 *
 * Frontend guards are for UX only — every protected API is independently
 * enforced on the backend.
 */
function ProtectedRoute({ role }) {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <Spinner label="Checking your session…" />;
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (role && user.role !== role) {
    return <Navigate to="/forbidden" replace />;
  }

  return <Outlet />;
}

export default ProtectedRoute;
