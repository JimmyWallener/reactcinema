import { useState } from 'react';
import Poster from '../assets/mock_poster.png';
import Modal from '../components/UI/Modal';
import encodeToImageBase64 from '../utils/base64';

const AddMovie = () => {
  const [movie, setMovie] = useState(Poster);
  const [showModal, setShowModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState({ header: '', message: '' });

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    console.log('Jooohooo');
    console.log(movie);
  };
  const onError = (): void => setShowModal(!showModal);

  const onChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    // check if file is an image and of type png or jpg
    // then check if file size is less than 1MB to keep base64 string small
    if (
      e.target.files![0].type === 'image/jpeg' ||
      e.target.files![0].type === 'image/png'
    ) {
      if (e.target.files![0].size < 1000000) {
        const file = e.target.files![0];
        const base64: any = await encodeToImageBase64(file);
        setMovie(base64);
      } else {
        setErrorMessage({
          header: 'File Size Error:',
          message: 'File is too big',
        });
        onError();
      }
    } else {
      setErrorMessage({
        header: 'File Type Error:',
        message: 'Only jpg or png files are allowed',
      });
      onError();
    }
  };

  return (
    <section className='bg-gray-900 h-screen flex gap-12 justify-center items-center'>
      {showModal ? <Modal error={errorMessage} clickHandler={onError} /> : null}
      <img
        src={movie}
        width='800'
        height='600'
        alt='movie-poster'
        className='mb-16'
      />
      <form
        onSubmit={onSubmit}
        className='bg-gray-300 flex flex-col shadow-xl xl:w-[30vw] rounded px-8 pt-6 pb-8 mb-4'
      >
        <div className='mb-4'>
          <label
            htmlFor='title'
            className='block text-gray-700 text-sm text-left font-bold mb-2'
          >
            Movie Title:
          </label>
          <input
            type='text'
            id='title'
            name='title'
            placeholder='Casablanca'
            maxLength={50}
            required
            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
          />
        </div>
        <div className='mb-4'>
          <label
            htmlFor='short_description'
            className='block text-gray-700 text-sm text-left font-bold mb-2'
          >
            Short Description of the Movie:
          </label>
          <textarea
            cols={40}
            rows={3}
            id='short_description'
            name='short_description'
            maxLength={170}
            required
            placeholder='Max 170 characters'
            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
          />
        </div>
        <div className='mb-4'>
          <label
            htmlFor='long_description'
            className='block text-gray-700 text-sm text-left font-bold mb-2'
          >
            Long Description of the Movie:
          </label>
          <textarea
            cols={40}
            rows={5}
            maxLength={500}
            id='long_description'
            name='long_description'
            placeholder='Max 500 characters'
            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
          />
        </div>
        <div className='mb-4'>
          <label
            htmlFor='file'
            className='block text-gray-700 text-sm text-left font-bold mb-2'
          >
            Add a Movie Poster:
          </label>
          <input
            type='file'
            name='file'
            id='file'
            accept='image/png,image/jpeg'
            onChange={onChange}
          />
        </div>
        <div className='mt-6 flex gap-4 justify-center items-center'>
          <button
            type='submit'
            className='shadow bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded focus:outline-none focus:shadow-outline'
          >
            Submit
          </button>

          <button
            type='reset'
            onClick={() => setMovie(Poster)}
            className='shadow bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
          >
            Reset Form
          </button>
        </div>
      </form>
    </section>
  );
};

export default AddMovie;
