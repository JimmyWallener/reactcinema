import { collection, deleteDoc, doc, getDocs } from 'firebase/firestore';
import { db } from '../../db/firebase';

// Delete a movie from the database and return boolean
export const removeMovie = async (id: string | undefined): Promise<boolean> => {
  try {
    const querySnapshot = await getDocs(collection(db, 'movies'));
    querySnapshot.forEach(async (docs) => {
      if (docs.id === id) {
        await deleteDoc(doc(db, 'movies', docs.id));
        return true;
      }
    });
  } catch (error) {
    console.error(error);
  }
  return false;
};
