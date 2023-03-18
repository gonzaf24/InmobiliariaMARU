import React from 'react';
import { Modal as ModalBoostrap } from 'react-bootstrap';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { MdClose } from 'react-icons/md';

import styles from './Modal.module.scss';
import Loader from '../../Loader';

const propTypes = {
	children: PropTypes.oneOfType([
		PropTypes.arrayOf(PropTypes.node),
		PropTypes.node,
	]),
	className: PropTypes.string,
	dataTestId: PropTypes.string,
	footer: PropTypes.oneOfType([
		PropTypes.arrayOf(PropTypes.node),
		PropTypes.node,
	]),
	header: PropTypes.oneOfType([
		PropTypes.arrayOf(PropTypes.node),
		PropTypes.node,
	]),
	id: PropTypes.string,
	isLoading: PropTypes.bool,
	isOpen: PropTypes.bool,
	size: PropTypes.string,
	onClose: PropTypes.func,
	onHide: PropTypes.func,
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
}) => {
	const modalClassNames = classnames(styles.Modal, className);
	const headerClassNames = classnames(styles.Header, {
		[styles.Empty]: !header,
	});

	return (
		<ModalBoostrap
			aria-labelledby='modal-center'
			centered
			className={modalClassNames}
			data-testid={dataTestId}
			id={id}
			show={isOpen}
			size={size}
			onHide={onHide}
		>
			{(header || onClose) && (
				<ModalBoostrap.Header className={headerClassNames}>
					<span />
					{header}
					{onClose && (
						<MdClose
							className={styles.CloseIcon}
							onClick={onClose}
							onKeyPress={onClose}
						/>
					)}
				</ModalBoostrap.Header>
			)}
			{children && (
				<ModalBoostrap.Body className={styles.Body}>
					{isLoading && (
							<Loader className={styles.Loader} />
					)}
					{!isLoading && children}
				</ModalBoostrap.Body>
			)}
			{footer && (
				<ModalBoostrap.Footer className={styles.Footer}>
					{footer}
				</ModalBoostrap.Footer>
			)}
		</ModalBoostrap>
	);
};

Modal.propTypes = propTypes;
Modal.defaultProps = defaultProps;

export default Modal;
