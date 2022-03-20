import { useMemo } from "react";
import { FaMinus, FaPlus } from "react-icons/fa";

type Props = {
  title: string;
  time?: number;
  isSession?: boolean;
  onIncrement: () => void;
  onDecrement: () => void;
};

const minimumBreakTime = 3;
const maximumBreakTime = 10;
const minimumSessionTime = 15;
const maximumSessionTime = 30;

const Timer = ({
  time = 5,
  title,
  isSession,
  onDecrement,
  onIncrement,
}: Props) => {
  const minimum = useMemo(
    () => (isSession ? minimumSessionTime : minimumBreakTime),
    [isSession]
  );

  const maximum = useMemo(
    () => (isSession ? maximumSessionTime : maximumBreakTime),
    [isSession]
  );

  return (
    <div className="flex flex-col items-center gap-2 select-none">
      <h2 className="mb-1 font-bold">{title}</h2>
      <span className="box-border flex items-center justify-center text-6xl font-bold text-white">
        {time}
      </span>
      <div className="flex items-center gap-4">
        <div
          onClick={() => time > minimum && onDecrement()}
          className="flex items-center justify-center w-12 h-12 p-2 px-3 transition-all duration-300 border border-white rounded-full cursor-pointer active:bg-gray-600 hover:bg-gray-700"
        >
          <FaMinus />
        </div>

        <div
          onClick={() => time < maximum && onIncrement()}
          className="flex items-center justify-center w-12 h-12 p-2 px-3 transition-all duration-300 border border-white rounded-full cursor-pointer active:bg-gray-600 hover:bg-gray-700"
        >
          <FaPlus />
        </div>
      </div>
    </div>
  );
};

export default Timer;