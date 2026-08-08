/**
 * Reusable stat card for dashboard summaries.
 *
 * Props:
 *  - title: string
 *  - value: number | string
 *  - subtitle: string (optional)
 *  - color: 'indigo' | 'emerald' | 'amber' | 'red' | 'slate' (default 'indigo')
 *  - icon: JSX element
 *  - loading: boolean
 */
function StatCard({ title, value, subtitle, color = 'indigo', icon, loading = false }) {
  const colorMap = {
    indigo: 'bg-indigo-50 text-indigo-600',
    emerald: 'bg-emerald-50 text-emerald-600',
    amber: 'bg-amber-50 text-amber-600',
    red: 'bg-red-50 text-red-600',
    slate: 'bg-slate-100 text-slate-600',
  };

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between">
        <div className="min-w-0 flex-1">
          <p className="text-sm font-medium text-slate-500">{title}</p>
          {loading ? (
            <div className="mt-2 h-8 w-20 animate-pulse rounded-md bg-slate-100" />
          ) : (
            <p className="mt-1 text-3xl font-bold text-slate-900">{value ?? '—'}</p>
          )}
          {subtitle && !loading && <p className="mt-1 text-xs text-slate-500">{subtitle}</p>}
        </div>
        {icon && <div className={`rounded-lg p-2.5 ${colorMap[color]}`}>{icon}</div>}
      </div>
    </div>
  );
}

export default StatCard;
