import React, { useCallback, useEffect, useState } from 'react';
import { Figure } from 'react-bootstrap';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import styles from './Image.module.scss';
import { BiHome } from 'react-icons/bi';

const propTypes = {
	alt: PropTypes.string,
	className: PropTypes.string,
	dataTestId: PropTypes.string,
	DefaultIcon: PropTypes.elementType,
	id: PropTypes.string,
	src: PropTypes.string,
	tabIndex: PropTypes.number,
	onError: PropTypes.func,
	onImageClick: PropTypes.func,
};

const defaultProps = {
	alt: '',
	className: '',
	dataTestId: '',
	DefaultIcon: BiHome,
	id: undefined,
	src: undefined,
	tabIndex: -1,
	onImageClick: () => {},
	onError: () => {},
};

const Image = ({ className, dataTestId, id, alt, src, tabIndex, DefaultIcon, onImageClick, onError }) => {
	const [isValidImage, setIsValidImage] = useState(true);

	const handleImageError = useCallback(
		(isValid = false) => {
			setIsValidImage(isValid);
			if (!isValid) onError();
		},
		[onError]
	);

	const handelKeyDown = useCallback(
		event => {
			if (event.keyCode === 13) {
				// TODO: this code should be in a config 13 "Enter" on keyboard
				onImageClick();
			}
		},
		[onImageClick]
	);

	useEffect(() => {
		handleImageError(!!src);
	}, [src, handleImageError]);

	const imageClassNames = classnames(styles.Image, className);

	return (
		<Figure
			className={imageClassNames}
			data-testid={dataTestId}
			id={id}
			tabIndex={tabIndex}
			onClick={onImageClick}
			onKeyDown={handelKeyDown}
		>
			{isValidImage ? (
				<Figure.Image alt={alt} className={styles.FigureImage} src={src} onError={handleImageError} />
			) : (
				<div className={styles.Invalid}>
					<DefaultIcon data-testid={`${dataTestId}_default`} />
				</div>
			)}
		</Figure>
	);
};

Image.propTypes = propTypes;
Image.defaultProps = defaultProps;

export default Image;
