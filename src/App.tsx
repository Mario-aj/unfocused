import { BreakLength, SessionLength, Counter } from "./components";

function App() {
  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen gap-8">
      <div className="flex items-center gap-4 mb-3">
        <span>=================</span>
        <h1 className="text-4xl font-extrabold ">Unfocused</h1>
        <span>=================</span>
      </div>

      <div className="flex gap-52">
        <BreakLength />
        <SessionLength />
      </div>

      <Counter />
      <footer className="mt-8">
        <p className="flex flex-col items-center justify-center gap-2 ">
          Built by{" "}
          <a
            title="creator"
            aria-label="creator"
            href="https://github.com/Mario-aj"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 text-xl transition-all duration-300 hover:underline"
          >
            <img
              src="https://avatars.githubusercontent.com/u/57181054?v=4"
              alt="creator's img"
              width={50}
              className="rounded-full"
            />
          </a>
        </p>
      </footer>
    </div>
  );
}

export default App;
