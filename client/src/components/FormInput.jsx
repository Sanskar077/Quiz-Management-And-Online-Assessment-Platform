/** Reusable labeled input with validation error display (react-hook-form compatible). */
function FormInput({ label, id, type = 'text', error, registration, ...rest }) {
  return (
    <div>
      <label htmlFor={id} className="mb-1 block text-sm font-medium text-slate-700">
        {label}
      </label>
      <input
        id={id}
        type={type}
        className={`w-full rounded-lg border px-3 py-2 text-sm shadow-sm outline-none transition focus:ring-2 ${
          error
            ? 'border-red-300 focus:border-red-400 focus:ring-red-100'
            : 'border-slate-300 focus:border-indigo-400 focus:ring-indigo-100'
        }`}
        {...registration}
        {...rest}
      />
      {error && <p className="mt-1 text-xs text-red-600">{error.message}</p>}
    </div>
  );
}

export default FormInput;
