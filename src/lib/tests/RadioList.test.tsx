import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { RadioList, RadioListOption } from '../components/radio/RadioList';

const options: RadioListOption[] = [
    { value: 'one', label: 'One', bottom: 'hint' },
    { value: 'two', label: 'Two', disabled: true },
    { value: 'three', label: 'Three', required: true },
];

describe('Radio', () => {

test('has correct label, value, hint, error, disabled, required', () => {
    const onChange = jest.fn();
    const { container } = render(
        <RadioList
            id='id'
            value={options[0].value}
            options={options}
            onChange={onChange}
        />
    );
    const radio = screen.getAllByRole('radio');
    expect(radio).toHaveLength(options.length);
    expect(radio[0]).not.toBeDisabled();
    expect(radio[1]).toBeDisabled();

    const label = container.querySelectorAll('label');
    expect(label).toHaveLength(options.length);
    expect(label[0]).toHaveTextContent(options[0].bottom as string);
    expect(label[1]).toHaveTextContent(options[1].label);
    expect(label[1].querySelector('.RequiredMark')).toBeFalsy();
    expect(label[2].querySelector('.RequiredMark')).toBeTruthy();
});

test('has correct handling of onChange callback', async () => {
    const onChange = jest.fn();
    const user = userEvent.setup();
    render(
        <RadioList
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
