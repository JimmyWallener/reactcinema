import bcrypt from 'bcryptjs-react';
import { addDoc, collection, getDocs } from 'firebase/firestore';
import { db } from '../../db/firebase';
import { USER } from '../../types/userType';

const saltedPassword = async (password: string): Promise<string> => {
  return bcrypt.hash(password, bcrypt.genSaltSync(10)).then((hash) => hash);
};

export const addUser = async (user: USER): Promise<void> => {
  console.log(!(await isEmailInDatabase(user.email)));
  if (!(await isEmailInDatabase(user.email))) {
    try {
      const docRef = await addDoc(collection(db, 'users'), {
        email: user.email,
        password: await saltedPassword(user.password),
      });
      console.log('Document written with ID: ', docRef.id);
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
