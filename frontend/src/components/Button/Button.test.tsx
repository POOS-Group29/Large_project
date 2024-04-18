import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import { Button } from "./Button";

describe("Button", () => {
  test("should match snapshot", () => {
    const { container } = render(<Button />);
    expect(container).toMatchSnapshot();
  });

  test("should have spinner and text if isLoading is true", () => {
    const text = "Click me";
    const { container } = render(<Button isLoading>{text}</Button>);
    expect(container).toMatchSnapshot();
    expect(
      container.querySelector("[data-testid='spinner']")
    ).toBeInTheDocument();
    expect(
      container.querySelector("[data-testid='button-text']")
    ).toHaveTextContent(text);
  });

  test("should have text if isLoading is false", () => {
    const text = "Click me";
    const { container } = render(<Button>{text}</Button>);
    expect(container).toMatchSnapshot();
    expect(
      container.querySelector("[data-testid='spinner']")
    ).not.toBeInTheDocument();
    expect(
      container.querySelector("[data-testid='button-text']")
    ).toHaveTextContent(text);
  });
});
