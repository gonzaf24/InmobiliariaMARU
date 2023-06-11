import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import styles from './Loader.module.scss';

const propTypes = {
	className: PropTypes.string,
	dataTestId: PropTypes.string,
	id: PropTypes.string,
};

const defaultProps = {
	className: '',
	dataTestId: undefined,
	id: undefined,
};

const Loader = ({ className, dataTestId, id }) => {
	const loaderClassNames = classnames(styles.Loader, className);

	return <div className={loaderClassNames} data-testid={dataTestId} id={id} />;
};

Loader.propTypes = propTypes;
Loader.defaultProps = defaultProps;

export default Loader;
