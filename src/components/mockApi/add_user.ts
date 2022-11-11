import bcrypt from 'bcryptjs-react';
import { addDoc, collection, getDocs } from 'firebase/firestore';
import { USER } from '../../@types/user';
import { useAuthContext } from '../../context/AuthContext';
import { db } from '../../db/firebase';

const saltedPassword = async (password: string): Promise<string> => {
  return bcrypt.hash(password, bcrypt.genSaltSync(10)).then((hash) => hash);
};

export const addUser = async (user: USER): Promise<void> => {
  const { setLoggedInUser } = useAuthContext();
  if (!(await isEmailInDatabase(user.email))) {
    try {
      const docRef = await addDoc(collection(db, 'users'), {
        email: user.email,
        password: await saltedPassword(user.password),
      });
      setLoggedInUser({ logged: true, token: docRef.id });
    } catch (error) {
      console.log(error);
    }
  }
};

export const isEmailInDatabase = async (email: string): Promise<boolean> => {
  const querySnapshot = await getDocs(collection(db, 'users'));
  let isEmailInDatabase = false;

  querySnapshot.forEach((user) => {
    if (user?.data().email === email) {
      isEmailInDatabase = true;
    }
  });

  return isEmailInDatabase;
};
