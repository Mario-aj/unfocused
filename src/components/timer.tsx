import { FaMinus, FaPlus } from "react-icons/fa";

import { useRun } from "../hook";

type Props = {
  title: string;
  time: number;
  isSession?: boolean;
  onIncrement: () => void;
  onDecrement: () => void;
};

const Timer = ({ time, title, onDecrement, onIncrement }: Props) => {
  const { isRunning } = useRun();

  return (
    <div className="flex flex-col items-center gap-2 select-none">
      <h2 className="mb-1 font-bold">{title}</h2>
      <span className="box-border flex items-center justify-center text-6xl font-bold text-white">
        {time}
      </span>
      <div className="flex items-center gap-4">
        <div
          onClick={() => time > 0 && onDecrement()}
          className={`flex items-center justify-center w-12 h-12 p-2 px-3 transition-all duration-300 border border-white rounded-full cursor-pointer active:bg-gray-600 hover:bg-gray-700 ${
            isRunning && "opacity-50 pointer-events-none"
          }`}
        >
          <FaMinus />
        </div>

        <div
          onClick={() => onIncrement()}
          className={`flex items-center justify-center w-12 h-12 p-2 px-3 transition-all duration-300 border border-white rounded-full cursor-pointer active:bg-gray-600 hover:bg-gray-700 ${
            isRunning && "opacity-50 pointer-events-none"
          }`}
        >
          <FaPlus />
        </div>
      </div>
    </div>
  );
};

export default Timer;
