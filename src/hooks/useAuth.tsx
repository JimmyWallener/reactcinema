import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const useAuth = () => {
  const [authed, setAuthed] = useState(false);
  const navigate = useNavigate();

  return {
    authed,
    login() {
      return new Promise<void>((res) => {
        setAuthed(true);
        res();
      });
    },
    logout() {
      return new Promise<void>((res) => {
        setAuthed(false);
        res();
        navigate('/', { replace: true });
      });
    },
  };
};
