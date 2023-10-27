import { render } from "@testing-library/react";
import Loader from "./Loader";

describe("Loader Component", () => {
  it("should render correctly", () => {
    render(<Loader />);

    const loader = null;
    expect(loader).toBeTruthy();
  });
});
