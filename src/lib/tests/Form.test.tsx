import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Form, Input, RadioList, Select, Checkbox, Files, Hidden, Date } from '../index';

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
    expect(screen.getByText(submit)).toBeInTheDocument();
});

test('submit button disabled when required Input field is empty', () => {
    const onChange = jest.fn();
    const submit = 'Submit button';
    render(
        <Form
            submit={submit}
        >
            <Input
                id='id'
                value=''
                required={true}
                onChange={onChange}
            />
        </Form>
    );
    const button = screen.getByText(submit);
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('Disabled');
});

test('submit button disabled when required Checkbox field is unchecked', () => {
    const onChange = jest.fn();
    const submit = 'Submit button';
    render(
        <Form
            submit={submit}
        >
            <Checkbox
                id='id'
                label='label'
                value='value'
                required={true}
                onChange={onChange}
            />
        </Form>
    );
    const button = screen.getByText(submit);
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('Disabled');
});

test('submit button disabled when required Select field is unselected', () => {
    const onChange = jest.fn();
    const submit = 'Submit button';
    render(
        <Form
            submit={submit}
        >
            <Select
                id='id'
                required={true}
                onChange={onChange}
                value=''
                options={[{ value: 'one', option: 'one'}]}
            />
        </Form>
    );
    const button = screen.getByText(submit);
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('Disabled');
});

test('submit button disabled when required Radio field is unselected', () => {
    const onChange = jest.fn();
    const submit = 'Submit button';
    render(
        <Form
            submit={submit}
        >
            <RadioList
                id='id'
                required={true}
                onChange={onChange}
                value=''
                options={[{ value: 'one', label: 'one'}]}
            />
        </Form>
    );
    const button = screen.getByText(submit);
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('Disabled');
});

test('submit button disabled when required Files field is empty', () => {
    const onChange = jest.fn();
    const submit = 'Submit button';
    render(
        <Form
            submit={submit}
        >
            <Files
                id='id'
                required={true}
                onChange={onChange}
                files={[]}
                label='add'
                text='text'
            />
        </Form>
    );
    const button = screen.getByText(submit);
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('Disabled');
});

test('submit button disabled when required Date field is empty', () => {
    const onChange = jest.fn();
    const submit = 'Submit button';
    render(
        <Form
            submit={submit}
        >
            <Date
                id='id'
                required={true}
                onChange={onChange}
                value=''
            />
        </Form>
    );
    const button = screen.getByText(submit);
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('Disabled');
});

test('submit button disabled when required Date field has incorrect value', () => {
    const onChange = jest.fn();
    const submit = 'Submit button';
    const value = '02.29.2023'; // incorrect date
    render(
        <Form
            submit={submit}
        >
            <Date
                id='id'
                required={true}
                onChange={onChange}
                value={value}
            />
        </Form>
    );
    const button = screen.getByText(submit);
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('Disabled');
});

test('onSubmit callback gets correct data', async () => {
    const submit = 'Submit button';
    const onSubmit = jest.fn();
    const user = userEvent.setup();
    render(
        <Form submit={submit} onSubmit={onSubmit}>
            <Input
                id='input'
                onChange={jest.fn}
                value='test'
            />
            <Checkbox
                id='checkbox'
                value='checkbox'
                onChange={jest.fn}
                label='label'
                checked={true}
            />
            <Select
                id='select'
                onChange={jest.fn}
                value='one'
                options={[{ value: 'one', option: 'one'}]}
            />
            <RadioList
                id='radio'
                onChange={jest.fn}
                value='two'
                options={[{ value: 'two', label: 'two'}]}
            />
            <Files
                id='files'
                onChange={jest.fn}
                files={[]}
                label='add'
                text='text'
            />
            <Date
                id='date'
                onChange={jest.fn}
                value='01.01.2000'
            />
            <Hidden
                id='hidden'
                value='hidden'
            />
        </Form>
    );
    const button = screen.getByText(submit);
    expect(button).toBeInTheDocument();
    await user.click(button);
    expect(onSubmit).toBeCalledTimes(1);
    expect(onSubmit).toBeCalledWith({
        checkbox: 'checkbox',
        files: [],
        input: 'test',
        radio: 'two',
        select: 'one',
        date: '01.01.2000',
        hidden: 'hidden',
    });
});

}); // describe
