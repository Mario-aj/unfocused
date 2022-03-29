import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { useRun, useSessionTime } from "src/hook";

import Counter from "../counter";

jest.mock("src/hook", () => ({
  useRun: jest.fn(),
  useSessionTime: jest.fn(),
}));

const useRunMock = useRun as jest.Mock;
const useSessionTimeMock = useSessionTime as jest.Mock;

beforeEach(jest.clearAllMocks);

describe("Counter", () => {
  it("should render correctly", () => {
    useSessionTimeMock.mockImplementation(() => ({
      sessionTime: 10,
      onSessionEnds: jest.fn(),
    }));
    useRunMock.mockImplementation(() => ({
      onRunningChange: jest.fn(),
    }));
    render(<Counter />);

    expect(
      screen.getByRole("heading", { name: /Session/i })
    ).toBeInTheDocument();
    expect(screen.getByTitle("time")).toHaveTextContent("10:00");
    expect(screen.getByRole("button", { name: /Start/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Reset/i })).toBeInTheDocument();
  });

  it("should start running when click on button start", async () => {
    const onRunningChange = jest.fn();
    useRunMock.mockImplementation(() => ({
      onRunningChange,
    }));
    useSessionTimeMock.mockImplementation(() => ({
      sessionTime: 15,
      onSessionEnds: jest.fn(),
    }));

    render(<Counter />);

    userEvent.click(screen.getByRole("button", { name: /Start/i }));
    expect(onRunningChange).toHaveBeenCalledWith(true);
    expect(screen.getByRole("button", { name: /Pause/i })).toBeInTheDocument();
  });

  it("should reset counter when click on reset button", async () => {
    const onRunningChange = jest.fn();
    useRunMock.mockImplementation(() => ({
      onRunningChange,
      isRunning: true,
    }));
    useSessionTimeMock.mockImplementation(() => ({
      sessionTime: 15,
      onSessionEnds: jest.fn(),
    }));

    function delay(ms: number) {
      return new Promise((resolve) => setTimeout(resolve, ms));
    }

    render(<Counter />);
    await act(async () => delay(1000) as Promise<void>);
    expect(screen.getByTitle("time")).toHaveTextContent("14:59");

    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(async () => {
      userEvent.click(screen.getByRole("button", { name: /Reset/i }));
      await delay(1000);
    });
    expect(onRunningChange).toHaveBeenCalledWith(false);
    expect(screen.getByTitle("time")).toHaveTextContent("15:00");
  });
});
