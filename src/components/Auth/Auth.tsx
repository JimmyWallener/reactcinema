import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

type Props = {
  children?: JSX.Element;
};

const Auth: React.FC<Props> = ({ children }) => {
  const { authed } = useAuth();

  return authed === true ? <>{children}</> : <Navigate to='/login' />;
};

export default Auth;
