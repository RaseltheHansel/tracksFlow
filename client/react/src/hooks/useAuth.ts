import { useMemo } from 'react';
import type { User } from '../types';

export const useAuth = () => {
  const user = useMemo(() => {
    try {
      const raw = localStorage.getItem('user');
      if (!raw) return null;
      return JSON.parse(raw) as User;
    } catch {
      return null;
    }
  }, []);

  const isAuth = !!localStorage.getItem('token');

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/login';
  };

  return { user, isAuth, logout };
};
