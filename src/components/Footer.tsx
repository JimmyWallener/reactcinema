import Facebook from '../assets/icons/facebook.svg';
import Github from '../assets/icons/github.svg';
import Linkedin from '../assets/icons/linkedin.svg';
const Footer = () => {
  return (
    <footer className='flex flex-col xl:w-full h-20 bg-white justify-center items-center'>
      <ul className='flex w-[50vw] xl:w-[30vw] justify-center items-center text-black'>
        <li>
          <a
            href='https://www.linkedin.com/in/jimmy-wallener/'
            target='_blank'
            rel='noreferrer'
          >
            <img
              src={Linkedin}
              alt='linkedin icon'
              width={30}
              height={30}
              className='ml-2'
            />
          </a>
        </li>
        <li>
          <a
            href='https://www.facebook.com/jimmy.wallener/'
            target='_blank'
            rel='noreferrer'
          >
            <img
              src={Facebook}
              alt='facebook icon'
              width={30}
              height={30}
              className='mx-2'
            />
          </a>
        </li>
        <li>
          <a
            href='https://github.com/JimmyWallener'
            target='_blank'
            rel='noreferrer'
          >
            <img
              src={Github}
              alt='github icon'
              width={30}
              height={30}
              className='ml-2'
            />
          </a>
        </li>
      </ul>
      <div className='mt-2'>
        <p>&copy; Jimmy Wallener - 2022</p>
      </div>
    </footer>
  );
};

export default Footer;
