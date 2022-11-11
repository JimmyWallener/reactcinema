import { useNavigate } from 'react-router-dom';
import LoginForm from '../components/Form/LoginForm';
import SignupForm from '../components/Form/SignupForm';

const Login = () => {
  const navigate = useNavigate();
  return (
    <div className='flex justify-center gap-32 items-center h-screen bg-gray-900'>
      <LoginForm />
      <SignupForm navigate={navigate} />
    </div>
  );
};

export default Login;
