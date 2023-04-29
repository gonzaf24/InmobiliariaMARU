import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import styles from './Properties.module.scss';
import Loader from '../../../components/utils/Loader';

const propTypes = {
	className: PropTypes.string,
	dataTestId: PropTypes.string,
	id: PropTypes.string,
};

const defaultProps = {
	className: '',
	dataTestId: '',
	id: undefined,
};

const PropertiesLoader = ({ className, id }) => {
	const propertiesLoaderClassNames = classnames(styles.PropertiesLoader, className);

	return (
		<div className={propertiesLoaderClassNames} id={id}>
			<Loader className={styles.Loader} />
			<span className={styles.Text}>{'Mensahje'}</span>
		</div>
	);
};

PropertiesLoader.propTypes = propTypes;
PropertiesLoader.defaultProps = defaultProps;

export default PropertiesLoader;
