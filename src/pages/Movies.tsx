import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IMovie } from '../@types/movies';
import trashIcon from '../assets/icons/trash.svg';
import { removeMovie } from '../components/helpers/delete_movie';
import { getMovies } from '../components/helpers/get_movies';
import Card from '../components/UI/Card';
import { useAuthContext } from '../context/AuthContext';

const Movies = () => {
  const navigate = useNavigate();
  const { loggedInUser } = useAuthContext();
  const [movies, setMovies] = useState<IMovie[]>([]);

  useEffect(() => {
    getMovies().then((movies) => setMovies(movies));
  }, []);

  // checks if user is owner of the movie and returns boolean for the delete button to appear or not
  const isUserOwner = (publisher: string) => {
    return publisher === loggedInUser.id ? true : false;
  };
  // Delete movie from the database and updates array of movies
  const onDelete = async (id: string | undefined) => {
    await removeMovie(id).then(() => {
      setMovies(movies.filter((movie) => movie.id !== id));
    });
  };
  // redirects to page with more info about the movie
  const onReadMore = (id: string | undefined, movie: IMovie) => {
    navigate(`/movies/${id}`, { state: movie });
  };

  return (
    <section className='bg-gray-900 min-h-screen w-screen flex justify-center items-center'>
      <div className='grid grid-cols-4 gap-4 my-14'>
        {movies.length > 0 ? (
          movies.map((movie) => (
            <Card key={movie.id}>
              {isUserOwner(movie.publisher) ? (
                <div
                  className='relative mt-2 left-[90%] cursor-pointer'
                  onClick={() => onDelete(movie.id ?? '')}
                >
                  <img src={trashIcon} alt='delete' width={30} height={30} />
                </div>
              ) : null}
              <ul className='flex flex-col'>
                <li className='block h-1/4'>
                  <p className='font-bold flex flex-col ml-2'>{movie.title}</p>
                  <p className='text-sm font-light mt-4 ml-4'>
                    Added: {movie.addedAt.toLocaleString()}
                  </p>
                </li>
                <div className='flex justify-center items-center p-6'>
                  <li>
                    <img
                      src={movie.poster}
                      alt={movie.title}
                      width={500}
                      height={250}
                    />
                  </li>
                </div>
                <div className='h-full'>
                  <li className='w-fit py-3 block'>
                    <h1>Movie Description: </h1>
                    <p>{movie.description}</p>
                  </li>
                </div>
              </ul>
              <button
                className='bg-blue-500 hover:bg-blue-700 mt-6 text-white font-bold py-2 px-4 rounded'
                onClick={() => onReadMore(movie.title, movie)}
              >
                Read More...
              </button>
            </Card>
          ))
        ) : (
          <div
            className={`col-span-4 p-2 my-2 w-[25vw] h-[25vh] flex flex-col justify-center items-center shadow rounded-2xl bg-white`}
          >
            <div>
              <p className='font-bold text-center text-xl'>No movies found</p>
              <p className='block p-4 text-center font-light'>
                Why not add some movie titles and contribute to the site!
              </p>
            </div>
            <div>
              <button
                className='bg-green-700 hover:bg-green-900 mt-6 text-white font-bold py-2 px-4 rounded'
                onClick={() => navigate('/addMovie')}
              >
                Add Some Movies...
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Movies;
