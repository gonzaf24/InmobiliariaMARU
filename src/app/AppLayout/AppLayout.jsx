import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import styles from './AppLayout.module.scss';
import AppNavbar from '../AppNavbar/AppNavbar';
import { BrowserRouter } from 'react-router-dom';

const propTypes = {
	children: PropTypes.node.isRequired,
	className: PropTypes.string,
	testId: PropTypes.string,
	id: PropTypes.string,
};

const defaultProps = {
	className: '',
	testId: undefined,
	id: undefined,
};

const AppLayout = ({ className, testId, id, children }) => {
	const appLayoutClassNames = classnames(styles.AppLayout, className);

	return (
		<div className={appLayoutClassNames} data-testid={testId} id={id}>
			<BrowserRouter>
				<AppNavbar />
				{children}
			</BrowserRouter>
		</div>
	);
};

AppLayout.propTypes = propTypes;
AppLayout.defaultProps = defaultProps;

export default AppLayout;
