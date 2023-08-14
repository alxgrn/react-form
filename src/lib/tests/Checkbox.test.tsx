import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Checkbox } from '../index';

describe('Checkbox', () => {

test('has correct label, hint, error, checked, disabled', () => {
    const label = 'Label text';
    const value = 'Value text';
    const bottom = 'Hint text';
    const onChange = jest.fn();
    render(
        <Checkbox
            id='id'
            label={label}
            value={value}
            bottom={bottom}
            onChange={onChange}
        />
    );
    const input = screen.getByRole('checkbox');
    expect(input).toBeInTheDocument();
    expect(input).not.toHaveAttribute('checked');
    expect(input).not.toBeDisabled();
    expect(screen.getByText(label)).toBeInTheDocument();
    expect(screen.getByText(bottom)).toBeInTheDocument();
});

test('has required mark and disabled option', () => {
    const onChange = jest.fn();
    const { container } = render(
        <Checkbox
            id='id'
            label='label'
            value='value'
            required={true}
            disabled={true}
            onChange={onChange}
        />
    );
    expect(container.querySelector('.RequiredMark')).toBeTruthy();
    expect(screen.getByRole('checkbox')).toBeDisabled();
});

test('has correct handling of onChange callback', async () => {
    let output_check = false;
    let output_value = '';
    const value = 'Value text';
    const onChange = jest.fn((check, value) => { output_check = check; output_value = value; });
    const user = userEvent.setup();
    render(
        <Checkbox
            id='id'
            label='label'
            value={value}
            onChange={onChange}
        />
    );
    const input = screen.getByRole('checkbox');
    expect(input).toBeInTheDocument();
    await user.click(input);
    expect(onChange).toBeCalledTimes(1);
    expect(output_check).toBe(true);
    expect(output_value).toBe(value);
});

test('has correct handling of disabled flag', async () => {
    const onChange = jest.fn();
    const user = userEvent.setup();
    render(
        <Checkbox
            id='id'
            label='label'
            value='value'
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
            value='value'
            onChange={onChange}
            checked={true}
        />
    );
    const input = screen.getByRole('checkbox');
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('checked');
});

}); // describe
