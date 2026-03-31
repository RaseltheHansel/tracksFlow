import { useNavigate } from 'react-router-dom';
import NavBar from '../components/NavBar';
import { useAuth } from '../hooks/useAuth';

export default function Settings() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  return (
    <div className='min-h-screen bg-track-bg'>
      <NavBar title='Settings' subtitle='Account preferences' showBack backTo='/' />

      <div className='max-w-3xl mx-auto p-8'>
        <div className='bg-gradient-to-br from-track-card/90 to-track-surface/70
          backdrop-blur border border-track-border/80 rounded-2xl p-6
          shadow-[0_20px_60px_rgba(0,0,0,0.45)] ring-1 ring-white/5'>
          <h2 className='text-xl font-semibold text-track-text mb-4'>
            Account
          </h2>

          <div className='space-y-3'>
            <div>
              <p className='text-track-muted text-xs mb-1'>Name</p>
              <p className='text-track-text text-sm'>
                {user?.name || 'Unknown'}
              </p>
            </div>
            <div>
              <p className='text-track-muted text-xs mb-1'>Email</p>
              <p className='text-track-text text-sm'>
                {user?.email || 'Unknown'}
              </p>
            </div>
            <div>
              <p className='text-track-muted text-xs mb-1'>Plan</p>
              <p className='text-track-text text-sm'>
                {user?.plan || 'Free'}
              </p>
            </div>
          </div>

          <div className='flex gap-3 mt-6'>
            <button
              onClick={() => navigate('/')}
              className='bg-track-surface/70 border border-track-border/80
                text-track-soft text-sm font-medium px-4 py-2
                rounded-xl hover:border-track-accent transition-colors'
            >
              Back to Dashboard
            </button>
            <button
              onClick={logout}
              className='bg-gradient-to-r from-track-accent to-track-accent2
                hover:brightness-110 text-track-bg text-sm font-semibold px-4 py-2
                rounded-xl transition-[filter,transform]'
            >
              Sign out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
