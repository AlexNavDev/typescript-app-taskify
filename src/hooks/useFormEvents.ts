import { useRef, useState } from "react";
import { ITask } from "../types";
import { initialForm } from "../helper/initialForm";

interface Props {
  addTask: (task: ITask) => void;
  handleError: (error: boolean, text?: string) => void;
}

type FormInput = React.ChangeEvent<HTMLInputElement>;
type FormSubmit = React.FormEvent<HTMLFormElement>;
type FormInputKey = React.KeyboardEvent<HTMLInputElement> &
  React.ChangeEvent<HTMLInputElement>;

const useFormEvents = ({ addTask, handleError }: Props) => {
  const [form, setForm] = useState<ITask>(initialForm);
  const inputRef = useRef<HTMLInputElement>(null);
  const [errorInput, setErrorInput] = useState<boolean>(false);
  const [countLetters, setCountLetters] = useState<number>(0);

  const handleChange = (e: FormInput): void => {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: value,
    });
  };

  const validateInput = (e: FormInputKey): void => {
    const inputValue = e.target.value;
    const regex = /[^a-zA-Z0-9\sáéíóúÁÉÍÓÚñÑüÜ]/g;

    regex.test(inputValue) ? setErrorInput(true) : setErrorInput(false);

    setCountLetters(form.name.length);
  };

  const handleReset = (): void => {
    setForm(initialForm);
    setCountLetters(0);
    inputRef.current?.focus();
  };

  const handleSubmit = (e: FormSubmit): void => {
    e.preventDefault();

    if (errorInput) return handleError(true, "No se permiten simbolos");

    if (!form.name || !form.priority) return handleError(true);

    addTask(form);

    handleReset();
  };

  const handleCancel = (): void => {
    handleReset();
  };

  return {
    form,
    inputRef,
    countLetters,
    errorInput,
    handleSubmit,
    handleChange,
    validateInput,
    handleCancel,
  };
};

export default useFormEvents;
