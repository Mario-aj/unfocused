import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { useSessionTime, useRun } from "src/hook";

import SessionLength from "../session-length";

jest.mock("src/hook", () => ({
  useSessionTime: jest.fn(),
  useRun: jest.fn(),
}));

const useSessionTimeMock = useSessionTime as jest.Mock;
const useRunMock = useRun as jest.Mock;

describe("SessionLength", () => {
  it("should render correctly", () => {
    useSessionTimeMock.mockImplementation(() => ({
      sessionTime: 25,
      onSessionTimeChange: jest.fn(),
    }));
    useRunMock.mockImplementation(() => ({ isRunning: false }));

    render(<SessionLength />);

    expect(screen.getByText(/Session Length/i)).toBeInTheDocument();
    expect(screen.getByText(/25/i)).toBeInTheDocument();
    expect(screen.getByTitle(/Increment/i)).toBeInTheDocument();
    expect(screen.getByTitle(/Decrement/i)).toBeInTheDocument();
  });

  it("should call Increment function correctly", () => {
    const onIncrement = jest.fn();
    useSessionTimeMock.mockImplementation(() => ({
      sessionTime: 25,
      onSessionTimeChange: onIncrement,
    }));
    useRunMock.mockImplementation(() => ({ isRunning: false }));

    render(<SessionLength />);

    const increment = screen.getByTitle(/Increment/i);

    userEvent.click(increment);
    expect(onIncrement).toHaveBeenCalledWith(26);
  });

  it("should call Decrement function correctly", () => {
    const onDecrement = jest.fn();
    useSessionTimeMock.mockImplementation(() => ({
      sessionTime: 25,
      onSessionTimeChange: onDecrement,
    }));
    useRunMock.mockImplementation(() => ({ isRunning: false }));

    render(<SessionLength />);

    const increment = screen.getByTitle(/Decrement/i);

    userEvent.click(increment);
    expect(onDecrement).toHaveBeenCalledWith(24);
  });
});
