import { PropsModal } from "../../../../types";
import ListTasks from "../../listTasks/ListTasks";
import { useEffect } from "react";
import CloseButton from "../buttons/CloseButton";
import Button from "../../../button/Button";
import List from "../../listTasks/List";

const ModalCompletedTasks = ({
  tasks,
  editTask,
  deleteTask,
  handleCompleted,
  closeModal,
}: PropsModal) => {
  useEffect(() => {
    if (tasks.length === 0) closeModal();
  }, [tasks, closeModal]);

  return (
    <section className="w-full m-h-screen bg-black bg-opacity-80 absolute top-0 bottom-0 left-0 flex flex-col justify-evenly items-center">
      <article className="w-full h-full bg-primary flex flex-col  md:w-11/12 md:h-[90%]">
        <CloseButton onClick={closeModal} />
        <h2 className="h-14 grid place-content-center text-white text-center text-2xl bg-black bg-opacity-50 md:mb-5 md:text-shadow-blue md:bg-opacity-50 md:font-bold md:shadow-lg md:shadow-white">
          Lista de tareas completadas
        </h2>

        {tasks.length > 0 && (
          <div className="w-full h-20 grid place-content-center bg-black bg-opacity-30 md:my-5">
            <Button
              width="w-56"
              type="button"
              background="blue"
              onClick={() => deleteTask("all")}>
              Eliminar todas las tareas
            </Button>
          </div>
        )}

        <div className="h-[39rem] overflow-hidden scrollbar overflow-y-auto md:bg-hero md:bg-center md:bg-contain">
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
        </div>
      </article>
    </section>
  );
};

export default ModalCompletedTasks;
