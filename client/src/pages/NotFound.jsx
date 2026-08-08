import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-md text-center">
        <p className="text-6xl font-bold text-indigo-600">404</p>
        <h1 className="mt-4 text-2xl font-bold text-slate-900">Page not found</h1>
        <p className="mt-2 text-slate-600">
          The page you are looking for does not exist or has been moved.
        </p>
        <Link
          to="/"
          className="mt-6 inline-flex items-center gap-2 rounded-lg bg-slate-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-700"
        >
          Go home
        </Link>
      </div>
    </main>
  );
}

export default NotFound;
