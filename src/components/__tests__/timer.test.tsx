import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Timer from "../timer";
import { useRun } from "../../hook";

jest.mock("../../hook", () => ({
  useRun: jest.fn(),
}));
const useRunMock = useRun as jest.Mock;

describe("Timer", () => {
  it("should render correctly", () => {
    useRunMock.mockImplementation(() => ({ isRunning: false }));

    render(
      <Timer
        time={5}
        title="Timer test"
        onDecrement={() => {}}
        onIncrement={() => {}}
      />
    );

    expect(screen.getByText("Timer test")).toBeInTheDocument();
    expect(screen.getByText("5")).toBeInTheDocument();
    expect(screen.getAllByRole("button").length).toBe(2);
  });

  it("should call onDecrement and onIncrement functions", () => {
    useRunMock.mockImplementation(() => ({ isRunning: false }));
    const onDecrement = jest.fn();
    const onIncrement = jest.fn();

    render(
      <Timer
        time={5}
        title="Timer test"
        onDecrement={onDecrement}
        onIncrement={onIncrement}
      />
    );

    userEvent.click(screen.getByTitle("Decrement"));
    expect(onDecrement).toHaveBeenCalled();

    userEvent.click(screen.getByTitle("Increment"));
    expect(onIncrement).toHaveBeenCalled();
  });

  it("should disable buttons when timer is running", () => {
    useRunMock.mockImplementation(() => ({ isRunning: true }));

    render(
      <Timer
        time={5}
        title="Timer test"
        onDecrement={() => {}}
        onIncrement={() => {}}
      />
    );

    expect(screen.getByTitle("Decrement")).toBeDisabled();
    expect(screen.getByTitle("Increment")).toBeDisabled();
  });
});
