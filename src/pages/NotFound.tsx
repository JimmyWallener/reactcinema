import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div className='bg-gray-900 min-h-screen w-screen flex justify-center items-center'>
      <div
        className={`col-span-4 p-2 my-2 w-[25vw] h-[25vh] flex flex-col justify-center items-center shadow rounded-2xl bg-white`}
      >
        <div>
          <p className='font-bold text-center text-xl'>404 - Page Not Found!</p>
          <p className='block p-4 text-center font-light'>
            Oh no! The page you are looking for does not exist!
          </p>
        </div>
        <div>
          <button
            className='bg-red-500 hover:bg-red-700 mt-6 text-white font-bold py-2 px-4 rounded'
            onClick={() => navigate('/')}
          >
            Take me back...!
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
