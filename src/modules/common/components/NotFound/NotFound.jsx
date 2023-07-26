import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import Image from '../Image';
import { NotFound as NotFoundImage } from '../../../../assets/images';
import { useTranslation } from 'react-i18next';

import styles from './NotFound.module.scss';

const propTypes = {
	className: PropTypes.string,
	testId: PropTypes.string,
	id: PropTypes.string,
};

const defaultProps = {
	className: '',
	testId: undefined,
	id: undefined,
};

const texts = {
	NotFoundTitle: 'NotFound.Text.Title',
};

const NotFound = ({ className, testId, id }) => {
	const notFoundClassNames = classnames(styles.NotFound, className);
	const { t } = useTranslation();

	return (
		<div className={notFoundClassNames} data-testid={testId} id={id}>
			<div className={styles.Message}>
				<div className={styles.ImageWrapper}>
					<Image src={NotFoundImage} alt='Error' className={styles.Image} />
				</div>
				<div className={styles.TextWrapper}>
					<span className={styles.Title}>{t(texts.NotFoundTitle)}</span>
				</div>
			</div>
		</div>
	);
};

NotFound.propTypes = propTypes;
NotFound.defaultProps = defaultProps;

export default NotFound;
