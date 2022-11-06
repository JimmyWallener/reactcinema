import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

type Props = {
  children?: JSX.Element;
};

export const Auth: React.FC<Props> = ({ children }) => {
  const { authed } = useAuth();
  const location = useLocation();

  return authed === true ? (
    <>{children}</>
  ) : (
    <Navigate to='/login' replace state={{ path: location.pathname }} />
  );
};
