import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import styles from './RealEstateMapMarker.module.scss';

const propTypes = {
	className: PropTypes.string,
	testId: PropTypes.string,
	id: PropTypes.string,
	hover: PropTypes.bool,
	text: PropTypes.string,
	link: PropTypes.string,
};

const defaultProps = {
	className: '',
	testId: undefined,
	id: undefined,
	hover: false,
	text: '',
	link: '',
};

const RealEstateMapMarker = ({ className, testId, id, hover, text, link }) => {
	const RealEstateMapMarkerClassNames = classnames(styles.RealEstateMapMarker, className, { [styles.Hovered]: hover });

	return (
		<div className={RealEstateMapMarkerClassNames} data-testid={testId} id={id}>
			<div>{text}</div>
		</div>
	);
};

RealEstateMapMarker.propTypes = propTypes;
RealEstateMapMarker.defaultProps = defaultProps;

export default RealEstateMapMarker;
