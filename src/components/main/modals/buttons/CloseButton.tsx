interface Props {
  onClick: () => void;
}

const CloseButton = ({ onClick }: Props) => {
  return (
    <button
      className="w-14 h-14 text-2xl bg-black bg-opacity-80 self-end p-3 m-3 rounded-full"
      onClick={onClick}>
      ❌
    </button>
  );
};

export default CloseButton;
