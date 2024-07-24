import React, { FC, useEffect, useState } from 'react';
import Modal from '../modal/Modal';
import Form from '../../form/Form';
import Input from '../../input/Input';
import { ButtonType } from '../../button/Button';

export interface PromptProps {
    value?: string | null;
    title?: string | null;
    top?: string | null | React.ReactNode;
    bottom?: string | null | React.ReactNode;
    limit?: number | null;
    isOpen: boolean;
    submit?: string | null;
    submitType?: ButtonType;
    onCancel: () => void;
    onSubmit: (value: string) => void;
}

const Prompt: FC<PromptProps> = ({ value, title, top, bottom, limit, submit,
                                   submitType, isOpen, onCancel, onSubmit }) => {
    const [ innerValue, setInnerValue ] = useState('');

    useEffect(() => {
        setInnerValue(value ?? '');
    }, [ value, isOpen ]);

    return (
        <Modal isOpen={isOpen} onClose={onCancel}>
            {title && <h1>{title}</h1>}
			<Form
				submit={submit ?? 'Ok'}
                submitType={submitType}
				onSubmit={() => onSubmit(innerValue)}
			>
				<Input
					id='value'
					required={true}
					value={innerValue}
					onChange={setInnerValue}
					limit={limit}
                    top={top}
                    bottom={bottom}
                    autoFocus
				/>
			</Form>
        </Modal>
    );
};

export default Prompt;
