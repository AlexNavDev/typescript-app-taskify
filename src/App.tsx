import Header from "./components/header/Header";
import Main from "./components/main/Main";
import Error from "./components/Error";
import useCrudTask from "./hooks/useCrudTask";

function App() {
  const {
    addTask,
    handleError,
    editTask,
    handleCompleted,
    deleteTask,
    tasks,
    tasksCompleted,
    errorForm,
    messageError,
  } = useCrudTask();

  return (
    <div className="w-11/12 m-h-screen h-[55rem] max-w-7xl m-auto flex flex-col items-center justify-evenly bg-gradient-to-tl from-50% from-secondary to-primary to-80% relative md:h-[60rem]">
      <Header addTask={addTask} handleError={handleError} />
      {errorForm && (
        <Error
          errorForm={errorForm}
          handleError={handleError}
          message={messageError}
        />
      )}
      <Main
        tasks={tasks}
        tasksCompleted={tasksCompleted}
        editTask={editTask}
        handleCompleted={handleCompleted}
        deleteTask={deleteTask}
      />
    </div>
  );
}

export default App;
