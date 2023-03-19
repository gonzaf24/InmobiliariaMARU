import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';

import { UserContext } from './userContext';

const propTypes = {
	children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
};

const defaultProps = {};

const UserProvider = ({ children }) => {
	const userSession = window.sessionStorage.getItem('user');
	const jwtSession = window.sessionStorage.getItem('jwt');

	const [user, setUser] = useState(JSON.parse(userSession));
	const [jwt, setJWT] = useState(jwtSession);

	const contextValue = useMemo(
		() => ({
			user,
			setUser,
			jwt,
			setJWT,
		}),
		[user, setUser, jwt, setJWT]
	);

	return <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>;
};

UserProvider.propTypes = propTypes;
UserProvider.defaultProps = defaultProps;

export default UserProvider;
