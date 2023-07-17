import React, { useEffect } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import { Image, useHouse } from '../../../common';
import { useTranslation } from 'react-i18next';
import styles from './Property.module.scss';
import { useParams } from 'react-router-dom';
import { NotFound } from '../../../../assets/images';

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
	NotFoundSubtitle: 'NotFound.Text.Subtitle',
};

const Property = ({ className, testId, id }) => {
	const { t } = useTranslation();
	const { id: idParam } = useParams();

	const { getHouse, hasError, errorCode } = useHouse();

	useEffect(() => {
		const fetchData = async () => {
			const house = await getHouse(idParam);
			console.log('house ', house);
		};
		fetchData();
	}, [getHouse, id]);

	const is404Error = hasError && errorCode === 404;

	const propertyClassNames = classnames(styles.Property, className);

	return (
		<div className={propertyClassNames} data-testid={testId} id={id}>
			{is404Error && (
				<div className={styles.NotFound}>
					<div className={styles.Message}>
						<div className={styles.ImageWrapper}>
							<Image src={NotFound} alt='Error' className={styles.Image} />
						</div>
						<div className={styles.TextWrapper}>
							<span className={styles.Title}>{t(texts.NotFoundTitle)}</span>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

Property.propTypes = propTypes;
Property.defaultProps = defaultProps;

export default Property;
