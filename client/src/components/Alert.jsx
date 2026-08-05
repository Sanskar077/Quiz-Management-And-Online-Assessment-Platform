/** Inline alert for form-level error/success messages. */
function Alert({ type = 'error', children }) {
  if (!children) return null;

  const styles =
    type === 'error'
      ? 'border-red-200 bg-red-50 text-red-700'
      : 'border-emerald-200 bg-emerald-50 text-emerald-700';

  return <div className={`rounded-lg border px-3 py-2 text-sm ${styles}`}>{children}</div>;
}

export default Alert;
