import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import { Button, Form } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { Loader, useUser } from '../../../common';

import styles from './LoginForm.module.scss';

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
};

const LoginForm = ({ className, testId, id }) => {
	const loginFormClassNames = classnames(styles.LoginForm, className);
	const { t } = useTranslation();
	const { login, isLoading, errorMessage } = useUser();

	const submitForm = async e => {
		e.preventDefault();
		const username = e.target[0].value;
		const password = e.target[1].value;
		await login({ username, password });
	};

	return (
		<div className={loginFormClassNames} data-testid={testId} id={id}>
			<span>{t(texts.Title)}</span>
			<Form onSubmit={submitForm}>
				<Form.Group controlId='Email'>
					<Form.Label className='text-center'>Email address</Form.Label>
					<Form.Control type='text' placeholder='Enter email' required />
				</Form.Group>
				<Form.Group controlId='Password'>
					<Form.Label>Password</Form.Label>
					<Form.Control type='password' placeholder='Password' required />
				</Form.Group>
				<Form.Group controlId='formBasicCheckbox'>
					<p className='small'>
						<a className='text-primary' href='#!'>
							Forgot password?
						</a>
					</p>
				</Form.Group>
				<span>{t(errorMessage)}</span>
				<div className={styles.Wrapper}>
					{isLoading && <Loader className={styles.Loader} />}
					{!isLoading && (
						<Button disabled={isLoading} variant='primary' type='submit'>
							Login
						</Button>
					)}
				</div>
			</Form>
		</div>
	);
};

LoginForm.propTypes = propTypes;
LoginForm.defaultProps = defaultProps;

export default LoginForm;
