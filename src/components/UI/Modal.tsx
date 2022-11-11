type ModalType = {
  error: { header: string; message: string };
  onClickHandler: () => void;
};

const Modal = ({ error, onClickHandler }: ModalType) => {
  return (
    <div
      className='min-w-screen h-screen animated fadeIn faster  fixed  left-0 top-0 flex justify-center items-center inset-0 z-50 outline-none focus:outline-none bg-no-repeat bg-center bg-cover'
      id='modal-id'
    >
      <div className='absolute bg-black opacity-80 inset-0 z-0'></div>
      <div className='w-full  max-w-lg p-5 relative mx-auto my-auto rounded-xl shadow-lg  bg-white '>
        <div className=''>
          <div className='text-center p-5 flex-auto justify-center'>
            <h2 className='text-xl font-bold py-4 '>{error.header}</h2>
            <p className='text-sm text-gray-500 px-8'>{error.message}</p>
          </div>
          <div className='flex justify-center'>
            <button
              onClick={() => onClickHandler()}
              className='mb-2 md:mb-0 bg-red-500 border border-red-500 px-5 py-2 text-sm shadow-sm font-medium tracking-wider text-white rounded-full hover:shadow-lg hover:bg-red-600'
            >
              OK
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
