export interface ITask {
  id: string;
  name: string;
  priority: string;
  completed: boolean;
}

export interface PropsModal {
  tasks: ITask[];
  editTask: (task: ITask) => void;
  handleCompleted: (task: ITask) => void;
  deleteTask: (id: string) => void;
  closeModal: () => void;
}
