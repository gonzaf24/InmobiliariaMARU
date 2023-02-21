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
			setState({ loading: true, error: false });
			console.log('login', username, password);
			return await loginService({ username, password })
				.then(user => {
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
					navigate('/', { replace: true });
					return user;
				})
				.catch(error => {
					console.log('login error', error);
					setState({
						loading: false,
						hasError: true,
						errorCode: null,
						errorMessage: error.message,
					});
					removeUserSession();
					return error.message;
				});
		},
		[setJWT]
	);

	const logout = useCallback(() => {
		removeUserSession();
		navigate('/', { replace: true });
	}, []);

	const users = useCallback(async () => {
		setState({ loading: true, error: false });
		return await getUsers()
			.then(users => {
				setState({
					loading: false,
					error: false,
					errorCode: null,
					errorMessage: null,
				});
				return users;
			})
			.catch(error => {
				setState({
					loading: false,
					hasError: true,
					errorCode: null,
					errorMessage: error.message,
				});
				return [];
			});
	}, []);

	const newUser = useCallback(async user => {
		setState({ loading: true, error: false });
		return await postUser(user)
			.then(user => {
				console.log('created user ', user);
				setState({
					loading: false,
					error: false,
					errorCode: null,
					errorMessage: null,
				});
				return user;
			})
			.catch(error => {
				console.log('created user Errror --- > ', error.message);
				setState({
					loading: false,
					hasError: true,
					errorCode: null,
					errorMessage: error.message,
				});
				return false;
			});
	}, []);

	const editUser = useCallback(async user => {
		setState({ loading: true, error: false });
		return await putUser(user)
			.then(user => {
				console.log('edited user ', user);
				setState({
					loading: false,
					error: false,
					errorCode: null,
					errorMessage: null,
				});
				return true;
			})
			.catch(error => {
				console.log('edited user Errror --- > ', error.message);
				setState({
					loading: false,
					hasError: true,
					errorCode: null,
					errorMessage: error.message,
				});
				return error.message;
			});
	}, []);

	const removeUser = useCallback(async id => {
		setState({ loading: true, error: false });
		return await deleteUser(id)
			.then(user => {
				console.log('deleted user ', user);
				setState({
					loading: false,
					error: false,
					errorCode: null,
					errorMessage: null,
				});
				return user;
			})
			.catch(error => {
				console.log('deleted user Errror --- > ', error.message);
				setState({
					loading: false,
					hasError: true,
					errorCode: null,
					errorMessage: error.message,
				});
				return false;
			});
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
