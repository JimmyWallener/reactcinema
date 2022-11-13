interface ICard {
  children: React.ReactNode;
}

const Card = ({ children }: ICard) => {
  return (
    <div
      className={`p-2 my-2 w-[15vw] h-[70vh] break-all flex flex-grow flex-shrink flex-col shadow rounded-2xl bg-white`}
    >
      {children}
    </div>
  );
};

export default Card;
