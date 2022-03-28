import { useContextSelector } from "use-context-selector";
import { TimeCounterContext } from "src/context/time-counter";

const useSessionTime = () => {
  const sessionTime = useContextSelector(
    TimeCounterContext,
    (ctx) => ctx.sessionTime
  );
  const onSessionTimeChange = useContextSelector(
    TimeCounterContext,
    (ctx) => ctx.onSessionTimeChange
  );

  const onSessionEnds = useContextSelector(
    TimeCounterContext,
    (ctx) => ctx.onSessionEnds
  );

  return {
    sessionTime,
    onSessionTimeChange,
    onSessionEnds,
  };
};

export default useSessionTime;
