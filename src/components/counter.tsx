import { useCallback, useEffect, useMemo, useState } from "react";
import { FaPlay, FaPause } from "react-icons/fa";

import { useRun, useSessionTime } from "../hook";

const alarm = require("../assets/alarm.mp3");

const initialValue = (value: number) => {
  const newValue = value < 10 ? "0" + value : value;

  return `${newValue}:00`;
};

const Counter = () => {
  const { onRunningChange, isRunning } = useRun();
  const { sessionTime } = useSessionTime();
  const [time, setTime] = useState(() => initialValue(sessionTime));
  const Icon = useMemo(() => (isRunning ? FaPause : FaPlay), [isRunning]);

  const addZeroAtBeginning = useCallback((n) => (n < 10 ? `0${n}` : n), []);

  const handleReset = useCallback(() => {
    setTime(() => initialValue(sessionTime));
    onRunningChange(false);
  }, [sessionTime, onRunningChange]);

  useEffect(() => {
    setTime(() => initialValue(sessionTime));
  }, [sessionTime]);

  useEffect(() => {
    if (isRunning) {
      const interval = setInterval(() => {
        const [minutes, seconds] = time.split(":").map((t) => parseInt(t));
        if (seconds === 0) {
          if (minutes === 0) {
            const audio = new Audio(alarm);
            audio.play();
            onRunningChange(false);
            return;
          }
          setTime(`${addZeroAtBeginning(minutes - 1)}:59`);
        } else {
          setTime(
            `${addZeroAtBeginning(minutes)}:${addZeroAtBeginning(seconds - 1)}`
          );
        }
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [time, isRunning, addZeroAtBeginning, onRunningChange]);

  return (
    <div className="flex flex-col items-center justify-center gap-4 mb-4">
      <div className="flex flex-col items-center justify-center w-56 h-56 gap-6 p-2 border-4 border-gray-400 rounded-full">
        <h2 className="mb-1 text-2xl font-extrabold">Session</h2>
        <strong className="text-5xl font-extrabold">{time}</strong>
      </div>
      <div className="flex items-center gap-4">
        <div
          onClick={() => onRunningChange(!isRunning)}
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
