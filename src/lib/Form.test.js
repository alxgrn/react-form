import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Form, Input } from './index';

describe('Form', () => {

test('has correct info text', () => {
    const info = 'Test info text';
    render(<Form info={info}/>);
    expect(screen.getByText(info)).toBeInTheDocument();
});

test('has correct success text', () => {
    const success = 'Test success text';
    render(<Form success={success}/>);
    expect(screen.getByText(success)).toBeInTheDocument();
});

test('has correct error text', () => {
    const error = 'Test error text';
    render(<Form error={error}/>);
    expect(screen.getByText(error)).toBeInTheDocument();
});

test('has submit button', () => {
    const submit = 'Submit button';
    render(<Form submit={submit}/>);
    expect(screen.getByRole('button', { name: submit })).toBeInTheDocument();
});

test('calls onSubmit callback', async () => {
    const submit = 'Submit button';
    const callback = jest.fn();
    const user = userEvent.setup();
    render(<Form submit={submit} onSubmit={callback}/>);
    const button = screen.getByRole('button', { name: submit });
    expect(button).toBeInTheDocument();
    await user.click(button);
    expect(callback).toBeCalledTimes(1);
});

test('submit button disabled when required field is empty', () => {
    const id = 'ID';
    const value = '';
    const onChange = jest.fn();
    const submit = 'Submit button';
    render(
        <Form
            submit={submit}
        >
            <Input
                id={id}
                value={value}
                required={true}
                onChange={onChange}
            />
        </Form>
    );
    const button = screen.getByRole('button', { name: submit });
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute('disabled');
});

}); // describe
