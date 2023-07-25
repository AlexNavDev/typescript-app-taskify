interface Props {
  width?: string;
  type: "button" | "submit";
  background: string;
  onClick?: () => void;
  children: React.ReactNode;
}

const Button = ({
  width = "w-36",
  type,
  background,
  onClick,
  children,
}: Props) => {
  const buttonClasse = `${
    background === "blue"
      ? "bg-blue-400 hover:bg-blue-500 border-b-blue-800 border-x-blue-500"
      : "bg-red-300 hover:bg-red-500 border-b-red-800 border-x-red-500"
  }h-10 border-4 flex justify-center items-center text-white tracking-wide rounded py-2 active:scale-90 ease-out duration-100 ring-white active:ring-2`;

  return (
    <button
      onClick={onClick}
      className={`${width} ${buttonClasse} `}
      type={type}>
      {children}
    </button>
  );
};

export default Button;
