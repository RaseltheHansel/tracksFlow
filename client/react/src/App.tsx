import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login      from './pages/Login';
import Register   from './pages/Register';
import Dashboard  from './pages/Dashboard';
import SiteDetail from './pages/SiteDetail';
import Settings   from './pages/Settings';

const isAuth = () => !!localStorage.getItem('token');

const PrivateRoute = ({ children }: { children: React.ReactNode }) =>
  isAuth() ? <>{children}</> : <Navigate to='/login' />;

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login'    element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/' element={
          <PrivateRoute><Dashboard /></PrivateRoute>
        } />
        <Route path='/site/:siteId' element={
          <PrivateRoute><SiteDetail /></PrivateRoute>
        } />
        <Route path='/settings' element={
          <PrivateRoute><Settings /></PrivateRoute>
        } />
        {/* Catch all → redirect to dashboard */}
        <Route path='*' element={<Navigate to='/' />} />
      </Routes>
    </BrowserRouter>
  );
}
