import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import styles from './Sale.module.scss';

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

const Sale = ({ className, testId, id }) => {
	const saleClassNames = classnames(styles.Sale, className);

	return (
		<div className={saleClassNames} data-testid={testId} id={id}>
			<h1>SALE</h1>
			<span>Under construction </span>
		</div>
	);
};

Sale.propTypes = propTypes;
Sale.defaultProps = defaultProps;

export default Sale;
