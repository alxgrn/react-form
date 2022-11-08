import { render, screen } from '@testing-library/react';
import Legend from '../components/Legend';

describe('Legend', () => {

test('has correct legend', () => {
    const legend = 'Legend text';
    const { container } = render(<Legend legend={legend}/>);
    expect(screen.getByText(legend)).toBeInTheDocument();
    expect(container.getElementsByClassName('Form-required-mark').length).toBe(0);
});

test('has required mark', () => {
    const legend = 'Legend text';
    const { container } = render(<Legend legend={legend} required={true}/>);
    expect(screen.getByText(legend)).toBeInTheDocument();
    expect(container.getElementsByClassName('Form-required-mark').length).toBe(1);
});

test('has disabled class', () => {
    const legend = 'Legend text';
    const { container } = render(<Legend legend={legend} disabled={true}/>);
    expect(screen.getByText(legend)).toBeInTheDocument();
    expect(container.getElementsByClassName('disabled').length).toBe(1);
});

}); // describe
