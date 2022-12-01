import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';

import { UserContext } from './userContext';

const propTypes = {
	children: PropTypes.oneOfType([
		PropTypes.arrayOf(PropTypes.node),
		PropTypes.node,
	]).isRequired,
};

const defaultProps = {};

const DEFAULT_USER = {
	id: 166253,
	name: 'Consuelo Teconsuelta',
	email: 'consuelo@gmail.com',
	token: 'SDKUFH7834R-WIF7FHIHFC-ANSKCF7W3EOEW3D8U0-ZSA93E',
};

const UserProvider = ({ children }) => {
	const [user, setUser] = useState(DEFAULT_USER);

	const contextValue = useMemo(
		() => ({
			user,
			setUser,
		}),
		[user, setUser]
	);

	return (
		<UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
	);
};

UserProvider.propTypes = propTypes;
UserProvider.defaultProps = defaultProps;

export default UserProvider;
