import { render, screen, within } from '@testing-library/react';
import SignupForm from './SignupForm';
import userEvent from '@testing-library/user-event';

describe('SignupForm Component', () => {
  it('should display form inputs', () => {
    //
    render(<SignupForm onClose={() => {}} />);

    const inputs = screen.getAllByRole('textbox');

    // Action.
    // No action

    // Assert
    expect(inputs).toHaveLength(2);
  });

  it('should display two(2) buttons', () => {
    //
    render(<SignupForm onClose={() => {}} />);

    const formElement = screen.getByRole('form');
    const formButtons = within(formElement).getAllByRole('button');

    // Action.
    // No action

    // Assert
    expect(formButtons).toHaveLength(2);
  });

  it('should render disabled save button if required input is invalid', () => {
    //
    render(<SignupForm onClose={() => {}} />);

    const formElement = screen.getByRole('form');
    const formButton = within(formElement).getByRole('button', {
      name: /save/i,
    });

    // Action.
    // No action

    // Assert
    expect(formButton).toBeDisabled();
  });

  it('should call handleSubmit when the form is submitted', () => {
    //
    render(<SignupForm onClose={() => {}} />);

    const nameInput = screen.getByRole('textbox', { name: /name/i });
    const descInput = screen.getByRole('textbox', { name: /description/i });
    const saveButton = screen.getByRole('button', { name: /save/i });

    // Action.
    userEvent.click(nameInput);
    userEvent.keyboard('Shoes');

    userEvent.click(descInput);
    userEvent.keyboard('All types of shoes');

    userEvent.click(saveButton);

    // Assert
  });

  // it('should clear all inputs after the form is submitted', () => {
  //   //
  //   // handleSubmit = jest.fn();

  //   render(<SignupForm onClose={() => {}} />);

  //   const nameInput = screen.getByRole('textbox', { name: /name/i });
  //   const descriptionInput = screen.getByRole('textbox', {
  //     name: /description/i,
  //   });

  //   // Action.
  //   userEvent.click(nameInput);
  //   userEvent.keyboard('Shoes');

  //   userEvent.click(descriptionInput);
  //   userEvent.keyboard('All types of shoes');

  //   const formElement = screen.getByRole('form');
  //   fireEvent.submit(formElement!);

  //   // Assert
  //   expect(nameInput).toHaveValue('');
  //   expect(descriptionInput).toHaveValue('');
  // });
});
