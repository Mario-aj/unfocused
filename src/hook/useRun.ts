import { useContextSelector } from "use-context-selector";
import { TimeCounterContext } from "../context/time-counter";

const useRun = () => {
  const isRunning = useContextSelector(
    TimeCounterContext,
    (ctx) => ctx.isRunning
  );
  const onRunningChange = useContextSelector(
    TimeCounterContext,
    (ctx) => ctx.onRunningChange
  );

  return {
    isRunning,
    onRunningChange,
  };
};

export default useRun;
