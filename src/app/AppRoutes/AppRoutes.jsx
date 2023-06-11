import React from 'react';
import PropTypes from 'prop-types';
import { Route, Routes } from 'react-router-dom';

import { About, Login, Users, Properties } from '../../pages';
import { Home, Admin, Rent, Sale } from '../../modules';

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

const AppRoutes = () => {
	return (
		<Routes>
			<Route path='/' element={<Home />} />
			<Route path='/rent' element={<Rent />} />
			<Route path='/sale' element={<Sale />} />
			<Route path='/about' element={<About />} />
			<Route path='/login' element={<Login />} />
			<Route path='/admin' element={<Admin />} end />
			<Route path='/admin/users' element={<Users />} />
			<Route path='/admin/properties' element={<Properties />} />
		</Routes>
	);
};

AppRoutes.propTypes = propTypes;
AppRoutes.defaultProps = defaultProps;

export default AppRoutes;
