import { render, screen } from '@testing-library/react'
import Input from "./Input";
import userEvent from '@testing-library/user-event';

describe('Input Component', () => {
    // it("should render with a placeholder text", () => {
    //   render(<Input placeholder='Enter your email' />);

    //   const inputWithPlaceholder =
    //     screen.getByPlaceholderText(/Enter your email/i);
      
    //     // Assert.
    //   expect(inputWithPlaceholder).toHaveValue("Enter your email");
    // });

     it("should render with a placeholder and have value when typed", () => {
        // Arrange.
       render(<Input placeholder="Enter your email" />);

       // Act.
       const inputWithPlaceholder =
         screen.getByPlaceholderText(/Enter your email/i);
       userEvent.type(inputWithPlaceholder, "name@mail.com");

       // Assert.
       expect(inputWithPlaceholder).toHaveValue("name@mail.com");
     });

    it("should render with a label", () => {
        // Arrange.
      render(<Input label="Email" />);
      const inputWithLabel = screen.getByLabelText(/Email/i);

      // Assert.
      expect(inputWithLabel).toBeInTheDocument();
    });
})