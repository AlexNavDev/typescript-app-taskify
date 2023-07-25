import { ITask } from "../../../../types";
import ButtonsPendingTasks from "./ButtonPendingTasks";

interface Props {
  tasks: ITask[];
  getPriority: (priority: string) => void;
  priority: string;
}
const ButtonFilterGroup = ({ tasks, getPriority, priority }: Props) => {
  function countTasksByPriority(tasks: ITask[], priority: string): number {
    const count = tasks.filter((task) => task.priority === priority);
    return count.length;
  }

  return (
    <div className="w-full  flex justify-evenly items-center md:w-1/2  md:justify-between">
      <ButtonsPendingTasks
        name="Todas"
        bgColor="bg-tt border-2 border-pink-800"
        priority="all"
        active={priority}
        onClick={() => getPriority("all")}
      />
      <ButtonsPendingTasks
        name="Alta"
        bgColor="bg-tt border-4 border-red-700 border-x "
        priority="high"
        active={priority}
        noTasks={countTasksByPriority(tasks, "high")}
        onClick={() => getPriority("high")}
      />
      <ButtonsPendingTasks
        name="Media"
        bgColor="bg-tt border-4 border-orange-500 border-x"
        priority="medium"
        active={priority}
        noTasks={countTasksByPriority(tasks, "medium")}
        onClick={() => getPriority("medium")}
      />

      <ButtonsPendingTasks
        name="Baja"
        bgColor="bg-tt border-4 border-green-700 border-x"
        priority="low"
        active={priority}
        noTasks={countTasksByPriority(tasks, "low")}
        onClick={() => getPriority("low")}
      />
    </div>
  );
};

export default ButtonFilterGroup;
