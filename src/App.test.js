import { render, screen } from '@testing-library/react';
import App from './App';

test('Renders App Header', () => {
    render(<App />);
    const headerElement = screen.getByText(/React Form Test/i);
    expect(headerElement).toBeInTheDocument();
});
