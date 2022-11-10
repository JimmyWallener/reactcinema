import LoginForm from '../components/Form/LoginForm';
import SignupForm from '../components/Form/SignupForm';

const Login = () => {
  return (
    <div className='flex justify-center gap-32 items-center h-screen bg-gray-900'>
      <LoginForm />
      <SignupForm />
    </div>
  );
};

export default Login;
