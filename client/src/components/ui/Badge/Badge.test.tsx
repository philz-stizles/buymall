import { render, screen } from '@testing-library/react';
import Badge from './Badge';

test('renders learn react link', () => {
    // Arrange.
    render(<Badge value="New" />);

    // Act.

    // Assert.
    const linkElement = screen.getByText(/New/i);
    expect(linkElement).toBeInTheDocument();
});