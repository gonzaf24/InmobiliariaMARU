import { useCallback, useState } from 'react';
import useUserContext from '../context/userContext/userContext';
import loginService from '../services/loginService';

export default function useUser() {
	const { setJWT, setUser, user } = useUserContext();

	const [state, setState] = useState({
		loading: false,
		hasError: null,
		errorMessage: null,
		errorCode: null,
	});

	const removeUserSession = () => {
		window.sessionStorage.removeItem('jwt');
		window.sessionStorage.removeItem('user');
		setUser(null);
		setJWT(null);
	};

	const login = useCallback(async ({ username, password }) => {
		setState({
			loading: true,
			hasError: false,
			errorCode: null,
			errorMessage: null,
		});
		const user = await loginService({ username, password });
		console.log('user', user);
		if (user.errorCode) {
			setState({
				loading: false,
				hasError: true,
				errorCode: user.errorCode,
				errorMessage: user.errorMessage,
			});
			removeUserSession();
		} else {
			window.sessionStorage.setItem('user', JSON.stringify(user));
			window.sessionStorage.setItem('jwt', user.token);
			setUser(user);
			setJWT(user.token);
			setState({
				loading: false,
				error: false,
				errorCode: null,
				errorMessage: null,
			});
		}
	}, []);

	const logout = useCallback(() => {
		removeUserSession();
	}, []);

	return {
		isLoading: state.loading,
		hasError: state.error,
		errorCode: state.errorCode,
		errorMessage: state.errorMessage,
		user,
		login,
		logout,
	};
}
