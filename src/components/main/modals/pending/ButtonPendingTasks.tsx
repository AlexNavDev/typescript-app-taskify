interface Props {
  name: string;
  bgColor: string;
  priority: string;
  active: string;
  noTasks?: number;
  onClick: () => void;
}

const ButtonPendingTasks = ({
  name,
  bgColor,
  priority,
  active,
  noTasks,
  onClick,
}: Props) => {
  const bg =
    active === priority ? "text-slate-950 font-bold bg-tertiary" : bgColor;

  return (
    <button
      onClick={onClick}
      className={`w-16 h-16 mb-2 rounded-full ${bg} text-white  flex flex-col justify-center items-center active:scale-90 ease-out duration-100 ring-white active:ring-2`}>
      {name}
      <small> {noTasks}</small>
    </button>
  );
};

export default ButtonPendingTasks;
