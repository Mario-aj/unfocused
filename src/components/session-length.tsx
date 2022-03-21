import { Timer } from ".";
import { useSessionTime } from "../hook";

const SessionLength = () => {
  const { sessionTime, onSessionTimeChange } = useSessionTime();

  return (
    <Timer
      title="Session length"
      time={sessionTime}
      onDecrement={() => onSessionTimeChange(sessionTime - 1)}
      onIncrement={() => onSessionTimeChange(sessionTime + 1)}
    />
  );
};

export default SessionLength;
