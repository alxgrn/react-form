import React, { FC, ChangeEvent } from 'react';
import RequiredMark from './RequiredMark';
import './Files.css';

export interface FilesProps {
    id: string;
    files: File[];
    onChange: (files: File[]) => void;
    label: string;
    top?: string;
    bottom?: string;
    accept?: string;
    multiple?: boolean;
    required?: boolean;
    disabled?: boolean;
    __TYPE?: string;
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

export const Files: FC<FilesProps> = ({ id, files, onChange, label, top, bottom, accept,
                                      multiple = false, required = false, disabled = false }) => {

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
        <div className='Form-item Form-files'>
            {top && <div className='top'>{top}</div>}

            {files.length > 0 &&
            <ul className={disabled ? 'disabled' : undefined}>
                {files.map((file, index) => 
                <li key={index} onClick={() => removeFile(index)}>
                    <span>{file.name}</span>
                    <span>({bytes2string(file.size)})</span>
                </li>)}
            </ul>}

            <div className='Form-files-label'>
                <label className={disabled ? 'disabled' : undefined}>
                    {label}
                    <input
                        id={id}
                        type='file'
                        accept={accept}
                        onChange={e => doFileChange(e)}
                        multiple={multiple}
                        disabled={disabled}
                    />
                </label>
                <span>
                    <RequiredMark required={required}/>
                    {getLabelText()}
                </span>
            </div>
            
            {bottom && <div className='bottom'>{bottom}</div>}
        </div>
    );
}
// Это специальный props для того, чтобы мы могли найти все FormInput внутри Form
// https://mparavano.medium.com/find-filter-react-children-by-type-d9799fb78292
Files.defaultProps = {
    __TYPE: 'Files',
}

export default Files;
