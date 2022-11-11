import bcrypt from 'bcryptjs-react';
import { collection, getDocs } from 'firebase/firestore';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../db/firebase';
import { USER } from '../types/userType';

type responseType = {
  code: number;
  message: string;
};

// async function that returns a promise after comparing the password
const matchPassword = async (storedPassword: string, inputPassword: string) => {
  console.log('match', await bcrypt.compare(inputPassword, storedPassword));
  return await bcrypt.compare(inputPassword, storedPassword);
};

export const useAuth = () => {
  const [authed, setAuthed] = useState(false);
  const [response, setResponse] = useState({
    code: 500,
    message: 'Server Response Error',
  });
  const navigate = useNavigate();

  return {
    authed,
    async login(user: USER): Promise<responseType> {
      const querySnapshot = await getDocs(collection(db, 'users'));

      querySnapshot.forEach(async (account) => {
        const { email, password, id } = account.data();
        const isPasswordMatch = await matchPassword(password, user.password);
        const isEmailAMatch = email === user.email.toLowerCase().trim();

        try {
          if (!isEmailAMatch || !isPasswordMatch) {
            if (!isEmailAMatch) {
              setResponse({
                code: 403,
                message: 'Incorrect Email / No such Email',
              });
            } else {
              setResponse({ code: 403, message: 'Invalid password' });
            }
          } else {
            setAuthed(true);
            localStorage.setItem('user', JSON.stringify({ id, email, authed }));
            setResponse({ code: 200, message: 'Login successful' });
          }
        } catch (error) {
          console.error(error);
        }
      });
      return response;
    },
    logout() {
      return new Promise<void>((res) => {
        setAuthed(false);
        localStorage.removeItem('user');
        res();
        navigate('/', { replace: true });
      });
    },
  };
};
