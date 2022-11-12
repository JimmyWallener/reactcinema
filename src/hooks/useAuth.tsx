import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';

export const useAuth = () => {
  const { setLoggedInUser } = useAuthContext();

  const navigate = useNavigate();

  return {
    logout() {
      return new Promise<void>((res) => {
        setLoggedInUser({ logged: false, token: '' });
        res();
        navigate('/');
      });
    },
  };
};
