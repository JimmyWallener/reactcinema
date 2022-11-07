import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../db/firebase';
import { USER } from '../../types/userType';

export const login = async (user: USER): Promise<boolean> => {
  const querySnapshot = await getDocs(collection(db, 'users'));
  let isAuthed = false;

  querySnapshot.forEach((account) => {
    const { email, password } = account.data();
    if (email === user.email && password === user.password) {
      isAuthed = true;
    }
  });
  return isAuthed;
};
