import React from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { Preloader } from '../ui/preloader';
import { useEffect } from 'react';
import { resetLogout } from '../../services/slices/userSlice';

interface PrivateRouteProps {
  children: React.ReactNode;
}

export const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  let isLogout = useSelector((state) => state.user.logout);
  const navigate = useNavigate();
  const isLoading = useSelector((state) => state.user.isLoading);
  const isAuthorized = useSelector((state) => state.user.isAuthorized);
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    if (isLogout) {
      navigate('/login', { replace: true });
      dispatch(resetLogout());
    }
  }, [isLogout, navigate]);

  if (isLoading) {
    return <Preloader />;
  }

  if (
    !isAuthorized &&
    location.pathname !== '/login' &&
    location.pathname !== '/register' &&
    location.pathname !== '/forgot-password' &&
    location.pathname !== '/reset-password'
  ) {
    return (
      <Navigate to='/login' state={{ previousRoute: location.pathname }} />
    );
  }

  return children;
};
