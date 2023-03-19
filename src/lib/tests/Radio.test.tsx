import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Radio, RadioOption } from '../components/Radio';

const options: RadioOption[] = [
    { value: 'one', label: 'One', hint: 'hint' },
    { value: 'two', label: 'Two', disabled: true },
    { value: 'three', label: 'Three', error: 'error', required: true },
];

describe('Radio', () => {

test('has correct label, value, hint, error, disabled, required', () => {
    const onChange = jest.fn();
    const { container } = render(
        <Radio
            id='id'
            value={options[0].value}
            options={options}
            onChange={onChange}
        />
    );
    const radio = screen.getAllByRole('radio');
    expect(radio).toHaveLength(options.length);
    expect(radio[0]).toHaveAttribute('value', options[0].value);
    expect(radio[0]).not.toBeDisabled();
    expect(radio[1]).toBeDisabled();

    const label = container.querySelectorAll('label');
    expect(label).toHaveLength(options.length);
    expect(label[0]).toHaveTextContent(options[0].hint as string);
    expect(label[1]).toHaveTextContent(options[1].label);
    expect(label[1].querySelector('.FormRequiredMark')).toBeFalsy();
    expect(label[2]).toHaveTextContent(options[2].error as string);
    expect(label[2].querySelector('.FormRequiredMark')).toBeTruthy();
});

test('has correct handling of onChange callback', async () => {
    const onChange = jest.fn();
    const user = userEvent.setup();
    render(
        <Radio
            id='id'
            value={options[0].value}
            options={options}
            onChange={onChange}
        />
    );
    const radio = screen.getAllByRole('radio');
    await user.click(radio[2]);
    expect(onChange).toBeCalledWith(options[2].value);
});

}); // describe
