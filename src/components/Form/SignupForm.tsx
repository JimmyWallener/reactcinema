import { Component, ReactNode } from 'react';

class SignupForm extends Component {
  render(): ReactNode {
    return (
      <div className='w-full max-w-xs'>
        <form className='bg-gray-300 shadow-xl rounded px-8 pt-6 pb-8 mb-4'>
          <h3 className='text-xl text-center mb-10 bg-gray-800 text-white uppercase'>
            Sign Up
          </h3>
          <div className='mb-4'>
            <label
              className='block text-gray-700 text-sm text-left font-bold mb-2'
              htmlFor='signup_email'
            >
              Email:
            </label>
            <input
              className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              id='signup_email'
              type='email'
              placeholder='Enter your email address'
            />
          </div>

          <div className='mb-6'>
            <label
              className='block text-gray-700 text-sm text-left font-bold mb-2'
              htmlFor='signup_password'
            >
              Password:
            </label>
            <input
              className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              id='signup_password'
              type='password'
              placeholder='Choose a password'
            />
          </div>
          <div className='mb-6'>
            <label
              className='block text-gray-700 text-sm text-left font-bold mb-2'
              htmlFor='verify_password'
            >
              Verify Password:
            </label>
            <input
              className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              id='verify_password'
              type='password'
              placeholder='retype password'
            />
          </div>
          <div className='flex items-center justify-center'>
            <button
              className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
              type='button'
            >
              Sign Up
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default SignupForm;
