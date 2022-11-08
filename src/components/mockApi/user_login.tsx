import bcrypt from 'bcryptjs-react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../db/firebase';
import { USER } from '../../types/userType';

const matchPassword = async (storedPassword: string, inputPassword: string) => {
  return await bcrypt.compare(inputPassword, storedPassword);
};

export const login = async (user: USER): Promise<boolean> => {
  const querySnapshot = await getDocs(collection(db, 'users'));

  let isAuthed = false;

  querySnapshot.forEach(async (account) => {
    const { email, password, id } = account.data();
    if (
      email === user.email &&
      (await matchPassword(user.password, password))
    ) {
      isAuthed = true;
    }
  });
  return isAuthed;
};
