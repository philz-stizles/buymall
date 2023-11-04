import { render, screen } from '@testing-library/react';
import Badge from './Badge';

describe('Badge Component', () => {
  it('should have a value', () => {
    // Arrange.
    render(<Badge value="New" />);

    // Act.

    // Assert.
    const linkElement = screen.getByText('New');
    expect(linkElement).toBeInTheDocument();
  });
});