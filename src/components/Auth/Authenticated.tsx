import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthContext } from '../../context/AuthContext';

type Props = {
  children?: JSX.Element;
};

const Authenticated: React.FC<Props> = ({ children }) => {
  const { loggedInUser } = useAuthContext();
  console.log(loggedInUser.logged);

  return loggedInUser.logged ? <>{children}</> : <Navigate to='/login' />;
};

export default Authenticated;
