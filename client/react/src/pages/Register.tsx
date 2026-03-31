import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { register } from '../api/axios';

export default function Register() {
  const navigate = useNavigate();
  const [name,     setName]     = useState('');
  const [email,    setEmail]    = useState('');
  const [password, setPassword] = useState('');
  const [error,    setError]    = useState('');
  const [loading,  setLoading]  = useState(false);

  const handleSubmit = async () => {
    if (!name || !email || !password) {
      setError('Please fill in all fields');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const { data } = await register({ name, email, password });
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      navigate('/');
    } catch (err: unknown) {
      const error = err as { response?: { data?: { error?: string } } };
      setError(error.response?.data?.error || 'Registration failed');
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

        <div className='text-center mb-8'>
          <p className='text-5xl mb-3'>📊</p>
          <h1 className='text-3xl font-bold text-track-text mb-1'>
            TrackFlow
          </h1>
          <div className='mx-auto h-1 w-12 rounded-full bg-gradient-to-r from-track-accent to-track-lime' />
          <p className='text-track-muted text-sm'>
            Start tracking your visitors for free
          </p>
        </div>

        <div className='bg-gradient-to-br from-track-card/90 to-track-surface/70
          backdrop-blur border border-track-border/80 rounded-2xl p-8
          shadow-[0_20px_60px_rgba(0,0,0,0.45)] ring-1 ring-white/5'>
          <h2 className='text-xl font-semibold text-track-text mb-6'>
            Create account
          </h2>

          {error && (
            <div className='bg-track-red/10 border border-track-red/20
              text-track-red text-sm px-4 py-3 rounded-xl mb-4'>
              {error}
            </div>
          )}

          <div className='space-y-4'>
            <input
              type='text'
              placeholder='Full name'
              value={name}
              onChange={e => setName(e.target.value)}
              className={inputClass}
            />
            <input
              type='email'
              placeholder='Email address'
              value={email}
              onChange={e => setEmail(e.target.value)}
              className={inputClass}
            />
            <input
              type='password'
              placeholder='Password (min 6 characters)'
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
            {loading ? 'Creating account...' : 'Create account'}
          </button>

          <p className='text-center text-track-muted text-sm mt-4'>
            Already have an account?{' '}
            <Link to='/login'
              className='text-track-accent hover:opacity-80'>
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
