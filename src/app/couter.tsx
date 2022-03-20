import { useCallback, useEffect, useMemo, useState } from "react";
import { FaPlay, FaPause } from "react-icons/fa";

const Counter = () => {
  const [time, setTime] = useState("01:00");
  const [isRunning, setIsRunning] = useState(false);
  const Icon = useMemo(() => (isRunning ? FaPause : FaPlay), [isRunning]);

  const addZero = useCallback((n) => (n < 10 ? `0${n}` : n), []);
  const handleReset = useCallback(() => {
    setTime("01:00");
    setIsRunning(false);
  }, []);

  useEffect(() => {
    if (isRunning) {
      const interval = setInterval(() => {
        const [minutes, seconds] = time.split(":").map((t) => parseInt(t));
        if (seconds === 0) {
          if (minutes === 0) {
            setIsRunning(false);
            return;
          }
          setTime(`${addZero(minutes - 1)}:59`);
        } else {
          setTime(`${addZero(minutes)}:${addZero(seconds - 1)}`);
        }
      }, 500);
      return () => clearInterval(interval);
    }
  }, [time, isRunning, addZero]);

  return (
    <div className="flex flex-col items-center justify-center gap-4 mb-4">
      <div className="flex flex-col items-center justify-center w-56 h-56 gap-6 p-2 border-4 border-gray-400 rounded-full">
        <h2 className="mb-1 text-2xl font-extrabold">Session</h2>
        <strong className="text-5xl font-extrabold">{time}</strong>
      </div>
      <div className="flex items-center gap-4">
        <div
          onClick={() => setIsRunning((r) => !r)}
          className="flex items-center justify-center w-12 h-12 p-2 px-3 transition-all duration-300 border border-white rounded-full cursor-pointer active:bg-gray-600 hover:bg-gray-700"
        >
          <Icon />
        </div>
        <div
          onClick={handleReset}
          className="flex items-center justify-center w-12 h-12 p-2 px-3 transition-all duration-300 border border-white rounded-full cursor-pointer active:bg-gray-600 hover:bg-gray-700"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default Counter;
