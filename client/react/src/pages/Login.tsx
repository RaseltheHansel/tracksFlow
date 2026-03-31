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
    focus:ring-2 focus:ring-track-accent/20 transition-colors`;

  return (
    <div className='min-h-screen bg-track-bg flex items-center justify-center p-6'>
      <div className='w-full max-w-sm'>

        {/* Logo */}
        <div className='text-center mb-8'>
          <p className='text-5xl mb-3'>📊</p>
          <h1 className='text-3xl font-bold text-track-text mb-1'>
            TrackFlow
          </h1>
          <div className='mx-auto h-1 w-12 rounded-full bg-gradient-to-r from-track-accent to-track-lime' />
          <p className='text-track-muted text-sm'>
            Privacy-first analytics dashboard
          </p>
        </div>

        {/* Card */}
        <div className='bg-gradient-to-br from-track-card/90 to-track-surface/70
          backdrop-blur border border-track-border/80 rounded-2xl p-8
          shadow-[0_20px_60px_rgba(0,0,0,0.45)] ring-1 ring-white/5'>
          <h2 className='text-xl font-semibold text-track-text mb-6'>
            Sign in
          </h2>

          {error && (
            <div className='bg-track-red/10 border border-track-red/20
              text-track-red text-sm px-4 py-3 rounded-xl mb-4'>
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
            className='w-full bg-gradient-to-r from-track-accent to-track-accent2
              hover:brightness-110 disabled:opacity-50 text-track-bg font-semibold
              py-3 rounded-xl text-sm transition-[filter,transform] mt-6
              shadow-[0_10px_30px_rgba(34,211,238,0.25)]'
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
