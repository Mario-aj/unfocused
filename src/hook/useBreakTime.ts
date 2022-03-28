import { useContextSelector } from "use-context-selector";
import { TimeCounterContext } from "src/context/time-counter";

const useBreakTime = () => {
  const breakTime = useContextSelector(
    TimeCounterContext,
    (ctx) => ctx.breakTime
  );
  const onBreakTimeChange = useContextSelector(
    TimeCounterContext,
    (ctx) => ctx.onBreakTimeChange
  );

  return {
    breakTime,
    onBreakTimeChange,
  };
};

export default useBreakTime;
