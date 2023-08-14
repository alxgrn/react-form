import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Form, Hidden } from '../index';

describe('Hidden', () => {

test('has correct value', async () => {
    const submit = 'Submit button';
    const hidden_string = 'Hidden string';
    const hidden_number = 777;
    const onSubmit = jest.fn();
    const user = userEvent.setup();
    render(
        <Form submit={submit} onSubmit={onSubmit}>
            <Hidden
                id='hidden_string'
                value={hidden_string}
            />
            <Hidden
                id='hidden_number'
                value={hidden_number}
            />
        </Form>
    );
    const button = screen.getByText(submit);
    expect(button).toBeInTheDocument();
    await user.click(button);
    expect(onSubmit).toBeCalledTimes(1);
    expect(onSubmit).toBeCalledWith({ hidden_string, hidden_number });
});


}); // describe
