import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import styles from './RealEstateList.module.scss';
import { useTranslation } from 'react-i18next';

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
	Title: 'RealEstateList.Title',
};

const RealEstateList = ({ className, testId, id }) => {
	const realEstateListClassNames = classnames(styles.RealEstateList, className);
	const { t } = useTranslation();

	return (
		<div className={realEstateListClassNames} data-testid={testId} id={id}>
			Text Component Example
			{t(texts.Title)}
		</div>
	);
};

RealEstateList.propTypes = propTypes;
RealEstateList.defaultProps = defaultProps;

export default RealEstateList;
