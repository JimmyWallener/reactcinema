import { addDoc, collection, getDocs, query, where } from 'firebase/firestore';
import { USER } from '../../@types/user';
import { db } from '../../db/firebase';
import { saltedPassword } from '../../utils/hashing';

// Add a user to the database and return userid or null depending on success
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

// Check if the email is already in the database
export const isEmailInDatabase = async (email: string): Promise<boolean> => {
  const emailQuery = query(
    collection(db, 'users'),
    where('email', '==', email.toLowerCase().trim())
  );
  const querySnapshot = await getDocs(emailQuery);

  return !querySnapshot.empty ? true : false;
};
