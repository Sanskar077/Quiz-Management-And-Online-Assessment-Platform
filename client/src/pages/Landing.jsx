import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api.js';
import { useAuth } from '../context/AuthContext.jsx';

function Landing() {
  const { user, loading, logout } = useAuth();
  const [apiStatus, setApiStatus] = useState('checking');

  useEffect(() => {
    api
      .get('/health')
      .then(() => setApiStatus('online'))
      .catch(() => setApiStatus('offline'));
  }, []);

  const statusStyles = {
    checking: 'bg-amber-100 text-amber-800',
    online: 'bg-emerald-100 text-emerald-800',
    offline: 'bg-red-100 text-red-800',
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-4">
      <div className="w-full max-w-2xl text-center">
        <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
          QuizPlatform
        </h1>
        <p className="mt-4 text-lg text-slate-600">
          Online Quiz Management &amp; Assessment Platform
        </p>

        {!loading && (
          <div className="mt-8">
            {user ? (
              <div className="space-y-4">
                <p className="text-slate-700">
                  Logged in as <span className="font-semibold">{user.name}</span>{' '}
                  <span className="rounded-full bg-indigo-100 px-2 py-0.5 text-xs font-medium text-indigo-700">
                    {user.role}
                  </span>
                </p>
                <button
                  onClick={logout}
                  className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
                >
                  Log out
                </button>
              </div>
            ) : (
              <div className="flex items-center justify-center gap-3">
                <Link
                  to="/login"
                  className="rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700"
                >
                  Log in
                </Link>
                <Link
                  to="/register"
                  className="rounded-lg border border-slate-300 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        )}

        <div className="mt-10 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm shadow-sm">
          <span className="text-slate-500">API status:</span>
          <span
            className={`rounded-full px-2.5 py-0.5 text-xs font-medium capitalize ${statusStyles[apiStatus]}`}
          >
            {apiStatus}
          </span>
        </div>
      </div>
    </main>
  );
}

export default Landing;
