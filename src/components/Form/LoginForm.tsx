import bcrypt from 'bcryptjs-react';
import { collection, getDocs } from 'firebase/firestore';
import { ChangeEvent, FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { USER } from '../../@types/user';
import { useAuthContext } from '../../context/AuthContext';
import { db } from '../../db/firebase';
import Modal from '../UI/Modal';

interface userProps {
  email: string;
  password: string;
}

type responseType = {
  code: string;
  message: string;
};

// async function that returns a promise after comparing the password
const matchPassword = (storedPassword: string, inputPassword: string) => {
  return bcrypt.compare(inputPassword, storedPassword);
};

const LoginForm = (): JSX.Element => {
  const navigate = useNavigate();
  const { setLoggedInUser } = useAuthContext();
  const [showModal, setShowModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState({ header: '', message: '' });
  const [userCredentials, setUserCredentials] = useState<userProps>({
    email: '',
    password: '',
  });
  const onError = (): void => setShowModal(!showModal);
  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>): void => {
    setUserCredentials((prevState) => {
      return {
        ...prevState,
        [e.target.name]: e.target.value,
      };
    });
  };
  const login = async (user: USER): Promise<responseType> => {
    const querySnapshot = await getDocs(collection(db, 'users'));
    let message: responseType = {
      code: '200',
      message: '',
    };

    querySnapshot.forEach(async (account) => {
      const { email, password, id } = account.data();

      if (
        email === user.email.toLowerCase().trim() &&
        (await matchPassword(password, user.password))
      ) {
        message = {
          code: '200',
          message: 'Login successful',
        };
        setLoggedInUser({ logged: true, token: id });
      }
      if (!(email === user.email.toLowerCase().trim())) {
        message = {
          code: '403',
          message: 'Incorrect Email / No such Email',
        };
      } else {
        message = {
          code: '403',
          message: 'Invalid password',
        };
      }
    });
    return message;
  };

  // Depending on the response from the server, show a modal with the error message,
  // else on 200, navigate to the previous page
  const onSubmitHandler = async (
    e: FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    const { code, message } = await login(userCredentials);

    switch (code) {
      case '200':
        navigate('/');
        break;
      case '403':
        setErrorMessage({ header: 'Login Error:', message: message });
        if (message.includes('password')) {
          setUserCredentials((prevState) => {
            return {
              ...prevState,
              password: '',
            };
          });
        } else {
          setUserCredentials((prevState) => {
            return {
              ...prevState,
              email: '',
            };
          });
        }
        setShowModal(true);
        break;
      default:
        setErrorMessage({
          header: 'Unknown Error:',
          message:
            'Something must have gone really bad for you to see this! \n Please try again',
        });
        setShowModal(true);
        console.error(code);
    }
  };

  return (
    <div className='w-full max-w-xs'>
      {showModal ? (
        <Modal error={errorMessage} onClickHandler={onError} />
      ) : null}
      <form
        className='bg-gray-300 shadow-xl rounded px-8 pt-6 pb-8 mb-4'
        onSubmit={onSubmitHandler}
      >
        <h3 className='text-xl mb-16 text-center  bg-gray-800 text-white capitalize'>
          sign in
        </h3>
        <div className='mb-4'>
          <label
            className='block text-gray-700 text-sm text-left font-bold mb-2'
            htmlFor='email'
          >
            Email:
          </label>
          <input
            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            id='email'
            type='email'
            name='email'
            placeholder='Email'
            value={userCredentials.email}
            onChange={onChangeHandler}
            required
          />
        </div>
        <div className='mb-6'>
          <label
            className='block text-gray-700 text-sm text-left font-bold mb-2'
            htmlFor='password'
          >
            Password:
          </label>
          <input
            className='shadow appearance-none border mb-16 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            id='password'
            type='password'
            name='password'
            value={userCredentials.password}
            onChange={onChangeHandler}
            placeholder='******************'
            required
          />
        </div>
        <div className='flex items-center justify-center'>
          <button
            className='bg-blue-500 hover:bg-blue-700 w-full capitalize text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
            type='submit'
          >
            Sign in
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
