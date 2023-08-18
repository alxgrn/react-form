import React, { FC, ChangeEvent, useState, useEffect } from 'react';
import Fieldset from '../fieldset/Fieldset';
import './Files.css';

export interface FilesProps {
    id: string;
    files: File[];
    onChange: (files: File[]) => void;
    label?: string | null;
    text: string | null | React.ReactNode;
    top?: string | null | React.ReactNode;
    bottom?: string | null | React.ReactNode;
    accept?: string | null;
    multiple?: boolean | null;
    required?: boolean | null;
    disabled?: boolean | null;
    __TYPE?: 'Files';
}

export const bytes2string = (bytes: number): string => {
    if(bytes > 1024 * 1024) {
        return Math.round(bytes/(1024*1024)) + ' Mb';
    } else if(bytes > 1024) {
        return Math.round(bytes/1024) + ' Kb';
    } else {
        return bytes + ' bytes';
    }
};

export const Files: FC<FilesProps> = ({ id, files, onChange, label, text, top, bottom, accept,
                                      multiple = false, required = false, disabled = false }) => {

    const [ error, setError ] = useState(false);

    useEffect(() => {
        if(required && files.length < 1) setError(true); else setError(false);
    }, [ files, required ]);

    const getLabelText = (): string => {
        const size =  files.reduce((total, file) => total += file.size , 0);
        return size ? bytes2string(size) : '';
    };

    const removeFile = (index: number) => {
        if(disabled) return;
        const f = [...files];
        f.splice(index, 1);
        onChange(f);
    };

    const doFileChange = (event: ChangeEvent) => {
        const target = event.target as HTMLInputElement;
        const files = Array.from(target.files as FileList);
        onChange(files);
    };

    return (
        <Fieldset
            label={label}
            error={error}
            disabled={disabled}
            required={required}
            top={top}
            bottom={bottom}
        >
            {files.length > 0 &&
            <ul className={`FileList ${disabled ? 'Disabled' : ''}`}>
                {files.map((file, index) => 
                <li key={index} onClick={() => removeFile(index)}>
                    <div>
                        <span>{file.name}</span>
                        <span>{bytes2string(file.size)}</span>
                    </div>
                </li>)}
            </ul>}

            <div className={`FileLabel ${disabled ? 'Disabled' : ''} ${error ? 'Error' : ''}`}>
                <label>
                    {text}
                    <input
                        id={id}
                        type='file'
                        accept={accept ?? undefined}
                        onChange={e => doFileChange(e)}
                        multiple={multiple ?? undefined}
                        disabled={disabled ? true : false}
                    />
                </label>
                <span>
                    {getLabelText()}
                </span>
            </div>
        </Fieldset>
    );
}
// Это специальный props для того, чтобы мы могли найти все FormInput внутри Form
// https://mparavano.medium.com/find-filter-react-children-by-type-d9799fb78292
Files.defaultProps = {
    __TYPE: 'Files',
}

export default Files;
