import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import { Rating } from "./Rating";

describe("Rating", () => {
  test("1 star should match snapshot", () => {
    const { container } = render(<Rating rate={1} />);
    expect(container).toMatchSnapshot();
  });
  
  test("2 stars should match snapshot", () => {
    const { container } = render(<Rating rate={2} />);
    expect(container).toMatchSnapshot();
  });
  
  test("3 stars should match snapshot", () => {
    const { container } = render(<Rating rate={3} />);
    expect(container).toMatchSnapshot();
  });
});
