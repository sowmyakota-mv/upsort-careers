// src/components/ProtectedRoute.tsx
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { isAuthenticated, setIntendedRoute } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    setIntendedRoute(location.pathname); // Save the intended page
    return <Navigate to="/register" replace />;
  }

  return children;
};

export default ProtectedRoute;
