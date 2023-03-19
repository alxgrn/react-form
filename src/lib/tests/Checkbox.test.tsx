import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Checkbox } from '../index';

describe('Checkbox', () => {

test('has correct label, hint, error, checked, disabled', () => {
    const label = 'Label text';
    const hint = 'Hint text';
    const error = 'Error text';
    const onChange = jest.fn();
    render(
        <Checkbox
            id='id'
            label={label}
            hint={hint}
            error={error}
            onChange={onChange}
        />
    );
    const input = screen.getByRole('checkbox');
    expect(input).toBeInTheDocument();
    expect(input).not.toHaveAttribute('checked');
    expect(input).not.toBeDisabled();
    expect(screen.getByText(label)).toBeInTheDocument();
    expect(screen.getByText(hint)).toBeInTheDocument();
    expect(screen.getByText(error)).toBeInTheDocument();
});

test('has required mark and disabled option', () => {
    const onChange = jest.fn();
    const { container } = render(
        <Checkbox
            id='id'
            label='label'
            required={true}
            disabled={true}
            onChange={onChange}
        />
    );
    expect(container.querySelector('.FormRequiredMark')).toBeTruthy();
    expect(screen.getByRole('checkbox')).toBeDisabled();
});

test('has correct handling of onChange callback', async () => {
    let output = false;
    const onChange = jest.fn(v => output = v);
    const user = userEvent.setup();
    render(
        <Checkbox
            id='id'
            label='label'
            onChange={onChange}
        />
    );
    const input = screen.getByRole('checkbox');
    expect(input).toBeInTheDocument();
    await user.click(input);
    expect(onChange).toBeCalledTimes(1);
    expect(output).toBe(true);
});

test('has correct handling of disabled flag', async () => {
    const onChange = jest.fn();
    const user = userEvent.setup();
    render(
        <Checkbox
            id='id'
            label='label'
            onChange={onChange}
            disabled={true}
        />
    );
    const input = screen.getByRole('checkbox');
    expect(input).toBeInTheDocument();
    await user.click(input);
    expect(onChange).toBeCalledTimes(0);
});

test('has correct handling of checked flag', async () => {
    const onChange = jest.fn();
    render(
        <Checkbox
            id='id'
            label='label'
            onChange={onChange}
            checked={true}
        />
    );
    const input = screen.getByRole('checkbox');
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('checked');
});

}); // describe
