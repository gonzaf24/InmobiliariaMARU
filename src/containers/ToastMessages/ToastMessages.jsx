import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import { MdClose } from 'react-icons/md';
import { Toast, ToastContainer, Button } from 'react-bootstrap';
import { DEFAULT_CLOSE_TIME_DELAY, TOASTS_TYPES } from '../../utils/constants';
import useToastContext from '../../context/toastContext';

import styles from './ToastMessages.module.scss';

const propTypes = {
	className: PropTypes.string,
	containerPosition: PropTypes.string,
	dataTestId: PropTypes.string,
	id: PropTypes.string,
	toasts: PropTypes.arrayOf(
		PropTypes.shape({
			hideDelay: PropTypes.number,
			id: PropTypes.number,
			leftContent: PropTypes.node,
			middleContent: PropTypes.node,
			rightContent: PropTypes.node,
			type: PropTypes.string,
			useAutoHide: PropTypes.bool,
		})
	),
};

const defaultProps = {
	className: '',
	containerPosition: 'bottom-center',
	dataTestId: '',
	id: undefined,
	toasts: [
		{
			hideDelay: DEFAULT_CLOSE_TIME_DELAY,
			id: 0,
			leftContent: null,
			middleContent: null,
			rightContent: null,
			type: TOASTS_TYPES.DEFAULT,
			useAutoHide: true,
		},
	],
};

const ToastMessages = ({ className, containerPosition, id, toasts, dataTestId }) => {
	const toastMessagesClassNames = classnames(styles.ToastMessages, className);

	const { removeToast } = useToastContext();

	const renderCloseButton = toastMessage =>
		!toastMessage.useAutoHide && (
			<Button className={styles.ButtonClose} onClick={removeToast(toastMessage.id)}>
				<MdClose className={styles.CloseIcon} />
			</Button>
		);

	const renderBody = (toastMessage, customClassName) => (
		<Toast.Body className={classnames(styles.ToastBody, customClassName)}>
			<span className={styles.MiddleContent}>{toastMessage.middleContent}</span>
			{renderCloseButton(toastMessage)}
		</Toast.Body>
	);

	const getDefaultBody = toastMessage => (
		<Toast.Body className={styles.ToastBody}>
			<div className={styles.LeftContent}>{toastMessage.leftContent}</div>
			<span className={styles.MiddleContent}>{toastMessage.middleContent}</span>
			<div className={styles.RightContent}>{toastMessage.rightContent}</div>
			{renderCloseButton(toastMessage)}
		</Toast.Body>
	);

	const getInfoBody = toastMessage => renderBody(toastMessage, styles.ToastBodyInfo);

	const getSuccessBody = toastMessage => renderBody(toastMessage, styles.ToastBodySuccess);

	const getWarningBody = toastMessage => renderBody(toastMessage, styles.ToastBodyWarning);

	const getErrorBody = toastMessage => renderBody(toastMessage, styles.ToastBodyError);

	const getBodyToast = toastMessage => {
		const getErrorFuncSwitch = {
			[TOASTS_TYPES.DEFAULT]: getDefaultBody,
			[TOASTS_TYPES.INFO]: getInfoBody,
			[TOASTS_TYPES.SUCCESS]: getSuccessBody,
			[TOASTS_TYPES.WARNING]: getWarningBody,
			[TOASTS_TYPES.ERROR]: getErrorBody,
		};
		const getErrorFunc = getErrorFuncSwitch[toastMessage.type] || getDefaultBody;

		return getErrorFunc(toastMessage);
	};

	return (
		<ToastContainer className={toastMessagesClassNames} data-testid={dataTestId} id={id} position={containerPosition}>
			{toasts.map(toastMessage => (
				<Toast
					key={toastMessage.id}
					autohide={toastMessage.useAutoHide}
					className={styles.Toast}
					delay={toastMessage.hideDelay}
					show
					onClose={removeToast(toastMessage.id)}
				>
					{getBodyToast(toastMessage)}
				</Toast>
			))}
		</ToastContainer>
	);
};

ToastMessages.propTypes = propTypes;
ToastMessages.defaultProps = defaultProps;

export default ToastMessages;
