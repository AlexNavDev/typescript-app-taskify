import { ITask } from "../../../types";
import FormEdit from "../edit/FormEdit";
import useListEvents from "../../../hooks/useListEvents";

interface Props {
  task: ITask;
  editTask: (task: ITask) => void;
  handleCompleted: (task: ITask) => void;
  deleteTask: (id: string) => void;
}

interface BgColor {
  [key: string]: string;
  high: string;
  medium: string;
  low: string;
}

const List = ({ task, editTask, handleCompleted, deleteTask }: Props) => {
  const {
    isEdit,
    edit,
    showBtnEdit,
    showBtnFormEdit,
    handleIsToggle,
    handleChangeEdit,
    handleEdit,
  } = useListEvents(task);

  const bgColor: BgColor = {
    high: "bg-red-800 border-4 border-red-500 border-x-red-700",
    medium: "bg-orange-700 border-4 border-orange-500 border-x-orange-600",
    low: "bg-green-700  border-4 border-green-400 border-x-green-700",
  };

  const bgColorButton: BgColor = {
    high: "bg-red-500",
    medium: "bg-orange-400",
    low: "bg-green-300",
  };

  return (
    <li
      key={task.id}
      className={`${
        bgColor[task.priority]
      } h-32 mb-4 border md:w-4/6 md:shadow-lg md:shadow-pink-400/70 lg:w-2/5`}>
      {isEdit && task.id === edit.id ? (
        <FormEdit
          edit={edit}
          showBtnEdit={showBtnEdit}
          showBtnFormEdit={showBtnFormEdit}
          handleIsToggle={handleIsToggle}
          editTask={editTask}
          handleChangeEdit={handleChangeEdit}
        />
      ) : (
        <p
          className={`h-16 text-white  flex justify-center items-center break-words px-3 `}>
          {task.name}
        </p>
      )}

      {!isEdit && (
        <div
          className={`${
            bgColorButton[task.priority]
          } h-12 flex justify-evenly`}>
          <>
            {!task.completed && (
              <button onClick={() => handleEdit(task)}>
                📝<p className="text-sm">Editar</p>
              </button>
            )}

            <button onClick={() => handleCompleted(task)}>
              ☑️
              <p className="text-sm">
                {task.completed ? "Mover a Pendiente" : "Mover a Completada"}
              </p>
            </button>

            <button onClick={() => deleteTask(task.id)}>
              🗑️<p className="text-sm">Eliminar</p>
            </button>
          </>
        </div>
      )}
    </li>
  );
};

export default List;
