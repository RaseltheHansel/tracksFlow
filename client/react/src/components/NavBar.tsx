import { useNavigate } from 'react-router-dom';
import { useMemo } from 'react';

interface NavBarProps {
  title?: string;
  subtitle?: string;
  showBack?: boolean;
  backTo?: string;
}

export default function NavBar({
  title = 'TrackFlow',
  subtitle = 'Privacy-first analytics',
  showBack = false,
  backTo = '/',
}: NavBarProps) {
  const navigate = useNavigate();

  const userName = useMemo(() => {
    try {
      const raw = localStorage.getItem('user');
      if (!raw) return null;
      const user = JSON.parse(raw) as { name?: string };
      return user.name || null;
    } catch {
      return null;
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <nav className='bg-track-card border-b border-track-border px-8 py-4'>
      <div className='max-w-7xl mx-auto flex items-center justify-between'>
        <div className='flex items-center gap-3'>
          {showBack && (
            <button
              onClick={() => navigate(backTo)}
              className='text-track-muted hover:text-track-soft
                transition-colors text-sm'
            >
              ← Back
            </button>
          )}
          <div>
            <p className='text-sm font-semibold text-track-text'>
              {title}
            </p>
            <p className='text-xs text-track-muted'>
              {subtitle}
            </p>
          </div>
        </div>

        <div className='flex items-center gap-3'>
          {userName && (
            <span className='text-xs text-track-muted'>
              {userName}
            </span>
          )}
          <button
            onClick={handleLogout}
            className='bg-track-surface border border-track-border
              text-track-soft text-xs font-medium px-3 py-2
              rounded-xl hover:border-track-accent transition-colors'
          >
            Sign out
          </button>
        </div>
      </div>
    </nav>
  );
}
