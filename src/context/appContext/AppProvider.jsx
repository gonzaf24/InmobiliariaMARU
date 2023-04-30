import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';

import { AppContext } from './appContext';
import { ROUTING_OPTIONS } from '../../app/AppNavbar/AppNavbar';

const propTypes = {
	children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
};

const defaultProps = {};

const INITIAL_STATE = ROUTING_OPTIONS[0].value;

const AppProvider = ({ children }) => {
	const [currentState, setCurrentState] = useState(INITIAL_STATE);

	const contextValue = useMemo(
		() => ({
			currentState,
			setCurrentState,
		}),
		[currentState, setCurrentState]
	);

	return <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>;
};

AppProvider.propTypes = propTypes;
AppProvider.defaultProps = defaultProps;

export default AppProvider;
