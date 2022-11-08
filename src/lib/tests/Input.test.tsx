import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Input } from '../index';

describe('Input', () => {

test('has correct label, value, hint, error, placeholder, disabled', () => {
    const id = 'ID';
    const value = 'Value text';
    const label = 'Label text';
    const hint = 'Hint text';
    const error = 'Error text';
    const placeholder = 'Placeholder text';
    const onChange = jest.fn();
    const { container } = render(
        <Input
            id={id}
            value={value}
            label={label}
            hint={hint}
            error={error}
            placeholder={placeholder}
            onChange={onChange}
        />
    );
    const input = screen.getByRole('textbox');
    expect(input).toBeInTheDocument();
    expect(input).toHaveValue(value);
    expect(input).toHaveAttribute('type', 'text');
    expect(input).toHaveAttribute('placeholder', placeholder);
    expect(input).not.toBeDisabled();
    expect(screen.getByLabelText(label)).toBeInTheDocument();
    expect(screen.getByText(hint)).toBeInTheDocument();
    expect(screen.getByText(error)).toBeInTheDocument();
    expect(container.querySelector('.Form-required-mark')).toBeFalsy();
});

test('has required mark and disabled option', () => {
    const id = 'ID';
    const label = 'Label text';
    const value = 'Value text';
    const onChange = jest.fn();
    const { container } = render(
        <Input
            id={id}
            value={value}
            label={label}
            required={true}
            disabled={true}
            onChange={onChange}
        />
    );
    expect(container.querySelector('.Form-required-mark')).toBeTruthy();
    expect(screen.getByRole('textbox')).toBeDisabled();
});

test('has correct handling of onChange callback for text and password', async () => {
    let output = '';
    const id = 'ID';
    const value = 'Test value';
    const onChange = jest.fn(v => output += v);
    const user = userEvent.setup();
    render(
        <Input
            id={id}
            value=''
            onChange={onChange}
        />
    );
    const input = screen.getByRole('textbox');
    expect(input).toBeInTheDocument();
    await user.type(input, value);
    expect(onChange).toBeCalledTimes(value.length);
    expect(output).toBe(value);
});

test('has correct handling of onChange callback for textarea', async () => {
    let output = '';
    const id = 'ID';
    const value = 'Test value';
    const onChange = jest.fn(v => output += v);
    const user = userEvent.setup();
    render(
        <Input
            id={id}
            type='textarea'
            value=''
            onChange={onChange}
        />
    );
    const input = screen.getByRole('textbox');
    expect(input).toBeInTheDocument();
    await user.type(input, value);
    expect(onChange).toBeCalledTimes(value.length);
    expect(output).toBe(value);
});

test('has correct handling of limit', async () => {
    let output = '';
    const id = 'ID';
    const limit = 3;
    const value = 'Test value';
    const onChange = jest.fn(v => output = v);
    const user = userEvent.setup();
    render(
        <Input
            id={id}
            limit={limit}
            value={value}
            onChange={onChange}
        />
    );
    const input = screen.getByRole('textbox');
    expect(input).toBeInTheDocument();
    await user.type(input, value);
    expect(output).toBe(value.substring(0, limit));
});

test('has correct handling of type equal to \"password\"', () => {
    const onChange = jest.fn();
    const type = 'password';
    const value = '1234567';
    render(
        <Input
            id='ID'
            type={type}
            value={value}
            label={value}
            onChange={onChange}
        />
    );
    const input = screen.getByLabelText(value);
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('type', type);
    expect(input).toHaveValue(value);
});

test('has correct handling of type equal to \"textarea\"', () => {
    const onChange = jest.fn();
    const type = 'textarea';
    const rows = 7;
    const value = 'Lorem ipsum dolor sit amet...';
    render(
        <Input
            id='ID'
            rows={rows}
            type={type}
            value={value}
            onChange={onChange}
        />
    );
    const input = screen.getByRole('textbox');
    expect(input).toBeInTheDocument();
    expect(input).toHaveValue(value);
    expect(input).toHaveAttribute('rows', rows+"");
});

}); // describe
