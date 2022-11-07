const LoginForm = () => {
  return (
    <div className='w-full max-w-xs'>
      <form className='bg-gray-300 shadow-xl rounded px-8 pt-6 pb-8 mb-4'>
        <h3 className='text-xl mb-10 bg-gray-800 text-white uppercase'>
          Sign In
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
            placeholder='Email'
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
            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            id='password'
            type='password'
            placeholder='******************'
          />
        </div>
        <div className='flex items-center justify-center'>
          <button
            className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
            type='button'
          >
            Sign In
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
