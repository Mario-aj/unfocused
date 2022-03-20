import { Timer } from ".";
import { useBreakTime } from "../hook";

const BreakLength = () => {
  const { breakTime, onBreakTimeChange } = useBreakTime();

  return (
    <Timer
      title="Break length"
      time={breakTime}
      onDecrement={() => onBreakTimeChange(breakTime - 1)}
      onIncrement={() => onBreakTimeChange(breakTime + 1)}
    />
  );
};

export default BreakLength;
