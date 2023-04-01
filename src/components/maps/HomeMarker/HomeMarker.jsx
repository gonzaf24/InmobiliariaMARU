import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import styles from './HomeMarker.module.scss';

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

const HomeMarker = ({ className, testId, id }) => {
	const homeMarkerClassNames = classnames(styles.HomeMarker, className);

	return (
		<div className={homeMarkerClassNames} data-testid={testId} id={id}>
			<span>A</span>
		</div>
	);
};

HomeMarker.propTypes = propTypes;
HomeMarker.defaultProps = defaultProps;

export default HomeMarker;
