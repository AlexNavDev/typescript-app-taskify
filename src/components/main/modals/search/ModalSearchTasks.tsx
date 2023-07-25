import { useState } from "react";
import { PropsModal } from "../../../../types";
import CloseButton from "../buttons/CloseButton";
import ListTasks from "../../listTasks/ListTasks";
import List from "../../listTasks/List";

type FormEvent = {
  inputChanged: React.ChangeEvent<HTMLInputElement>;
  submit: React.FormEvent<HTMLFormElement>;
};

const ModalSearchTasks = ({
  tasks,
  editTask,
  handleCompleted,
  deleteTask,
  closeModal,
}: PropsModal) => {
  const [inputSearch, setInputSearch] = useState<string>("");

  const handleChangeSearch = (e: FormEvent["inputChanged"]) => {
    setInputSearch(e.target.value);
  };

  const filteredItems = tasks.filter((item) =>
    item.name.toLowerCase().trim().includes(inputSearch.toLowerCase().trim())
  );

  return (
    <div>
      <section className="w-full m-h-screen bg-black bg-opacity-80 absolute top-0 bottom-0 left-0 flex flex-col justify-evenly items-center">
        <article className="w-full h-full bg-primary flex flex-col  md:w-11/12 md:h-[90%]">
          <CloseButton onClick={closeModal} />

          <h2 className="w-full h-14 grid place-content-center text-white text-center text-2xl bg-black bg-opacity-50 md:mb-5 md:text-shadow-blue md:bg-opacity-50 md:font-bold md:shadow-md md:shadow-white">
            Busqueda
          </h2>

          <div className="w-full h-16 bg-black bg-opacity-50 py-1">
            <label
              htmlFor="tasks"
              className=" w-80 mx-auto relative block overflow-hidden border-b border-gray-200 bg-transparent pt-5 focus-within::border-blue-300">
              <input
                className="w-full h-8 text-white peer border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm md:text-center md:text-lg"
                id="tasks"
                type="search"
                name="name"
                value={inputSearch}
                onChange={handleChangeSearch}
                maxLength={10}
                autoComplete="off"
                autoFocus
                placeholder="Ejemplo: Hacer compras para la semana"
              />

              <span className="absolute start-0 top-2 -translate-y-1/2 tracking-wider text-xs text-blue-200  transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-xs">
                Busca tu tarea
              </span>
            </label>
          </div>

          <div className="w-full h-screen overflow-hidden scrollbar overflow-y-auto bg-red-950 md:bg-hero md:bg-center md:bg-contain">
            {/*<ListTasks
              tasks={filteredItems}
              editTask={editTask}
              handleCompleted={handleCompleted}
              deleteTask={deleteTask}
            />*/}
            <ListTasks>
              {filteredItems?.map((task) => (
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
    </div>
  );
};

export default ModalSearchTasks;
