import { useEffect } from "react";

interface Props {
  errorForm: boolean;
  handleError: (error: boolean) => void;
  message: string;
}

const Error = ({ errorForm, handleError, message }: Props) => {
  useEffect(() => {
    let timer: number;

    const handleTimeout = () => {
      timer = setTimeout(() => {
        handleError(false);
      }, 3000);
    };
    handleTimeout();

    return () => {
      clearTimeout(timer);
    };
  }, [errorForm, handleError]);

  return (
    <div className="w-full h-12 grid place-items-center bg-black bg-opacity-70 py-2 text-center font-bold text-red-600">
      <p>{message}</p>
    </div>
  );
};

export default Error;
