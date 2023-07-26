import React, { useRef } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import { Modal as ModalBoostrap } from 'react-bootstrap';
import { MdClose } from 'react-icons/md';
import { MODAL_TRANSITION_EFFECT } from '../../../../../utils';
import Loader from '../../Loader';

import styles from './Modal.module.scss';

const propTypes = {
	children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
	className: PropTypes.string,
	dataTestId: PropTypes.string,
	footer: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
	header: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
	id: PropTypes.string,
	isLoading: PropTypes.bool,
	isOpen: PropTypes.bool,
	size: PropTypes.string,
	onClose: PropTypes.func,
	onHide: PropTypes.func,
	backdrop: PropTypes.oneOfType([PropTypes.bool, PropTypes.oneOf(['static'])]),
	backdropClassName: PropTypes.string,
	effect: PropTypes.string,
};

const defaultProps = {
	children: undefined,
	className: '',
	dataTestId: undefined,
	footer: undefined,
	header: undefined,
	id: undefined,
	isLoading: false,
	isOpen: false,
	size: 'md',
	onClose: undefined,
	onHide: undefined,
	backdrop: true,
	backdropClassName: undefined,
	effect: undefined,
};

const Modal = ({
	children,
	className,
	dataTestId,
	id,
	isOpen,
	onHide,
	onClose,
	footer,
	isLoading,
	header,
	size,
	backdrop,
	backdropClassName,
	effect,
}) => {
	const modalRef = useRef(null);

	const timedClose = isOnHide => {
		setTimeout(() => {
			if (isOnHide) {
				onHide();
			} else {
				onClose();
			}
		}, 200);
	};

	const handleClose = isOnHide => () => {
		const { dialog } = modalRef.current;
		if (effect === MODAL_TRANSITION_EFFECT.up) {
			dialog.classList.remove(styles.UpEffect);
			dialog.classList.add(styles.CloseUpEffect);
			timedClose(isOnHide);
		} else if (effect === MODAL_TRANSITION_EFFECT.down) {
			dialog.classList.remove(styles.DownEffect);
			dialog.classList.add(styles.CloseDownEffect);
			timedClose(isOnHide);
		} else if (isOnHide) {
			onHide();
		} else {
			onClose();
		}
	};

	const modalClassNames = classnames(
		styles.Modal,
		className,
		{ [styles.UpEffect]: effect === MODAL_TRANSITION_EFFECT.up },
		{ [styles.DownEffect]: effect === MODAL_TRANSITION_EFFECT.down }
	);

	const headerClassNames = classnames(styles.Header, { [styles.Empty]: !header });
	const backdropClassNames = classnames(styles.Backdrop, backdropClassName);

	return (
		<ModalBoostrap
			ref={modalRef}
			aria-labelledby='modal-center'
			centered
			className={modalClassNames}
			data-testid={dataTestId}
			backdrop={backdrop}
			backdropClassName={backdropClassNames}
			id={id}
			show={isOpen}
			size={size}
			onHide={handleClose(true)}
		>
			{(header || onClose) && (
				<ModalBoostrap.Header className={headerClassNames}>
					<span />
					{header}
					{onClose && <MdClose className={styles.CloseIcon} onClick={handleClose(false)} onKeyPress={handleClose(false)} />}
				</ModalBoostrap.Header>
			)}
			{children && (
				<ModalBoostrap.Body className={styles.Body}>
					{isLoading && <Loader className={styles.Loader} />}
					{!isLoading && children}
				</ModalBoostrap.Body>
			)}
			{footer && <ModalBoostrap.Footer className={styles.Footer}>{footer}</ModalBoostrap.Footer>}
		</ModalBoostrap>
	);
};

Modal.propTypes = propTypes;
Modal.defaultProps = defaultProps;

export default Modal;
