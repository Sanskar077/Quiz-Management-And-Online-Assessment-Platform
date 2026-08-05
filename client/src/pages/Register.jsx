import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import FormInput from '../components/FormInput.jsx';
import Alert from '../components/Alert.jsx';

function Register() {
  const { register: registerAccount } = useAuth();
  const navigate = useNavigate();
  const [serverError, setServerError] = useState('');
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async ({ name, email, password }) => {
    setServerError('');
    try {
      await registerAccount({ name, email, password });
      navigate('/');
    } catch (err) {
      setServerError(err.response?.data?.message || 'Registration failed. Please try again.');
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center px-4 py-8">
      <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
        <h1 className="text-2xl font-bold text-slate-900">Create your account</h1>
        <p className="mt-1 text-sm text-slate-600">Join QuizPlatform as a student</p>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4" noValidate>
          <Alert>{serverError}</Alert>

          <FormInput
            label="Full name"
            id="name"
            placeholder="Jane Doe"
            autoComplete="name"
            error={errors.name}
            registration={register('name', {
              required: 'Name is required',
              minLength: { value: 2, message: 'Name must be at least 2 characters' },
              maxLength: { value: 100, message: 'Name must be at most 100 characters' },
            })}
          />

          <FormInput
            label="Email"
            id="email"
            type="email"
            placeholder="you@example.com"
            autoComplete="email"
            error={errors.email}
            registration={register('email', {
              required: 'Email is required',
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: 'Enter a valid email address',
              },
            })}
          />

          <FormInput
            label="Password"
            id="password"
            type="password"
            placeholder="At least 8 characters"
            autoComplete="new-password"
            error={errors.password}
            registration={register('password', {
              required: 'Password is required',
              minLength: { value: 8, message: 'Password must be at least 8 characters' },
            })}
          />

          <FormInput
            label="Confirm password"
            id="confirmPassword"
            type="password"
            placeholder="Repeat your password"
            autoComplete="new-password"
            error={errors.confirmPassword}
            registration={register('confirmPassword', {
              required: 'Please confirm your password',
              validate: (value) => value === watch('password') || 'Passwords do not match',
            })}
          />

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? 'Creating account…' : 'Create account'}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-600">
          Already have an account?{' '}
          <Link to="/login" className="font-medium text-indigo-600 hover:text-indigo-700">
            Log in
          </Link>
        </p>
      </div>
    </main>
  );
}

export default Register;
