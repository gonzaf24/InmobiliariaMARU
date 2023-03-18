import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import styles from './RegisterForm.module.scss';
import { useTranslation } from 'react-i18next';
import { Form, Button } from 'react-bootstrap';

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
	Title: 'RegisterForm.Title',
};

const RegisterForm = ({ className, testId, id }) => {
	const registerFormClassNames = classnames(styles.RegisterForm, className);
	const { t } = useTranslation();

	const submitForm = e => {
		e.preventDefault();
		console.log('submitting form');
	};

	return (
		<div className={registerFormClassNames} data-testid={testId} id={id}>
			<span>{t(texts.Title)}</span>
			<Form onSubmit={submitForm}>
				<Form.Group className={styles.Margins} controlId='idFormName'>
					<Form.Label className='text-center'>Name</Form.Label>
					<Form.Control type='text' placeholder='Name' required />
				</Form.Group>

				<Form.Group className={styles.Margins} controlId='idRegisterEmail'>
					<Form.Label className='text-center'>Email address</Form.Label>
					<Form.Control type='email' placeholder='Enter email' required />
				</Form.Group>

				<Form.Group className={styles.Margins} controlId='idRegisterPassword'>
					<Form.Label>Password</Form.Label>
					<Form.Control type='password' placeholder='Password' required />
				</Form.Group>
				<div className='d-grid'>
					<Button variant='primary' type='submit'>
						Register
					</Button>
				</div>
			</Form>
		</div>
	);
};

RegisterForm.propTypes = propTypes;
RegisterForm.defaultProps = defaultProps;

export default RegisterForm;
