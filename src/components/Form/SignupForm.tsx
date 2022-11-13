import { Component, Fragment, ReactNode } from 'react';
import { addUser, isEmailInDatabase } from '../helpers/add_user';
import Modal from '../UI/Modal';

type myState = {
  showModal: boolean;
};

class SignupForm extends Component<
  { navigate: any; onLoggedIn: any },
  myState
> {
  constructor(props: any) {
    super(props);
    this.state = { showModal: false };
    this.onModalStatusChange = this.onModalStatusChange.bind(this);
    this.onBlurHandler = this.onBlurHandler.bind(this);
    this.onChangeHandler = this.onChangeHandler.bind(this);
    this.onSubmitHandler = this.onSubmitHandler.bind(this);
    this.redirectUser = this.redirectUser.bind(this);
  }

  // This function is used to change the state of the modal
  onModalStatusChange = (): void => {
    this.setState((prevState) => ({ showModal: !prevState.showModal }));
  };

  // Redirects user after successful signup and automatically logs them in by changing the state of the AuthContext
  redirectUser = (id: string | null): void => {
    if (id) {
      this.props.onLoggedIn({ logged: true, id: id });
      this.props.navigate('/');
    }
  };

  // check if email is in database after unfocusing email input, return modal if true
  onBlurHandler = async (
    e: React.FocusEvent<HTMLInputElement>
  ): Promise<void> => {
    e.preventDefault();
    (await isEmailInDatabase(e.target.value.toLowerCase().trim()))
      ? this.onModalStatusChange()
      : null;
  };

  onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
    e.preventDefault();
    // check if password on second input field is the same as the first
    // if not, change the border color to red
    if (e.target.name === 'verify_password') {
      if (
        e.target.value !==
        (document.getElementById('signup_password') as HTMLInputElement).value
      ) {
        e.target.style.borderColor = 'red';
      } else {
        e.target.style.borderColor = 'green';
      }
    }
  };

  // if everything checks out, add user to database and redirect user
  onSubmitHandler = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);

    const data = Object.fromEntries(formData);

    if (data.password === data.verify_password) {
      this.redirectUser(
        await addUser({
          email: data.email.toString().toLowerCase().trim(),
          password: data.password.toString(),
        })
      );
    }
  };

  render(): ReactNode {
    return (
      <Fragment>
        {this.state.showModal ? (
          <Modal
            error={{
              header: 'Account Problem',
              message: 'Email already exists. \n ',
            }}
            onClickHandler={this.onModalStatusChange}
          />
        ) : null}

        <div className='w-full max-w-xs'>
          <form
            className='bg-gray-300 shadow-xl rounded px-8 pt-6 pb-8 mb-4'
            onSubmit={this.onSubmitHandler}
          >
            <h3 className='text-xl text-center mb-10 bg-gray-800 text-white capitalize'>
              signup
            </h3>
            <div className='mb-4'>
              <label
                className='block text-gray-700 text-sm text-left font-bold mb-2'
                htmlFor='signup_email'
              >
                Email:
              </label>
              <input
                autoFocus
                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                id='signup_email'
                type='email'
                name='email'
                defaultValue={''}
                placeholder='Enter your email address'
                onBlur={this.onBlurHandler}
                required
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
                name='password'
                type='password'
                defaultValue={''}
                placeholder='Choose a password'
                required
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
                name='verify_password'
                type='password'
                defaultValue={''}
                placeholder='retype password'
                onChange={this.onChangeHandler}
                required
              />
            </div>
            <div className='flex items-center justify-center'>
              <button
                className='bg-green-700 hover:bg-green-900 w-full text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
                type='submit'
              >
                Signup
              </button>
            </div>
          </form>
        </div>
      </Fragment>
    );
  }
}

export default SignupForm;
