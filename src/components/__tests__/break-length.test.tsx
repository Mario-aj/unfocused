import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { useBreakTime, useRun } from "src/hook";

import BreakLength from "../break-length";

jest.mock("src/hook", () => ({
  useBreakTime: jest.fn(),
  useRun: jest.fn(),
}));

const useBreakTimeMock = useBreakTime as jest.Mock;
const useRunMock = useRun as jest.Mock;

describe("BreakLength", () => {
  it("should render correctly", () => {
    useBreakTimeMock.mockImplementation(() => ({
      breakTime: 5,
      onBreakTimeChange: jest.fn(),
    }));
    useRunMock.mockImplementation(() => ({ isRunning: false }));

    render(<BreakLength />);

    expect(screen.getByText(/Break Length/i)).toBeInTheDocument();
    expect(screen.getByText(/5/i)).toBeInTheDocument();
    expect(screen.getByTitle(/Increment/i)).toBeInTheDocument();
    expect(screen.getByTitle(/Decrement/i)).toBeInTheDocument();
  });

  it("should call Increment function correctly", () => {
    const onIncrement = jest.fn();
    useBreakTimeMock.mockImplementation(() => ({
      breakTime: 5,
      onBreakTimeChange: onIncrement,
    }));
    useRunMock.mockImplementation(() => ({ isRunning: false }));

    render(<BreakLength />);

    const increment = screen.getByTitle(/Increment/i);

    userEvent.click(increment);
    expect(onIncrement).toHaveBeenCalledWith(6);
  });

  it("should call Decrement function correctly", () => {
    const onDecrement = jest.fn();
    useBreakTimeMock.mockImplementation(() => ({
      breakTime: 5,
      onBreakTimeChange: onDecrement,
    }));
    useRunMock.mockImplementation(() => ({ isRunning: false }));

    render(<BreakLength />);

    const increment = screen.getByTitle(/Decrement/i);

    userEvent.click(increment);
    expect(onDecrement).toHaveBeenCalledWith(4);
  });
});
