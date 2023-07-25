import useFilterPriority from "../../../../hooks/useFilterPriority";
import { PropsModal } from "../../../../types";
import Button from "../../../button/Button";
import ListTasks from "../../listTasks/ListTasks";
import CloseButton from "../buttons/CloseButton";
import { useState, useEffect } from "react";
import ButtonFilterGroup from "./ButtonFilterGroup";
import List from "../../listTasks/List";

const ModalPendingTasks = ({
  tasks,
  editTask,
  handleCompleted,
  deleteTask,
  closeModal,
}: PropsModal) => {
  const [isToggle, setIsToggle] = useState<boolean>(false);

  useEffect(() => {
    if (tasks.length === 0) {
      closeModal();
    }
  }, [tasks, closeModal]);

  const { getPriority, filterPriority, priority } = useFilterPriority(tasks);

  const textFilter = isToggle ? "Ocultar filtro" : "Mostrar filtro";

  return (
    <section className="w-full m-h-screen bg-black bg-opacity-80 absolute top-0 bottom-0 left-0 flex flex-col justify-evenly items-center">
      <article className="w-full h-full bg-secondary flex flex-col md:w-11/12 md:h-[90%]">
        <CloseButton onClick={closeModal} />
        <h2 className="h-12 flex items-center justify-center text-white text-2xl bg-black bg-opacity-50 md:text-shadow-lila md:bg-opacity-50 md:font-bold md:shadow-lg md:shadow-white">
          Lista de tareas pendientes
        </h2>

        <div className="h-36 bg-black bg-opacity-30 flex flex-col items-center justify-evenly md:h-28 md:flex-row md:justify-around">
          <Button
            type="button"
            background="blue"
            onClick={() => setIsToggle(!isToggle)}>
            {textFilter}
          </Button>

          {isToggle && (
            <ButtonFilterGroup
              tasks={tasks}
              getPriority={getPriority}
              priority={priority}
            />
          )}
        </div>

        <div className="h-[39rem]  overflow-hidden scrollbar overflow-y-auto md:bg-hero md:bg-center md:bg-contain">
          {filterPriority.length === 0 && (
            <p className="w-full h-20 grid place-content-center font-bold text-2xl text-white text-shadow-white bg-black bg-opacity-50 ">
              No hay tareas😐
            </p>
          )}
          <ListTasks>
            {filterPriority?.map((task) => (
              <List
                key={task.id}
                task={task}
                editTask={editTask}
                handleCompleted={handleCompleted}
                deleteTask={deleteTask}
              />
            ))}
          </ListTasks>
        </div>
      </article>
    </section>
  );
};

export default ModalPendingTasks;
