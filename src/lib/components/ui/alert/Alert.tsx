import React, { FC, ReactNode } from 'react';
import Message, { MessageIconType } from '../message/Message';
import Modal from '../modal/Modal';
import Form from '../../form/Form';
import { ButtonType } from '../../button/Button';

export interface AlertProps {
	icon?: string | null;
	type?: MessageIconType;
	title?: string | null;
	message: string | ReactNode;
	close?: string;
	closeType?: ButtonType;
    isOpen: boolean;
    onClose: () => void;
}

const CLOSE = 'Ok';

const Alert:FC<AlertProps> = ({ icon, type, title, message, close, closeType, isOpen, onClose }) => {
	return (
		<Modal isOpen={isOpen} onClose={onClose}>
			<Message
				icon={icon}
				title={title}
				message={message}
				type={type}
			/>
			<Form
				submit={close ?? CLOSE}
				submitType={closeType}
				onSubmit={onClose}
			/>
		</Modal>
	);
};

export default Alert;
