import { addDoc, collection, getDocs } from 'firebase/firestore';
import { db } from '../../db/firebase';
import { USER } from '../../types/userType';

export const addUser = async (user: USER): Promise<boolean> => {
  let isUserAdded = false;
  if (!isEmailInDatabase(user.email)) {
    try {
      const docRef = await addDoc(collection(db, 'users'), {
        email: user.email,
        password: user.password,
      });
      isUserAdded = true;
    } catch (error) {
      console.log(error);
    }
  }
  return isUserAdded;
};

const isEmailInDatabase = async (email: string): Promise<boolean> => {
  const querySnapshot = await getDocs(collection(db, 'users'));

  querySnapshot.forEach((user) => {
    if (user?.data().email === email) {
      return true;
    }
  });

  return false;
};
