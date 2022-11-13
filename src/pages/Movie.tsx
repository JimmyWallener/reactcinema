import { useLocation, useNavigate } from 'react-router-dom';
import { IMovie } from '../@types/movies';
import Card from '../components/UI/Card';

const Movie = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const movie = state as unknown as IMovie;
  return (
    <section className='bg-gray-900 min-h-screen w-screen flex justify-center items-center'>
      <div className='gap-4 my-14'>
        <Card key={movie.id}>
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
            <div className='h-full'>
              <li className='w-fit py-3 block'>
                <h1>Synopsis: </h1>
                <p>{movie.long_description}</p>
              </li>
            </div>
          </ul>
          <button
            className='bg-red-500 hover:bg-red-700 mt-6 text-white font-bold py-2 px-4 rounded'
            onClick={() => navigate(-1)}
          >
            Go Back
          </button>
        </Card>
      </div>
    </section>
  );
};

export default Movie;
