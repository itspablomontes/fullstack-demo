import { render, screen } from "@testing-library/react";

function HelloWorld() {
  return <h1>Hello World</h1>;
}

describe("HelloWorld", () => {
  it("renders a heading", () => {
    render(<HelloWorld />);
    expect(screen.getByRole("heading")).toHaveTextContent("Hello World");
  });
});
