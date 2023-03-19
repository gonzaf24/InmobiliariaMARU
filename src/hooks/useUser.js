import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useUserContext from '../context/userContext/userContext';
import loginService from '../services/loginService';
import { getUsers, postUser, putUser, deleteUser } from '../services/userService';

export default function useUser() {
	const { jwt, setJWT, setUser, user } = useUserContext();

	const navigate = useNavigate();

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

	const login = useCallback(
		async ({ username, password }) => {
			setState({ loading: true, error: null });
			try {
				const user = await loginService({ username, password });
				window.sessionStorage.setItem('user', JSON.stringify(user));
				window.sessionStorage.setItem('jwt', user.token);
				setUser(user);
				setJWT(user.token);
				navigate('/', { replace: true });
				return user;
			} catch (error) {
				setState({
					loading: false,
					error: error.message,
				});
				removeUserSession();
				return error.message;
			}
		},
		[setJWT]
	);

	const logout = useCallback(() => {
		removeUserSession();
		navigate('/', { replace: true });
	}, []);

	const users = useCallback(async () => {
		try {
			setState(prevState => ({ ...prevState, loading: true, hasError: false }));
			const users = await getUsers();
			setState(prevState => ({ ...prevState, loading: false }));
			return users;
		} catch (error) {
			setState(prevState => ({
				...prevState,
				loading: false,
				hasError: true,
				errorMessage: error.message,
			}));
			return [];
		}
	}, []);

	const newUser = useCallback(async user => {
		try {
			setState(prevState => ({ ...prevState, loading: true, hasError: false }));
			const newUser = await postUser(user);
			setState(prevState => ({ ...prevState, loading: false }));
			return newUser;
		} catch (error) {
			console.log('Error creating user: ', error);
			setState(prevState => ({ ...prevState, loading: false, hasError: true, errorMessage: error.message }));
			return false;
		}
	}, []);

	const editUser = useCallback(async user => {
		try {
			setState({ loading: true, hasError: false, errorCode: null, errorMessage: null });
			const editedUser = await putUser(user);
			console.log('edited user ', editedUser);
			setState({ loading: false, hasError: false, errorCode: null, errorMessage: null });
			return true;
		} catch (error) {
			console.log('edited user Error --->', error.message);
			setState({ loading: false, hasError: true, errorCode: null, errorMessage: error.message });
			return error.message;
		}
	}, []);

	const removeUser = useCallback(async id => {
		try {
			setState({ loading: true, error: false });
			const user = await deleteUser(id);
			console.log('deleted user ', user);
			setState({
				loading: false,
				error: false,
				errorCode: null,
				errorMessage: null,
			});
			return user;
		} catch (error) {
			console.log('deleted user Errror --- > ', error.message);
			setState({
				loading: false,
				hasError: true,
				errorCode: null,
				errorMessage: error.message,
			});
			return false;
		}
	}, []);

	return {
		isLogged: Boolean(jwt),
		isLoading: state.loading,
		hasError: state.error,
		errorCode: state.errorCode,
		errorMessage: state.errorMessage,
		user,
		login,
		logout,
		users,
		newUser,
		editUser,
		removeUser,
	};
}
