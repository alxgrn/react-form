import React, { FC, ChangeEvent } from 'react';
import RequiredMark from './RequiredMark';

export interface FilesProps {
    id: string;
    files: File[];
    onChange: (files: File[]) => void;
    label: string;
    hint?: string;
    error?: string;
    accept?: string;
    multiple?: boolean;
    required?: boolean;
    disabled?: boolean;
    __TYPE?: string;
}

const bytes2string = (bytes: number): string => {
    if(bytes > 1024 * 1024) {
        return Math.round(bytes/(1024*1024)) + ' Mb';
    } else if(bytes > 1024) {
        return Math.round(bytes/1024) + ' Kb';
    } else {
        return bytes + ' bytes';
    }
};

export const Files: FC<FilesProps> = ({ id, files, onChange, label, hint, error, accept,
                                      multiple = false, required = false, disabled = false }) => {

    const getLabelText = (): string => {
        const size =  files.reduce((total, file) => total += file.size , 0);
        return size ? bytes2string(size) : '';
    };

    const removeFile = (index: number) => {
        if(disabled) return;
        files.splice(index, 1);
        onChange(files.concat());
    };

    const doFileChange = (event: ChangeEvent) => {
        const target = event.target as HTMLInputElement;
        const files = Array.from(target.files as FileList);
        onChange(files);
    };

    return (
        <div className='Form-item Form-files'>
            {files.length > 0 &&
            <ul
                className={disabled ? 'disabled' : undefined}
            >
            {files.map((file, index) => 
            <li
                key={index}
                onClick={() => removeFile(index)}
            >
                {file.name}&nbsp;
                <small style={{color:'var(--color-hint)'}}>
                    ({bytes2string(file.size)})
                </small>
            </li>)}
            </ul>}

            <div className='Form-files-label'>
                <label
                    htmlFor={id}
                    className={disabled ? 'disabled' : undefined}
                >
                    {label}
                </label>
                <div>
                    <RequiredMark required={required}/>
                    {getLabelText()}
                </div>
            </div>

            <input
                id={id}
                type='file'
                accept={accept}
                onChange={e => doFileChange(e)}
                multiple={multiple}
                disabled={disabled}
            />

            {error &&
            <div className='Form-item-error'>
                {error}
            </div>}

            {hint &&
            <div className='Form-item-hint'>
                {hint}
            </div>}
        </div>
    );
}
// Это специальный props для того, чтобы мы могли найти все FormInput внутри Form
// https://mparavano.medium.com/find-filter-react-children-by-type-d9799fb78292
Files.defaultProps = {
    __TYPE: 'Files',
}

export default Files;
