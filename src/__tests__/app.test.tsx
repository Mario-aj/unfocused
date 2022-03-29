import { render, screen } from "@testing-library/react";

import App from "src/App";

describe("App", () => {
  it("should render", () => {
    render(<App />);

    expect(
      screen.getByRole("heading", { name: /Unfocused/i })
    ).toBeInTheDocument();
    expect(screen.getByText(/break length/i)).toBeInTheDocument();
    expect(screen.getByText(/session length/i)).toBeInTheDocument();
    expect(screen.getByTitle("time")).toBeInTheDocument();
    expect(screen.getByText(/built by/i)).toBeInTheDocument();
    screen.getByRole("img", {
      name: /creator's img/i,
    });
  });
});
