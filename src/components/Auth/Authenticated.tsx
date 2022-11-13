import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthContext } from '../../context/AuthContext';

type Props = {
  children?: JSX.Element;
};

// This component is used to wrap the routes that require authentication
const Authenticated: React.FC<Props> = ({ children }) => {
  const { loggedInUser } = useAuthContext();

  return loggedInUser.logged ? <>{children}</> : <Navigate to='/login' />;
};

export default Authenticated;
