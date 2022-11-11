import bcrypt from 'bcryptjs-react';
import { collection, getDocs } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { USER } from '../@types/user';
import { useAuthContext } from '../context/AuthContext';
import { db } from '../db/firebase';

type responseType = {
  code: string;
  message: string;
};

// async function that returns a promise after comparing the password
const matchPassword = (storedPassword: string, inputPassword: string) => {
  return bcrypt.compare(inputPassword, storedPassword);
};

export const useAuth = () => {
  const { setLoggedInUser } = useAuthContext();

  const navigate = useNavigate();

  return {
    async login(user: USER): Promise<responseType> {
      const querySnapshot = await getDocs(collection(db, 'users'));
      let message: responseType = {
        code: '200',
        message: '',
      };

      querySnapshot.forEach(async (account) => {
        const { email, password, id } = account.data();

        if (
          email === user.email.toLowerCase().trim() &&
          (await matchPassword(password, user.password))
        ) {
          message = {
            code: '200',
            message: 'Login successful',
          };
          setLoggedInUser({ logged: true, token: id });
        }
        if (!(email === user.email.toLowerCase().trim())) {
          message = {
            code: '403',
            message: 'Incorrect Email / No such Email',
          };
        } else {
          message = {
            code: '403',
            message: 'Invalid password',
          };
        }
      });
      return message;
    },
    logout() {
      return new Promise<void>((res) => {
        setLoggedInUser({ logged: false, token: '' });
        res();
        navigate('/');
      });
    },
  };
};
