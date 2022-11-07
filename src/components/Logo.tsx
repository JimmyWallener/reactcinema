import { Link } from 'react-router-dom';

const Logo = () => {
  return (
    <Link to='/'>
      <img
        className='w-[13vw] xl:w-44 h-[80%] cursor-pointer'
        src={
          'https://gritacademy.se/wp-content/uploads/2021/05/Grit-Academy-logo.png'
        }
        alt='Grid-Academy'
      />
    </Link>
  );
};

export default Logo;
