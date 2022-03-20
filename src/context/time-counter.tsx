import { ReactNode, useCallback, useState } from "react";
import { createContext } from "use-context-selector";

type Context = {
  sessionTime: number;
  breakTime: number;
  onBreakTimeChange: (value: number) => void;
  onSessionTimeChange: (value: number) => void;
};

const TimeCounterContext = createContext<Context>({
  sessionTime: 25,
  breakTime: 5,
  onBreakTimeChange: () => {},
  onSessionTimeChange: () => {},
});

const TimeCounterProvider = ({ children }: { children: ReactNode }) => {
  const [sessionTime, setSessionTime] = useState(25);
  const [breakTime, setBreakTime] = useState(5);

  const onBreakTimeChange = useCallback((value: number) => {
    setBreakTime(value);
  }, []);

  const onSessionTimeChange = useCallback((value: number) => {
    setSessionTime(value);
  }, []);

  return (
    <TimeCounterContext.Provider
      value={{
        sessionTime,
        breakTime,
        onBreakTimeChange,
        onSessionTimeChange,
      }}
    >
      {children}
    </TimeCounterContext.Provider>
  );
};

export { TimeCounterContext };
export default TimeCounterProvider;
