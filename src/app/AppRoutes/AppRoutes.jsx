import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { Route, Routes } from 'react-router-dom';

import styles from './AppRoutes.module.scss';
import { Home, About, Login, Users, NewHouse, Rent, Sale, Admin, Properties } from '../../pages';

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

const AppRoutes = ({ className, testId, id }) => {
	const appRoutesClassNames = classnames(styles.AppRoutes, className);

	return (
		<div className={appRoutesClassNames} data-testid={testId} id={id}>
			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='/rent' element={<Rent />} />
				<Route path='/sale' element={<Sale />} />
				<Route path='/about' element={<About />} />
				<Route path='/login' element={<Login />} />
				<Route path='/admin' element={<Admin />} end />
				<Route path='/admin/users' element={<Users />} />
				<Route path='/admin/newHouse' element={<NewHouse />} />
				<Route path='/admin/properties' element={<Properties />} />
			</Routes>
		</div>
	);
};

AppRoutes.propTypes = propTypes;
AppRoutes.defaultProps = defaultProps;

export default AppRoutes;
