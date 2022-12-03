import { createContext } from '../../utils/context';

const CONTEXT_NAME = 'User';

const defaultState = {
	jwt: null,
	setJWT: () => {},
	user: undefined,
	setUser: () => {},
};

const { Context: UserContext, useContext: useUserContext } = createContext(
	CONTEXT_NAME,
	defaultState
);

export default useUserContext;
export { UserContext };
