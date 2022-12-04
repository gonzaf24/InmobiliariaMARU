import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { Button, Form } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

import styles from './LoginForm.module.scss';
import useUser from '../../hooks/useUser';
import dataApi from '../../services/utils/dataApi';
import useToastContext from '../../context/toastContext';

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

const texts = {
	Title: 'LoginForm.Title',
	BadCredentials: 'LoginForm.BadCredentials',
};

const LoginForm = ({ className, testId, id }) => {
	const loginFormClassNames = classnames(styles.LoginForm, className);
	const { t } = useTranslation();
	const { login, errorCode } = useUser();
	const { addToast } = useToastContext();

	const submitForm = e => {
		addToast({
			id: 1,
			type: 'success',
			middleContent: 'Entro',
			useAutoHide: false,
		});
		console.log('submitForm', e);
		e.preventDefault();
		const username = e.target[0].value;
		const password = e.target[1].value;
		addToast({
			id: 1,
			type: 'success',
			middleContent: `aca es  ${username} ${password}`,
			useAutoHide: false,
		});
		console.log('values catched ', username, password);
		login({ username, password });
		console.log('after login');
	};

	const getError = errorCode => {
		const errorList = {
			401: t(texts.BadCredentials),
			500: 'Error interno del servidor',
		};
		return errorList[errorCode];
	};

	return (
		<div className={loginFormClassNames} data-testid={testId} id={id}>
			<span>{t(texts.Title)}</span>
			{dataApi.BASE_URL}
			<Form onSubmit={submitForm}>
				<Form.Group className='mb-3' controlId='Email'>
					<Form.Label className='text-center'>Email address</Form.Label>
					<Form.Control type='text' placeholder='Enter email' required />
				</Form.Group>

				<Form.Group className='mb-3' controlId='Password'>
					<Form.Label>Password</Form.Label>
					<Form.Control type='password' placeholder='Password' required />
				</Form.Group>
				<Form.Group className='mb-3' controlId='formBasicCheckbox'>
					<p className='small'>
						<a className='text-primary' href='#!'>
							Forgot password?
						</a>
					</p>
				</Form.Group>
				<span>{getError(errorCode)}</span>
				<div className='d-grid'>
					<Button variant='primary' type='submit'>
						Login
					</Button>
				</div>
			</Form>
		</div>
	);
};

LoginForm.propTypes = propTypes;
LoginForm.defaultProps = defaultProps;

export default LoginForm;
