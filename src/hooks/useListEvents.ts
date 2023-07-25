import { useState } from "react";
import { ITask } from "../types";
import { initialForm } from "../helper/initialForm";

type FormInput = React.ChangeEvent<HTMLInputElement | HTMLSelectElement>;

const useListEvents = (task: ITask) => {
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [edit, setEdit] = useState<ITask>(initialForm);
  const [showBtnEdit, setShowBtnEdit] = useState(false);

  const handleIsToggle = () => {
    setIsEdit(!isEdit);
  };

  const handleEdit = (task: ITask) => {
    handleIsToggle();
    setEdit(task);
  };

  const handleChangeEdit = (e: FormInput) => {
    const { name, value } = e.target;

    if (task) {
      showBtnFormEdit(true);
    }

    setEdit({ ...edit, [name]: value });
  };

  const showBtnFormEdit = (isEdit: boolean): void => {
    setShowBtnEdit(isEdit);
  };

  return {
    isEdit,
    edit,
    showBtnEdit,
    showBtnFormEdit,
    handleIsToggle,
    handleChangeEdit,
    handleEdit,
  };
};

export default useListEvents;
