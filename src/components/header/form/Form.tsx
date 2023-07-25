import { ITask } from "../../../types";
import useFormEvents from "../../../hooks/useFormEvents";
import Button from "../../button/Button";

interface Props {
  addTask: (task: ITask) => void;
  handleError: (error: boolean, text?: string) => void;
}

const Form = ({ addTask, handleError }: Props) => {
  const {
    form,
    inputRef,
    countLetters,
    errorInput,
    handleSubmit,
    handleChange,
    validateInput,
    handleCancel,
  } = useFormEvents({ addTask, handleError });
  const classNoLetters =
    countLetters > 45
      ? "text-red-500 font-bold p-1 bg-black bg-opacity-50 rounded-full text-sm"
      : "text-white";

  return (
    <form
      className="h-80 flex flex-col justify-evenly items-center"
      onSubmit={handleSubmit}>
      <label
        htmlFor="tasks"
        className=" w-11/12  relative block overflow-hidden border-b border-gray-200 bg-transparent pt-3 focus-within::border-blue-300">
        <input
          className="text-white peer h-8 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm md:text-center md:text-lg"
          id="tasks"
          type="text"
          name="name"
          ref={inputRef}
          value={form.name}
          onChange={handleChange}
          onKeyUp={validateInput}
          maxLength={50}
          placeholder="Ejemplo: Hacer compras para la semana"
          autoComplete="off"
        />

        <span className="absolute start-0 top-2 -translate-y-1/2 tracking-wider text-xs text-blue-200  transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-xs">
          Escribe tu tarea
        </span>
      </label>

      {countLetters > 0 && (
        <small className="w-1/2 text-center text-white py-1 rounded-md">
          No. Caracteres:
          <span className={`${classNoLetters}`}>{countLetters}</span>
        </small>
      )}

      <div className="w-full my-3  bg-black bg-opacity-50  text-white flex justify-evenly py-1  rounded-md md:w-2/3">
        <label htmlFor="high">Alta</label>
        <input
          type="radio"
          name="priority"
          value="high"
          id="high"
          checked={form.priority === "high"}
          onChange={handleChange}
        />

        <label htmlFor="medium">Media</label>
        <input
          type="radio"
          name="priority"
          value="medium"
          id="medium"
          checked={form.priority === "medium"}
          onChange={handleChange}
        />

        <label htmlFor="low">Baja</label>
        <input
          type="radio"
          name="priority"
          value="low"
          id="low"
          checked={form.priority === "low"}
          onChange={handleChange}
        />
      </div>

      <div className="w-full h-14 flex justify-around items-center">
        <Button type="submit" background="blue">
          Crear
        </Button>

        <Button type="button" background="red" onClick={handleCancel}>
          Cancelar
        </Button>
      </div>

      {countLetters >= 1 && (
        <div
          title="Simbolos como ¿? !¡ . , $ % & # @"
          className="w-full bg-black bg-opacity-40 rounded-md md:w-3/4">
          <p
            className={`text-sm text-center py-1 tracking-wide ${
              errorInput ? " text-red-500" : "text-red-300"
            }`}>
            No se permiten simbolos ni más de 50 caracteres.❓
          </p>
        </div>
      )}
    </form>
  );
};

export default Form;
