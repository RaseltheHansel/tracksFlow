import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { login } from '../api/axios';

export default function Login() {
  const navigate = useNavigate();
  const [email,    setEmail]    = useState('');
  const [password, setPassword] = useState('');
  const [error,    setError]    = useState('');
  const [loading,  setLoading]  = useState(false);

  const handleSubmit = async () => {
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const { data } = await login({ email, password });
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      navigate('/');
    } catch (err: unknown) {
      const error = err as { response?: { data?: { error?: string } } };
      setError(error.response?.data?.error || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  const inputClass = `w-full bg-track-surface border border-track-border
    text-track-text placeholder:text-track-muted rounded-xl
    px-4 py-3 text-sm outline-none focus:border-track-accent
    transition-colors`;

  return (
    <div className='min-h-screen bg-track-bg flex items-center justify-center p-6'>
      <div className='w-full max-w-sm'>

        {/* Logo */}
        <div className='text-center mb-8'>
          <p className='text-5xl mb-3'>📊</p>
          <h1 className='text-3xl font-bold text-track-text mb-1'>
            TrackFlow
          </h1>
          <p className='text-track-muted text-sm'>
            Privacy-first analytics dashboard
          </p>
        </div>

        {/* Card */}
        <div className='bg-track-card border border-track-border
          rounded-2xl p-8'>
          <h2 className='text-xl font-semibold text-track-text mb-6'>
            Sign in
          </h2>

          {error && (
            <div className='bg-red-500/10 border border-red-500/20
              text-red-400 text-sm px-4 py-3 rounded-xl mb-4'>
              {error}
            </div>
          )}

          <div className='space-y-4'>
            <input
              type='email'
              placeholder='Email address'
              value={email}
              onChange={e => setEmail(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSubmit()}
              className={inputClass}
            />
            <input
              type='password'
              placeholder='Password'
              value={password}
              onChange={e => setPassword(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSubmit()}
              className={inputClass}
            />
          </div>

          <button
            onClick={handleSubmit}
            disabled={loading}
            className='w-full bg-track-accent hover:opacity-90
              disabled:opacity-50 text-white font-semibold
              py-3 rounded-xl text-sm transition-opacity mt-6'
          >
            {loading ? 'Signing in...' : 'Sign in'}
          </button>

          <p className='text-center text-track-muted text-sm mt-4'>
            No account?{' '}
            <Link to='/register'
              className='text-track-accent hover:opacity-80'>
              Create one
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}