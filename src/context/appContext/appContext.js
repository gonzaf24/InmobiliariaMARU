import { createContext } from '../../modules/common';

const CONTEXT_NAME = 'App';

const defaultState = {
	currentState: null,
	setCurrentState: () => {},
};

const { Context: AppContext, useContext: useAppContext } = createContext(CONTEXT_NAME, defaultState);

export default useAppContext;
export { AppContext };
