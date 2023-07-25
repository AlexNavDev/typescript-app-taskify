interface Props {
  children: React.ReactNode;
}

const ListTasks = ({ children }: Props) => {
  return (
    <ul className="mt-3 md:flex md:flex-col md:justify-center md:items-center md:gap-y-3 lg:flex-row lg:justify-evenly lg:items-center lg:flex-wrap ">
      {children}
    </ul>
  );
};

export default ListTasks;
