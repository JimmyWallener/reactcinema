import { addDoc, collection, getDocs, query, where } from 'firebase/firestore';
import { IMovie } from '../../@types/movies';
import { db } from '../../db/firebase';

// Add a movie to the database and return boolean
export const addMovie = async (movie: IMovie): Promise<boolean> => {
  if (!(await isTitleInDatabase(movie.title))) {
    const docRef = await addDoc(collection(db, 'movies'), {
      title: movie.title.toLowerCase().trim(),
      description: movie.description,
      long_description: movie.long_description,
      addedAt: movie.addedAt,
      poster: movie.poster,
      publisher: movie.publisher,
    });

    return true;
  }
  return false;
};
// Check if the movie title is already in the database
export const isTitleInDatabase = async (title: string): Promise<boolean> => {
  const movieQuery = query(
    collection(db, 'movies'),
    where('title', '==', title.toLowerCase().trim())
  );
  const querySnapshot = await getDocs(movieQuery);

  return !querySnapshot.empty ? true : false;
};
