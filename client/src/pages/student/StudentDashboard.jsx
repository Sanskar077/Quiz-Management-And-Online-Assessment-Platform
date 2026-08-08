import { useAuth } from '../../context/AuthContext.jsx';

/**
 * Placeholder student dashboard — proves the STUDENT-only route guard works.
 * The full student dashboard arrives on Day 11.
 */
function StudentDashboard() {
  const { user, logout } = useAuth();

  return (
    <main className="mx-auto max-w-3xl px-4 py-12">
      <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
        <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-medium text-emerald-700">
          STUDENT
        </span>
        <h1 className="mt-3 text-2xl font-bold text-slate-900">Student Dashboard</h1>
        <p className="mt-2 text-slate-600">
          Welcome, <span className="font-semibold">{user.name}</span>. This area is restricted to
          students.
        </p>
        <button
          onClick={logout}
          className="mt-6 rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
        >
          Log out
        </button>
      </div>
    </main>
  );
}

export default StudentDashboard;
