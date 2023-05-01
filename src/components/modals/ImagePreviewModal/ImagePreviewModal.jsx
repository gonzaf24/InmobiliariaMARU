import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import styles from './ImagePreviewModal.module.scss';
import Image from '../../Image';
import Modal from '../Modal';

const propTypes = {
	className: PropTypes.string,
	id: PropTypes.string,
	imgURL: PropTypes.string,
	isOpen: PropTypes.bool,
	onClose: PropTypes.func,
};

const defaultProps = {
	className: '',
	id: undefined,
	imgURL: '',
	isOpen: true,
	onClose: () => {},
};

const ImagePreviewModal = ({ className, id, imgURL, isOpen, onClose }) => {
	const imagePreviewModalClassNames = classnames(styles.ImagePreviewModal, className);
	return (
		<Modal isOpen={isOpen} onHide={onClose} onClose={onClose} className={imagePreviewModalClassNames} size='xs' id={id}>
			<Image className={styles.Image} src={imgURL} />
		</Modal>
	);
};

ImagePreviewModal.propTypes = propTypes;
ImagePreviewModal.defaultProps = defaultProps;

export default ImagePreviewModal;
