import { addDoc, collection, getDocs, query, where } from 'firebase/firestore';
import { USER } from '../../@types/user';
import { db } from '../../db/firebase';
import { saltedPassword } from '../../utils/hashing';

export const addUser = async (user: USER): Promise<string | null> => {
  if (!(await isEmailInDatabase(user.email))) {
    const docRef = await addDoc(collection(db, 'users'), {
      email: user.email,
      password: await saltedPassword(user.password),
    });

    return docRef.id;
  }
  return null;
};

export const isEmailInDatabase = async (email: string): Promise<boolean> => {
  const emailQuery = query(
    collection(db, 'users'),
    where('email', '==', email.toLowerCase().trim())
  );
  const querySnapshot = await getDocs(emailQuery);

  return !querySnapshot.empty ? true : false;
};
