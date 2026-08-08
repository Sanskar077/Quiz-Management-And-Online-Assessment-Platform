import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import api from '../../services/api.js';
import FormInput from '../../components/FormInput.jsx';

function QuizFormModal({ quiz, onSaved, onClose }) {
  const isEdit = Boolean(quiz);
  const [categories, setCategories] = useState([]);
  const [serverError, setServerError] = useState('');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      title: quiz?.title || '',
      description: quiz?.description || '',
      categoryId: quiz?.category_id || '',
      difficulty: quiz?.difficulty || 'MEDIUM',
      durationMinutes: quiz?.duration_minutes || 30,
      passingPercentage: quiz?.passing_percentage || 50,
      maxAttempts: quiz?.max_attempts || '',
    },
  });

  // Load categories for the dropdown
  useEffect(() => {
    api
      .get('/categories')
      .then((res) => setCategories(res.data.data))
      .catch(() => {});
  }, []);

  const onSubmit = async (values) => {
    setServerError('');
    try {
      const payload = {
        title: values.title,
        description: values.description || undefined,
        categoryId: values.categoryId ? parseInt(values.categoryId, 10) : undefined,
        difficulty: values.difficulty,
        durationMinutes: parseInt(values.durationMinutes, 10),
        passingPercentage: parseInt(values.passingPercentage, 10),
        maxAttempts: values.maxAttempts ? parseInt(values.maxAttempts, 10) : undefined,
      };

      if (isEdit) {
        await api.put(`/quizzes/${quiz.id}`, payload);
      } else {
        await api.post('/quizzes', payload);
      }
      onSaved();
    } catch (err) {
      setServerError(err.response?.data?.message || 'Save failed. Please try again.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-lg rounded-2xl border border-slate-200 bg-white shadow-xl">
        {/* Modal header */}
        <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4">
          <h2 className="text-lg font-bold text-slate-900">{isEdit ? 'Edit Quiz' : 'New Quiz'}</h2>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className="space-y-4 px-6 py-5">
            {serverError && (
              <div className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
                {serverError}
              </div>
            )}

            <FormInput
              label="Title"
              id="title"
              placeholder="e.g. JavaScript Basics"
              error={errors.title}
              registration={register('title', {
                required: 'Title is required',
                maxLength: { value: 255, message: 'Title must be 255 characters or less' },
              })}
            />

            <div>
              <label
                htmlFor="description"
                className="mb-1 block text-sm font-medium text-slate-700"
              >
                Description
              </label>
              <textarea
                id="description"
                rows={3}
                placeholder="Brief description of the quiz…"
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm shadow-sm outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
                {...register('description')}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              {/* Category */}
              <div>
                <label
                  htmlFor="categoryId"
                  className="mb-1 block text-sm font-medium text-slate-700"
                >
                  Category
                </label>
                <select
                  id="categoryId"
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
                  {...register('categoryId')}
                >
                  <option value="">No category</option>
                  {categories.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Difficulty */}
              <div>
                <label
                  htmlFor="difficulty"
                  className="mb-1 block text-sm font-medium text-slate-700"
                >
                  Difficulty
                </label>
                <select
                  id="difficulty"
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
                  {...register('difficulty')}
                >
                  <option value="EASY">Easy</option>
                  <option value="MEDIUM">Medium</option>
                  <option value="HARD">Hard</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <FormInput
                label="Duration (min)"
                id="durationMinutes"
                type="number"
                placeholder="30"
                error={errors.durationMinutes}
                registration={register('durationMinutes', {
                  required: 'Required',
                  min: { value: 1, message: 'Min 1' },
                  max: { value: 300, message: 'Max 300' },
                })}
              />
              <FormInput
                label="Pass % "
                id="passingPercentage"
                type="number"
                placeholder="50"
                error={errors.passingPercentage}
                registration={register('passingPercentage', {
                  required: 'Required',
                  min: { value: 0, message: '0–100' },
                  max: { value: 100, message: '0–100' },
                })}
              />
              <FormInput
                label="Max Attempts"
                id="maxAttempts"
                type="number"
                placeholder="Unlimited"
                error={errors.maxAttempts}
                registration={register('maxAttempts', {
                  min: { value: 1, message: 'Min 1' },
                })}
              />
            </div>
          </div>

          {/* Footer */}
          <div className="flex justify-end gap-3 border-t border-slate-200 px-6 py-4">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 disabled:opacity-60"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting ? 'Saving…' : isEdit ? 'Save changes' : 'Create quiz'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default QuizFormModal;
