import { FaMinus, FaPlus } from "react-icons/fa";

import { useRun } from "src/hook";

type Props = {
  title: string;
  time: number;
  onIncrement: () => void;
  onDecrement: () => void;
};

const className =
  "flex items-center justify-center w-12 h-12 p-2 px-3 transition-all duration-300 border border-white rounded-full cursor-pointer active:bg-gray-600 hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed";

const Timer = ({ time, title, onDecrement, onIncrement }: Props) => {
  const { isRunning } = useRun();

  return (
    <div className="flex flex-col items-center gap-2 select-none">
      <h2 className="mb-1 font-bold">{title}</h2>
      <span className="box-border flex items-center justify-center text-6xl font-bold text-white">
        {time}
      </span>
      <div className="flex items-center gap-4">
        <button
          title="Decrement"
          onClick={onDecrement}
          disabled={isRunning || time <= 1}
          className={className}
        >
          <FaMinus />
        </button>

        <button
          title="Increment"
          onClick={onIncrement}
          disabled={isRunning}
          className={className}
        >
          <FaPlus />
        </button>
      </div>
    </div>
  );
};

export default Timer;
