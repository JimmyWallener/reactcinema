import { useNavigate } from 'react-router-dom';
import LoginForm from '../components/Form/LoginForm';
import SignupForm from '../components/Form/SignupForm';
import { useAuthContext } from '../context/AuthContext';

const Login = () => {
  const navigate = useNavigate();
  const { setLoggedInUser } = useAuthContext();
  return (
    <div className='flex justify-center gap-32 items-center h-screen bg-gray-900'>
      <LoginForm />
      <SignupForm navigate={navigate} onLoggedIn={setLoggedInUser} />
    </div>
  );
};

export default Login;
