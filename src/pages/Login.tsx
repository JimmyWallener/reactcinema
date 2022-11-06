import { LoginForm } from '../components/Form/LoginForm';
import SignupForm from '../components/Form/SignupForm';

export const Login = () => {
  return (
    <div className='flex flex-col justify-center gap-6 items-center'>
      <LoginForm />
      <SignupForm />
    </div>
  );
};
