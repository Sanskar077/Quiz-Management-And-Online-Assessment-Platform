import { useEffect, useState } from 'react';
import api from '../services/api.js';

function Landing() {
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
        <div className="mt-8 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm shadow-sm">
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
