import LoginForm from '../components/Form/LoginForm';
import SignupForm from '../components/Form/SignupForm';

const Login = () => {
  return (
    <div className='flex justify-center gap-6 items-center'>
      <LoginForm />
      <SignupForm />
    </div>
  );
};

export default Login;
