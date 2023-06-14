import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import RealEstateCard from '../RealEstateCard';

import styles from './RealEstateList.module.scss';

const propTypes = {
	className: PropTypes.string,
	testId: PropTypes.string,
	id: PropTypes.string,
	greatPlaces: PropTypes.array,
};

const defaultProps = {
	className: '',
	testId: undefined,
	id: undefined,
	greatPlaces: [],
};

const RealEstateList = ({ className, testId, id, greatPlaces }) => {
	const realEstateListClassNames = classnames(styles.RealEstateList, className);

	return (
		<div className={realEstateListClassNames} data-testid={testId} id={id}>
			{greatPlaces.map(place => (
				<RealEstateCard key={place.id} place={place} />
			))}
		</div>
	);
};

RealEstateList.propTypes = propTypes;
RealEstateList.defaultProps = defaultProps;

export default RealEstateList;
