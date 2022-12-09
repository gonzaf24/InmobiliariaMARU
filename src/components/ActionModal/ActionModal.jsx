import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import Modal from '../Modal';
import { Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

import styles from './ActionModal.module.scss';

const propTypes = {
	children: PropTypes.oneOfType([
		PropTypes.arrayOf(PropTypes.node),
		PropTypes.node,
	]),
	className: PropTypes.string,
	dataTestId: PropTypes.string,
	header: PropTypes.oneOfType([
		PropTypes.arrayOf(PropTypes.node),
		PropTypes.node,
	]),
	id: PropTypes.string,
	isLoading: PropTypes.bool,
	isOpen: PropTypes.bool,
	onAccept: PropTypes.func,
	onClose: PropTypes.func,
	onHide: PropTypes.func,
	onReject: PropTypes.func,
};

const defaultProps = {
	children: undefined,
	className: '',
	dataTestId: undefined,
	header: undefined,
	id: undefined,
	isOpen: false,
	isLoading: false,
	onAccept: undefined,
	onClose: undefined,
	onHide: undefined,
	onReject: undefined,
};

const texts = {
	Accept: 'Accept',
	Cancel: 'Cancel',
};

const ActionModal = ({
	children,
	className,
	dataTestId,
	id,
	isOpen,
	isLoading,
	header,
	onAccept,
	onClose,
	onHide,
	onReject,
}) => {
	const actionModalClassNames = classnames(styles.ActionModal, className);
	const { t } = useTranslation();

	if (!isOpen) return null;

	return (
		<Modal
			className={actionModalClassNames}
			data-testid={dataTestId}
			footer={
				<>
					{onAccept && (
						<Button
							variant='primary'
							className={styles.AcceptButton}
							onClick={onAccept}
						>
							{t(texts.Accept)}
						</Button>
					)}
					{onReject && (
						<Button
							variant='danger'
							className={styles.RejectButton}
							onClick={onReject}
						>
							{t(texts.Cancel)}
						</Button>
					)}
				</>
			}
			header={header}
			id={id}
			isLoading={isLoading}
			isOpen
			onClose={onClose}
			onHide={onHide}
		>
			{children}
		</Modal>
	);
};

ActionModal.propTypes = propTypes;
ActionModal.defaultProps = defaultProps;

export default ActionModal;
