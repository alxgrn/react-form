import { render } from '@testing-library/react';
import RequiredMark from '../components/RequiredMark';

describe('RequiredMark', () => {

test('has correct reaction on required = true', () => {
    const { container } = render(<RequiredMark required={true}/>);
    expect(container.getElementsByClassName('FormRequiredMark').length).toBe(1);
});

test('has correct reaction on required = false', () => {
    const { container } = render(<RequiredMark required={false}/>);
    expect(container.getElementsByClassName('FormRequiredMark').length).toBe(0);
});

}); // describe
