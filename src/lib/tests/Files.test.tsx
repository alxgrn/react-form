import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Files, bytes2string } from '../components/Files';

describe('Files', () => {

const file = new File(['CONTENT'], 'test.txt', { type: 'text/plain;charset=utf-8' });

test('has correct label, top, bottom, disabled', () => {
    const label = 'Label text';
    const top = 'Top text';
    const bottom = 'Bottom text';
    const onChange = jest.fn();
    render(
        <Files
            id='id'
            files={[]}
            label={label}
            top={top}
            bottom={bottom}
            onChange={onChange}
        />
    );
    const input = screen.getByLabelText(label);
    expect(input).toBeInTheDocument();
    expect(input).not.toBeDisabled();
    expect(screen.getByText(label)).toBeInTheDocument();
    expect(screen.getByText(top)).toBeInTheDocument();
    expect(screen.getByText(bottom)).toBeInTheDocument();
});

test('has required mark and disabled option', () => {
    const label = 'Label text';
    const onChange = jest.fn();
    const { container } = render(
        <Files
            id='id'
            files={[]}
            label={label}
            required={true}
            disabled={true}
            onChange={onChange}
        />
    );
    expect(container.querySelector('.Form-required-mark')).toBeTruthy();
    expect(screen.getByLabelText(label)).toBeDisabled();
});

test('has correct handling of removing file from list', async () => {
    const onChange = jest.fn();
    const user = userEvent.setup();
    render(
        <Files
            id='id'
            label='label'
            files={[file]}
            onChange={onChange}
        />
    );
    const label = screen.getByText(file.name);
    expect(label).toBeInTheDocument();
    await user.click(label);
    expect(onChange).toBeCalledTimes(1);
    expect(onChange).toBeCalledWith([]);
});

test('has correct handling of disabled flag', async () => {
    const buttonText = 'Add file';
    const onChange = jest.fn();
    const user = userEvent.setup();
    render(
        <Files
            id='id'
            label={buttonText}
            files={[file]}
            onChange={onChange}
            disabled={true}
        />
    );
    const fileLabel = screen.getByText(file.name);
    expect(fileLabel).toBeInTheDocument();
    await user.click(fileLabel);
    expect(onChange).toBeCalledTimes(0);
    const buttonLabel = screen.getByText(buttonText);
    expect(buttonLabel).toBeInTheDocument();
    await user.click(buttonLabel);
    expect(onChange).toBeCalledTimes(0);    
});

test('has correct handling of single file selection', async () => {
    const label = 'Add file';
    const onChange = jest.fn();
    const user = userEvent.setup();
    render(
        <Files
            id='id'
            label={label}
            files={[]}
            onChange={onChange}
        />
    );
    const input = screen.getByLabelText(label) as HTMLInputElement;
    expect(input).toBeInTheDocument();
    await user.upload(input, [ file, file ]);
    expect(onChange).toBeCalledWith([ file ]);
    expect(input.files).toHaveLength(1);
    expect(input.files![0]).toStrictEqual(file);
    expect(input.files!.item(0)).toStrictEqual(file);
});

test('has correct handling of multiple file selection', async () => {
    const label = 'Add file';
    const onChange = jest.fn();
    const user = userEvent.setup();
    render(
        <Files
            id='id'
            label={label}
            files={[]}
            onChange={onChange}
            multiple={true}
        />
    );
    const input = screen.getByLabelText(label) as HTMLInputElement;
    expect(input).toBeInTheDocument();
    await user.upload(input, [ file, file ]);
    expect(onChange).toBeCalledWith([ file, file ]);
    expect(input.files).toHaveLength(2);
    expect(input.files![0]).toStrictEqual(file);
    expect(input.files!.item(0)).toStrictEqual(file);
    expect(input.files![1]).toStrictEqual(file);
    expect(input.files!.item(1)).toStrictEqual(file);
});

test('has correct output of bytes2string function', () => {
    expect(bytes2string(512)).toBe('512 bytes');
    expect(bytes2string(2048 + 100)).toBe('2 Kb');
    expect(bytes2string(1024 * 1024 + 100)).toBe('1 Mb');
});

}); // describe
