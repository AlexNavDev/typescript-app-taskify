import { ITask } from "../../types";
import Form from "./form/Form";

interface Props {
  addTask: (task: ITask) => void;
  handleError: (error: boolean, textError?: string) => void;
}

const Header = ({ addTask, handleError }: Props) => {
  return (
    <div className="w-full h-96 bg-white bg-opacity-10 p-2  flex flex-col justify-around  md:w-4/5 md:shadow-lg md:shadow-pink-500/70">
      <h1 className="text-3xl   text-white text-center text-shadow-white ">
        ¿Qué planes tienes para hoy?
      </h1>
      <Form addTask={addTask} handleError={handleError} />
    </div>
  );
};

export default Header;
