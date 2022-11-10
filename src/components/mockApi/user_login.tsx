import bcrypt from 'bcryptjs-react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../db/firebase';
import { USER } from '../../types/userType';

// async function that returns a promise after comparing the password
const matchPassword = async (storedPassword: string, inputPassword: string) => {
  return await bcrypt.compare(inputPassword, storedPassword);
};

// async function that returns a boolean after checking credentials
export const login = async (user: USER): Promise<boolean> => {
  const querySnapshot = await getDocs(collection(db, 'users'));

  let isValidAccount = false;

  querySnapshot.forEach(async (account) => {
    const { email, password, id } = account.data();
    if (
      email === user.email &&
      (await matchPassword(user.password, password))
    ) {
      isValidAccount = true;
    }
  });
  return isValidAccount;
};
