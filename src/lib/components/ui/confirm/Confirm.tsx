import React from 'react';
import Message, { MessageIconType } from '../message/Message';
import Modal from '../modal/Modal';
import Form from '../../form/Form';
import { ButtonType } from '../../button/Button';

export interface ModalConfirmProps {
	icon?: string | null;
	type?: MessageIconType;
	title?: string | null;
	message: string | React.ReactNode;
	cancel?: string;
	confirm?: string;
	cancelType?: ButtonType;
	confirmType?: ButtonType;
    isOpen: boolean;
    onCancel: () => void;
	onConfirm: () => void;
}

const CANCEL = 'Cancel';
const CONFIRM = 'Confirm';

const Confirm: React.FC<ModalConfirmProps> = ({ icon, type, title, message, cancel, confirm,
										 confirmType, cancelType, isOpen, onCancel, onConfirm }) => {
	return (
		<Modal isOpen={isOpen} onClose={onCancel}>
			<Message
				icon={icon}
				title={title}
				message={message}
				type={type}
			/>
			<Form
				cancel={cancel ?? CANCEL}
				submit={confirm ?? CONFIRM}
				cancelType={cancelType}
				submitType={confirmType}
				onCancel={onCancel}
				onSubmit={onConfirm}
			/>
		</Modal>
	);
};

export default Confirm;
