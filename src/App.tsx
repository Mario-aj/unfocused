import { useState } from "react";
import { Counter } from "./app";
import { Timer } from "./app";

function App() {
  const [breakTime, setBreakTime] = useState(5);
  const [sessionTime, setSessionTime] = useState(25);

  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen gap-8">
      <div className="flex items-center gap-4 mb-3">
        <span>====================</span>
        <h1 className="text-4xl font-extrabold ">Unfocused</h1>
        <span>====================</span>
      </div>

      <div className="flex gap-52">
        <Timer
          title="Break length"
          time={breakTime}
          onDecrement={() => setBreakTime((t) => t - 1)}
          onIncrement={() => setBreakTime((t) => t + 1)}
        />
        <Timer
          title="Session length"
          time={sessionTime}
          onDecrement={() => setSessionTime((t) => t - 1)}
          onIncrement={() => setSessionTime((t) => t + 1)}
          isSession
        />
      </div>

      <Counter />
      <footer className="mt-8">
        <span>
          Built by{" "}
          <a
            href="https://github.com/Mario-aj"
            target="_blank"
            rel="noreferrer"
            className="text-xl transition-all duration-300 hover:underline"
          >
            Mário Jorge
          </a>
        </span>
      </footer>
    </div>
  );
}

export default App;
