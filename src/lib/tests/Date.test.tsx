import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Date } from '../index';

describe('Date', () => {

test('DatePicker appears when clicked in a component and disappear when clicked in a day and has correct value', async () => {
    let output;
    const id = 'ID';
    const labelText = 'Label text';
    const value = '01.01.2023';
    const onChange = jest.fn(v => output = v);
    const user = userEvent.setup();
    const { container } = render(
        <Date
            id={id}
            value={value}
            label={labelText}
            onChange={onChange}
        />
    );
    const label = screen.getByText(labelText);
    expect(label).toBeInTheDocument();
    await user.click(label);
    expect(container.getElementsByClassName('FormDatePicker').length).toBe(1);
    const day = screen.getByText('1');
    expect(day).toBeInTheDocument();
    await user.click(day);
    expect(container.getElementsByClassName('FormDatePicker').length).toBe(0);
    expect(onChange).toBeCalledTimes(1);
    expect(onChange).toBeCalledWith(value);
    expect(output).toBe(value);
});

test('DatePicker disappears when pressing Esc', async () => {
    const id = 'ID';
    const labelText = 'Label text';
    const value = '01.01.2023';
    const onChange = jest.fn();
    const user = userEvent.setup();
    const { container } = render(
        <Date
            id={id}
            value={value}
            label={labelText}
            onChange={onChange}
        />
    );
    const label = screen.getByText(labelText);
    expect(label).toBeInTheDocument();
    await user.click(label);
    expect(container.getElementsByClassName('FormDatePicker').length).toBe(1);
    fireEvent.keyDown(label, {
        key: "Escape",
        code: "Escape",
        keyCode: 27,
        charCode: 27
    });
    expect(container.getElementsByClassName('FormDatePicker').length).toBe(0);
});

test('DatePicker disappears when pressing Enter', async () => {
    const id = 'ID';
    const labelText = 'Label text';
    const value = '01.01.2023';
    const onChange = jest.fn();
    const user = userEvent.setup();
    const { container } = render(
        <Date
            id={id}
            value={value}
            label={labelText}
            onChange={onChange}
        />
    );
    const label = screen.getByText(labelText);
    expect(label).toBeInTheDocument();
    await user.click(label);
    expect(container.getElementsByClassName('FormDatePicker').length).toBe(1);
    fireEvent.keyDown(label, {
        key: "Enter",
        code: "Enter",
        keyCode: 13,
        charCode: 13
    });
    expect(container.getElementsByClassName('FormDatePicker').length).toBe(0);
});

test('DatePicker does not appear on click in a disabled component', async () => {
    const id = 'ID';
    const labelText = 'Label text';
    const value = '';
    const onChange = jest.fn();
    const user = userEvent.setup();
    const { container } = render(
        <Date
            id={id}
            value={value}
            label={labelText}
            onChange={onChange}
            disabled={true}
        />
    );
    const label = screen.getByText(labelText);
    expect(label).toBeInTheDocument();
    await user.click(label);
    expect(container.getElementsByClassName('FormDatePicker').length).toBe(0);
});

test('has correct handling of onChange callback', async () => {
    let output ='';
    const id = 'ID';
    const labelText = 'Label text';
    const value = '01.01.2023';
    const onChange = jest.fn(v => output += v);
    const user = userEvent.setup();
    const { container } = render(
        <Date
            id={id}
            value=''
            label={labelText}
            onChange={onChange}
        />
    );
    const input = screen.getByRole('textbox');
    expect(input).toBeInTheDocument();
    await user.type(input, value);
    expect(onChange).toBeCalledTimes(value.length);
    expect(output).toBe(value);
});

}); // describe
