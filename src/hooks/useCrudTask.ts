import { useState, useEffect } from "react";
import { ITask } from "../types";
import Swal from "sweetalert2";
import useModal from "./useModal";

const useCrudTask = () => {
  const storedTasks = localStorage.getItem("Tasks");
  const storedTasksCompleted = localStorage.getItem("TasksCompleted");
  const { closeModal } = useModal();

  const [tasks, setTasks] = useState<ITask[]>(
    storedTasks ? JSON.parse(storedTasks) : []
  );

  const [tasksCompleted, setTasksCompleted] = useState<ITask[]>(
    storedTasksCompleted ? JSON.parse(storedTasksCompleted) : []
  );
  const [errorForm, setErrorForm] = useState<boolean>(false);
  const [messageError, setMessageError] = useState<string>("");

  useEffect(() => {
    localStorage.setItem("Tasks", JSON.stringify(tasks));
    localStorage.setItem("TasksCompleted", JSON.stringify(tasksCompleted));
  }, [tasks, tasksCompleted]);

  function tasksRepeat(task: ITask): boolean {
    const combinedTasks = [...tasks, ...tasksCompleted];

    const isTaskRepeat = combinedTasks.some(
      (el) => el.name.toLowerCase().trim() === task.name.toLowerCase().trim()
    );

    return isTaskRepeat;
  }

  const addTask = (task: ITask): void => {
    const taskId = crypto.randomUUID().slice(0, 8);
    const taskName = task.name.trim();
    const capitalize = taskName.charAt(0).toUpperCase() + taskName.slice(1);

    tasksRepeat(task)
      ? Swal.fire({
          position: "center",
          icon: "warning",
          title: "Tarea repetida 🙄",
          showConfirmButton: false,
          timer: 1500,
        })
      : setTasks([{ ...task, id: taskId, name: capitalize }, ...tasks]);
  };

  const editTask = (task: ITask): void => {
    const combinedTasks = [...tasks, ...tasksCompleted];
    const nameTask = task.name.toLowerCase().trim();

    const existingTask = combinedTasks.find(
      (el) =>
        el.name.toLowerCase() === nameTask.toLowerCase() &&
        el.id !== task.id &&
        el.priority !== task.priority
    );

    if (!existingTask) {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Tarea Editada 😀",
        showConfirmButton: false,
        timer: 1500,
      });

      const newTasks = tasks.map((el) => (el.id === task.id ? task : el));
      return setTasks(newTasks);
    }

    Swal.fire({
      position: "center",
      icon: "warning",
      title: "El nuevo nombre de la tarea ya existe.",
      showConfirmButton: false,
      timer: 2000,
    });
  };

  const deleteTask = (id: string): void => {
    closeModal();
    const textAlert = id === "all" ? "todas las tareas" : "la tarea";
    Swal.fire({
      title: `¿Estas seguro de eliminar ${textAlert}?`,
      text: "",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, ¡Eliminar!",
    }).then((result) => {
      if (result.isConfirmed) {
        const removeTask = tasks.filter((task) => task.id !== id);
        setTasks(removeTask);

        const removeTaskCompleted = tasksCompleted.filter(
          (task) => task.id !== id
        );
        setTasksCompleted(removeTaskCompleted);

        if (id === "all") {
          setTasksCompleted([]);
        }

        Swal.fire({
          position: "center",
          icon: "success",
          title: "Tarea Eliminada 🙂",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };

  const handleCompleted = (task: ITask): void => {
    if (tasks.find((el) => el.id === task.id)) {
      const item = tasks.filter((el) => el.id !== task.id);
      setTasks(item);
      setTasksCompleted([...tasksCompleted, { ...task, completed: true }]);
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Tarea Completada 😁",
        showConfirmButton: false,
        timer: 1500,
      });
    }

    if (tasksCompleted.find((el) => el.id === task.id)) {
      const item = tasksCompleted.filter((el) => el.id !== task.id);
      setTasksCompleted(item);
      setTasks([...tasks, { ...task, completed: false }]);
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Tarea Pendiente 🤔",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  const handleError = (
    error: boolean,
    textError = "Completa los campos"
  ): void => {
    setMessageError(textError);
    setErrorForm(error);
  };

  return {
    addTask,
    handleError,
    editTask,
    handleCompleted,
    deleteTask,
    tasks,
    tasksCompleted,
    errorForm,
    messageError,
  };
};

export default useCrudTask;
