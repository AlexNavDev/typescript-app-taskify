import { ITask } from "../../types";
import Button from "../button/Button";
import List from "./listTasks/List";
import ListTasks from "./listTasks/ListTasks";

interface Props {
  tasks: ITask[];
  editTask: (task: ITask) => void;
  handleCompleted: (task: ITask) => void;
  deleteTask: (id: string) => void;
  countPending: number;
  countCompleted: number;
  openModalPending: () => void;
  openModalCompleted: () => void;
  openModalSearch: () => void;
}

const SectionTasks = ({
  tasks,
  editTask,
  handleCompleted,
  deleteTask,
  countPending,
  countCompleted,
  openModalPending,
  openModalCompleted,
  openModalSearch,
}: Props) => {
  const tasksMessage =
    countPending < 1
      ? "Sin tareas pendientes. 😎"
      : countPending === 1
      ? "Última tarea."
      : "Últimas tareas.";

  return (
    <section className="w-full h-[28rem] overflow-hidden  bg-black bg-opacity-40 md:h-[31rem] ">
      <h3 className="w-1/2 text-white font-bold text-2xl text-center text-shadow-lila tracking-wider m-auto py-3">
        TAREAS
      </h3>
      <div className="w-full py-3 flex justify-evenly flex-wrap gap-y-3">
        {countPending > 0 && (
          <Button type="button" background="blue" onClick={openModalPending}>
            Pendientes
            <span
              className={`ml-2 text-lg font-semibold  ${
                countPending > 5 ? "text-red-600 " : "text-sky-900"
              }`}>
              {countPending}
            </span>
          </Button>
        )}

        {countCompleted > 0 && (
          <Button type="button" background="blue" onClick={openModalCompleted}>
            Completadas
            {countCompleted > 0 && (
              <span className="ml-2 text-lg font-semibold  text-sky-900">
                {countCompleted}
              </span>
            )}
          </Button>
        )}

        {(countPending > 5 || countCompleted > 5) && (
          <Button type="button" background="blue" onClick={openModalSearch}>
            Buscar
          </Button>
        )}
      </div>
      <h3 className="h-10 flex items-center text-white tracking-wider md:w-3/4 md:m-auto">
        {tasksMessage}
      </h3>

      <ListTasks>
        {tasks?.map((task) => (
          <List
            key={task.id}
            task={task}
            editTask={editTask}
            handleCompleted={handleCompleted}
            deleteTask={deleteTask}
          />
        ))}
      </ListTasks>
    </section>
  );
};

export default SectionTasks;
