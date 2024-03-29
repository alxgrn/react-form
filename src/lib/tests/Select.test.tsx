import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Select, SelectOption } from '../components/select/Select';

const options: SelectOption[] = [
    { value: 'one', option: 'one' },
    { value: 'two', option: 'two', disabled: true },
];

describe('Select', () => {

test('has correct label, value, top, bottom, placeholder, disabled', () => {
    const label = 'Label text';
    const top = 'Top text';
    const bottom = 'Bottom text';
    const placeholder = 'Placeholder text';
    const onChange = jest.fn();
    render(
        <Select
            id='id'
            value={options[0].value}
            options={options}
            label={label}
            top={top}
            bottom={bottom}
            placeholder={placeholder}
            onChange={onChange}
        />
    );
    const input = screen.getByRole('combobox');
    expect(input).toBeInTheDocument();
    expect(input).toHaveValue(options[0].value);
    expect(input).not.toBeDisabled();
    expect(screen.getByText(label)).toBeInTheDocument();
    expect(screen.getByText(top)).toBeInTheDocument();
    expect(screen.getByText(bottom)).toBeInTheDocument();
    const option = screen.getAllByRole('option');
    expect(option).toHaveLength(options.length + 1);
    expect(option[0]).toHaveTextContent(placeholder);
    expect(option[1]).toHaveTextContent(options[0].option);
    expect(option[1]).toHaveAttribute('value', options[0].value);
    expect((option[1] as HTMLOptionElement).selected).toBe(true);
    expect(option[2]).toBeDisabled();
});

test('has required mark and disabled option', () => {
    const label = 'Label text';
    const onChange = jest.fn();
    const { container } = render(
        <Select
            id='id'
            value={options[0].value}
            options={options}
            label={label}
            required={true}
            disabled={true}
            onChange={onChange}
        />
    );
    expect(container.querySelector('.RequiredMark')).toBeTruthy();
    expect(screen.getByRole('combobox')).toBeDisabled();
});

test('has correct handling of onChange callback', async () => {
    const onChange = jest.fn();
    const user = userEvent.setup();
    render(
        <Select
            id='id'
            value=''
            options={options}
            onChange={onChange}
        />
    );
    const select = screen.getByRole('combobox');
    const option = screen.getByRole('option', { name: options[0].option });
    await user.selectOptions(select, option);
    expect(onChange).toBeCalledWith(options[0].option);
});

}); // describe
