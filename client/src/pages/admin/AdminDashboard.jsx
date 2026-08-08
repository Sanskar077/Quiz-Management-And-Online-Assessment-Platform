import { useEffect, useState } from 'react';
import api from '../../services/api.js';
import StatCard from '../../components/StatCard.jsx';

// --- Icon helpers (inline SVGs keep the bundle small — no icon library needed yet) ---
const Icon = ({ path }) => (
  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={path} />
  </svg>
);

const ICONS = {
  students:
    'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z',
  quizzes:
    'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4',
  questions:
    'M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
  attempts:
    'M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z',
  passed: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z',
  failed: 'M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z',
  score:
    'M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z',
  published:
    'M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z',
};

function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    api
      .get('/admin/dashboard')
      .then((res) => setStats(res.data.data))
      .catch(() => setError('Failed to load dashboard statistics.'));
  }, []);

  const loading = !stats && !error;

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
        <p className="mt-1 text-sm text-slate-500">Platform-wide summary</p>
      </div>

      {error && (
        <div className="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {/* Section: Students */}
      <section className="mb-8">
        <h2 className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
          Students
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          <StatCard
            title="Total Students"
            value={stats?.totalStudents}
            loading={loading}
            color="indigo"
            icon={<Icon path={ICONS.students} />}
          />
          <StatCard
            title="Active Students"
            value={stats?.activeStudents}
            loading={loading}
            color="emerald"
            icon={<Icon path={ICONS.students} />}
          />
          <StatCard
            title="Inactive Students"
            value={stats?.inactiveStudents}
            loading={loading}
            color="red"
            icon={<Icon path={ICONS.students} />}
          />
        </div>
      </section>

      {/* Section: Quizzes */}
      <section className="mb-8">
        <h2 className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
          Quizzes
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard
            title="Total Quizzes"
            value={stats?.totalQuizzes}
            loading={loading}
            color="indigo"
            icon={<Icon path={ICONS.quizzes} />}
          />
          <StatCard
            title="Published"
            value={stats?.publishedQuizzes}
            loading={loading}
            color="emerald"
            icon={<Icon path={ICONS.published} />}
          />
          <StatCard
            title="Draft"
            value={stats?.draftQuizzes}
            loading={loading}
            color="amber"
            icon={<Icon path={ICONS.quizzes} />}
          />
          <StatCard
            title="Total Questions"
            value={stats?.totalQuestions}
            loading={loading}
            color="slate"
            icon={<Icon path={ICONS.questions} />}
          />
        </div>
      </section>

      {/* Section: Attempts */}
      <section>
        <h2 className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
          Attempts
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard
            title="Total Attempts"
            value={stats?.totalAttempts}
            loading={loading}
            color="indigo"
            icon={<Icon path={ICONS.attempts} />}
          />
          <StatCard
            title="Passed"
            value={stats?.passedAttempts}
            loading={loading}
            color="emerald"
            icon={<Icon path={ICONS.passed} />}
          />
          <StatCard
            title="Failed"
            value={stats?.failedAttempts}
            loading={loading}
            color="red"
            icon={<Icon path={ICONS.failed} />}
          />
          <StatCard
            title="Average Score"
            value={stats ? `${stats.averageScore}%` : null}
            loading={loading}
            color="amber"
            icon={<Icon path={ICONS.score} />}
          />
        </div>
      </section>
    </div>
  );
}

export default AdminDashboard;
