import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import styles from './FullSizeImage.module.scss';
import { BiX } from 'react-icons/bi';

const propTypes = {
	className: PropTypes.string,
	testId: PropTypes.string,
	id: PropTypes.string,
	imgSrc: PropTypes.string,
	setShowFullSizeImage: PropTypes.func,
	show: PropTypes.bool,
};

const defaultProps = {
	className: '',
	testId: undefined,
	id: undefined,
	imgSrc: '',
	setShowFullSizeImage: undefined,
	show: false,
};

const FullSizeImage = ({ className, testId, id, show, imgSrc, setShowFullSizeImage }) => {
	const fullSizeImageClassNames = classnames(styles.FullSizeImage, className);

	return (
		show && (
			<div className={fullSizeImageClassNames} id={id} data-testid={testId}>
				<section className={styles.FullSizeImageOverlay}>
					<BiX className={styles.FullSizeImageCloseButton} size={50} onClick={() => setShowFullSizeImage(false)} />
					<img alt='' className={styles.FullSizeImageFullImage} src={imgSrc} />
				</section>
			</div>
		)
	);
};

FullSizeImage.propTypes = propTypes;
FullSizeImage.defaultProps = defaultProps;

export default FullSizeImage;
