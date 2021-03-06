import { ReactNode, useCallback, useState } from "react";
import { createContext } from "use-context-selector";
import { toast } from "react-toastify";

const alarm = require("src/assets/alarm.mp3");

type Context = {
  sessionTime: number;
  breakTime: number;
  isRunning: boolean;
  onBreakTimeChange: (value: number) => void;
  onSessionTimeChange: (value: number) => void;
  onRunningChange: (value: boolean) => void;
  onSessionEnds: () => void;
};

const TimeCounterContext = createContext<Context>({
  sessionTime: 25,
  breakTime: 5,
  isRunning: false,
  onBreakTimeChange: () => {},
  onSessionTimeChange: () => {},
  onRunningChange: () => {},
  onSessionEnds: () => {},
});

const TimeCounterProvider = ({ children }: { children: ReactNode }) => {
  const [sessionTime, setSessionTime] = useState(25);
  const [breakTime, setBreakTime] = useState(5);
  const [isRunning, setIsRunning] = useState(false);

  const onBreakTimeChange = useCallback((value: number) => {
    setBreakTime(value);
  }, []);

  const onSessionTimeChange = useCallback((value: number) => {
    setSessionTime(value);
  }, []);

  const onRunningChange = useCallback((value: boolean) => {
    setIsRunning(value);
  }, []);

  const onSessionEnds = useCallback(() => {
    onRunningChange(false);
    const audio = new Audio(alarm);
    audio.play();
    toast.info("It's break time");
  }, [onRunningChange]);

  return (
    <TimeCounterContext.Provider
      value={{
        sessionTime,
        breakTime,
        onBreakTimeChange,
        onSessionTimeChange,
        isRunning,
        onRunningChange,
        onSessionEnds,
      }}
    >
      {children}
    </TimeCounterContext.Provider>
  );
};

export { TimeCounterContext };
export default TimeCounterProvider;
