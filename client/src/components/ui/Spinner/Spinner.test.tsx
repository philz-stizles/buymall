import { render } from "@testing-library/react";
import Spinner from "./Spinner";

describe("Spinner Component", () => {
  it("should render correctly", () => {
    render(<Spinner />);

    const spinner = null;
    expect(spinner).toBeTruthy();
  });
});
