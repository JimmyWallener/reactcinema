import { collection, getDocs } from 'firebase/firestore';
import { IMovie } from '../../@types/movies';
import { db } from '../../db/firebase';

// Get all movies from the database and return them as an array
export const getMovies = async (): Promise<IMovie[]> => {
  const movies: IMovie[] = [];
  const moviesSnapshot = await getDocs(collection(db, 'movies'));
  moviesSnapshot.forEach((doc) => {
    movies.push({ id: doc.id, ...(doc.data() as IMovie) });
  });
  return movies;
};
