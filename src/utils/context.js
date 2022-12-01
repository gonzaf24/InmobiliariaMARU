import {
	createContext as createReactContext,
	useContext as useReactContext,
} from 'react';

const createContext = (contextName, defaultState, displayName = undefined) => {
	const Context = createReactContext(defaultState);
	Context.displayName = displayName || `${contextName} Context`;

	const useContext = () => {
		const context = useReactContext(Context);
		if (context === undefined) {
			throw new Error(
				`use${contextName}Context must be used within related ${contextName}Provider`
			);
		}
		return context;
	};

	return {
		Context,
		useContext,
	};
};

const createContextProvider = (contextName, defaultState) =>
	createContext(contextName, defaultState, `${contextName} Context`);

export { createContext, createContextProvider };
