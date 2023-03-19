import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import styles from './Rent.module.scss';

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

const Rent = ({ className, testId, id }) => {
	const rentClassNames = classnames(styles.Rent, className);

	return (
		<div className={rentClassNames} data-testid={testId} id={id}>
			<h1>RENT</h1>
			<span>Under construction </span>
		</div>
	);
};

Rent.propTypes = propTypes;
Rent.defaultProps = defaultProps;

export default Rent;
