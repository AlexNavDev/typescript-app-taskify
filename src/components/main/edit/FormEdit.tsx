import { ITask } from "../../../types";
import { useState } from "react";
import Button from "../../button/Button";

type FormSubmit = React.MouseEvent<HTMLFormElement>;
type FormInput = React.ChangeEvent<HTMLInputElement | HTMLSelectElement>;
type FormInputKey = React.KeyboardEvent<HTMLInputElement> &
  React.ChangeEvent<HTMLInputElement>;

interface Props {
  edit: ITask;
  showBtnEdit: boolean;
  showBtnFormEdit: (isEdit: boolean) => void;
  handleIsToggle: () => void;
  editTask: (task: ITask) => void;
  handleChangeEdit: (e: FormInput) => void;
}

const FormEdit = ({
  edit,
  showBtnEdit,
  showBtnFormEdit,
  handleIsToggle,
  editTask,
  handleChangeEdit,
}: Props) => {
  const [errorInput, setErrorInput] = useState<boolean>(false);

  const validateInput = (e: FormInputKey) => {
    const inputValue = e.target.value;

    const regex = /[^a-zA-Z0-9\sáéíóúÁÉÍÓÚñÑüÜ]/g;

    regex.test(inputValue) ? setErrorInput(true) : setErrorInput(false);
  };

  const handleSubmitEdit = (e: FormSubmit) => {
    e.preventDefault();

    if (!errorInput) {
      handleIsToggle();
      editTask(edit);
    }
    showBtnFormEdit(false);
  };

  const handleCancel = () => {
    handleIsToggle();
    showBtnFormEdit(false);
  };

  return (
    <form
      className="h-full flex flex-col justify-evenly bg-transparet"
      onSubmit={handleSubmitEdit}>
      <input
        className="h-8"
        name="name"
        type="text"
        value={edit.name}
        maxLength={50}
        onChange={handleChangeEdit}
        onKeyUp={validateInput}
      />

      <select
        className="mx-auto w-28"
        name="priority"
        id=""
        value={edit.priority}
        onChange={handleChangeEdit}>
        <option value="high">Alta</option>
        <option value="medium">Media</option>
        <option value="low">Baja</option>
      </select>

      <div className="flex justify-evenly">
        {showBtnEdit && (
          <Button type="submit" background="blue">
            Editar
          </Button>
        )}

        <Button type="button" background="red" onClick={handleCancel}>
          Cancelar
        </Button>
      </div>
      {errorInput && (
        <p className="text-sm text-center py-1 tracking-wide bg-black bg-opacity-50  text-red-300">
          *No se permiten simbolos ni más de 50 caracteres.
        </p>
      )}
    </form>
  );
};

export default FormEdit;
