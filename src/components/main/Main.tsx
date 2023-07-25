import useModal from "../../hooks/useModal";
import { ITask } from "../../types";
import SectionTasks from "./SectionTasks";
import ModalCompletedTasks from "./modals/completed/ModalCompletedTasks";
import ModalPendingTasks from "./modals/pending/ModalPendingTasks";
import ModalSearchTasks from "./modals/search/ModalSearchTasks";

interface Props {
  tasks: ITask[];
  tasksCompleted: ITask[];
  editTask: (task: ITask) => void;
  handleCompleted: (task: ITask) => void;
  deleteTask: (id: string) => void;
}

const Main = ({
  tasks,
  tasksCompleted,
  editTask,
  handleCompleted,
  deleteTask,
}: Props) => {
  const {
    isOpen: isOpenPending,
    openModal: openModalPending,
    closeModal: closeModalPending,
  } = useModal();

  const {
    isOpen: isOpenCompleted,
    openModal: openModalCompleted,
    closeModal: closeModalCompleted,
  } = useModal();

  const {
    isOpen: isOpenSearch,
    openModal: openModalSearch,
    closeModal: closeModalSearch,
  } = useModal();

  const firstThreeElemenst = tasks?.slice(0, 4);
  const countPending = tasks?.length;
  const countCompleted = tasksCompleted?.length;
  const combinedTasks = [...tasks, ...tasksCompleted];

  return (
    <main className="w-full flex flex-col items-center my-5">
      {(countPending > 0 || countCompleted > 0) && (
        <SectionTasks
          tasks={firstThreeElemenst}
          editTask={editTask}
          handleCompleted={handleCompleted}
          deleteTask={deleteTask}
          countPending={countPending}
          countCompleted={countCompleted}
          openModalPending={openModalPending}
          openModalCompleted={openModalCompleted}
          openModalSearch={openModalSearch}
        />
      )}
      {isOpenPending && (
        <ModalPendingTasks
          tasks={tasks}
          editTask={editTask}
          handleCompleted={handleCompleted}
          deleteTask={deleteTask}
          closeModal={closeModalPending}
        />
      )}
      {isOpenCompleted && (
        <ModalCompletedTasks
          tasks={tasksCompleted}
          editTask={editTask}
          handleCompleted={handleCompleted}
          deleteTask={deleteTask}
          closeModal={closeModalCompleted}
        />
      )}
      {isOpenSearch && (
        <ModalSearchTasks
          tasks={combinedTasks}
          editTask={editTask}
          handleCompleted={handleCompleted}
          deleteTask={deleteTask}
          closeModal={closeModalSearch}
        />
      )}
    </main>
  );
};

export default Main;
