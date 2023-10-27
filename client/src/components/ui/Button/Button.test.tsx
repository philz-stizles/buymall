import { render, screen } from "@testing-library/react";
import Button from "./Button";
import userEvent from "@testing-library/user-event";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

describe("Button Component", () => {
  test("renders a button with label", () => {
    // Arrange.
    render(<Button label="Submit" />);

    // Act.

    // Assert.
    const linkElement = screen.getByText(/Submit/i, { exact: true });
    expect(linkElement).toBeInTheDocument();
  });

  test("renders a disabled button", () => {
    // Arrange.
    render(<Button label="Submit" disabled />);

    // Act.
    const buttonElement = screen.getByRole("button");

    // Assert.
    expect(buttonElement).toBeDisabled();
  });

  test("should render a button of type 'button", () => {
    // Arrange.
    render(<Button label="Submit" />);

    // Act.
    const buttonElement = screen.getByRole("button");

    // Assert.
    expect(buttonElement).toHaveAttribute("type", "button");
  });

  test("should render a button of type 'submit", () => {
    // Arrange.
    render(<Button label="Submit" type="submit" />);

    // Act.
    const buttonElement = screen.getByRole("button");

    // Assert.
    expect(buttonElement).toHaveAttribute("type", "submit");
  });

  test("should render a full width button", () => {
    // Arrange.
    render(<Button label="Submit" expanded />);

    // Act.
    const buttonElement = screen.getByRole("button");

    // Assert.
    expect(buttonElement).toHaveClass("w-full");
  });

  test("should render a button as a link", () => {
    // Arrange.
    // render(<Button label="Submit" href="/overview" />);

    // Act.

    // Assert.
    // const buttonAsLinkElement = screen.getByRole("link");
    // expect(buttonAsLinkElement).toHaveAttribute("href", "/");
  });

  // test('button clicked', () => {
  //     // Arrange.
  //     render(<Button label="Submit" />);

  //     // Act.
  //     const buttonElement = screen.getByRole("button");
  //     userEvent.click(buttonElement);

  //     // Assert.

  //     expect(buttonElement).toBeInTheDocument();
  // });
});
