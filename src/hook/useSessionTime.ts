import { useContextSelector } from "use-context-selector";
import { TimeCounterContext } from "../context/time-counter";

const useSessionTime = () => {
  const sessionTime = useContextSelector(
    TimeCounterContext,
    (ctx) => ctx.sessionTime
  );
  const onSessionTimeChange = useContextSelector(
    TimeCounterContext,
    (ctx) => ctx.onSessionTimeChange
  );

  return {
    sessionTime,
    onSessionTimeChange,
  };
};

export default useSessionTime;
