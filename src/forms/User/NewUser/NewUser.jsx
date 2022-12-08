import React, { useState } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { Button, FloatingLabel, Form } from 'react-bootstrap';

import { USERS_TYPES } from '../EditUser/EditUser';
import styles from './NewUser.module.scss';
import Loader from '../../../components/Loader/Loader';

const propTypes = {
	className: PropTypes.string,
	testId: PropTypes.string,
	id: PropTypes.string,
	onClose: PropTypes.func,
};

const defaultProps = {
	className: '',
	testId: undefined,
	id: undefined,
	onClose: undefined,
};

const EMAIL_REGEX =
	/^[a-z0-9]+(.[_a-z0-9]+)*@[a-z0-9-]+(.[a-z0-9-]+)*(.[a-z]{2,15})$/;

const NewUser = ({ className, testId, id, onClose }) => {
	const newUserClassNames = classnames(styles.NewUser, className);
	const inputClassNames = classnames('form-control', styles.TextInput);
	const [isLoading, setIsLoading] = useState(false);

	const [fullName, setFullName] = useState('');
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [type, setType] = useState(USERS_TYPES.USER);
	const [errors, setErrors] = useState({
		fullname: false,
		username: false,
		password: false,
		type: false,
	});

	const handleChange = event => {
		if (event.target.name === 'fullname') {
			setFullName(event.target.value);
			setErrors({ ...errors, fullname: false });
		} else if (event.target.name === 'username') {
			setUsername(event.target.value);
			setErrors({ ...errors, username: false });
		} else if (event.target.name === 'password') {
			setPassword(event.target.value);
			setErrors({ ...errors, password: false });
		} else if (event.target.name === 'type') {
			setType(event.target.value);
			setErrors({ ...errors, type: false });
		}
	};

	const validateForm = (name, username, password, type) => {
		let isValid = true;
		const errorsObj = {
			fullname: false,
			username: false,
			password: false,
			type: false,
		};
		if (!name) {
			errorsObj.fullname = true;
			isValid = false;
		}
		if (!username) {
			errorsObj.username = true;
			isValid = false;
		}
		if (!EMAIL_REGEX.exec(username)) {
			errorsObj.username = true;
			isValid = false;
		}
		if (!password) {
			errorsObj.password = true;
			isValid = false;
		}
		if (!type) {
			errorsObj.type = true;
			isValid = false;
		}
		setErrors(errorsObj);
		return isValid;
	};

	const submitForm = e => {
		e.preventDefault();
		setIsLoading(true);
		const name = e.target.idFormNewUserName.value;
		const username = e.target.idFormNewUserUserName.value;
		const password = e.target.idFormNewUserPassword.value;
		const type = e.target.idFormNewUserType.value;
		const isValid = validateForm(name, username, password, type);
		console.log('isValid', isValid);
		setIsLoading(false);
	};

	const hasErrors = Object.keys(errors).some(key => errors[key] === true);

	return (
		<div className={newUserClassNames} data-testid={testId} id={id}>
			<Form onSubmit={submitForm} className={styles.Form} noValidate>
				<FloatingLabel controlId='idFormNewUserName' label='Full Name'>
					<Form.Control
						className={inputClassNames}
						isInvalid={errors.fullname}
						type='text'
						name='fullname'
						placeholder='Full Name'
						defaultValue={fullName}
						autoComplete='new-password'
						onChange={handleChange}
						disabled={isLoading}
					/>
				</FloatingLabel>

				<FloatingLabel controlId='idFormNewUserUserName' label='Email'>
					<Form.Control
						className={inputClassNames}
						isInvalid={errors.username}
						type='email'
						name='username'
						placeholder='Email'
						value={username}
						autoComplete='new-password'
						onChange={handleChange}
						disabled={isLoading}
					/>
					<Form.Control.Feedback type='invalid'>
						Please provide a valid email.
					</Form.Control.Feedback>
				</FloatingLabel>

				<FloatingLabel controlId='idFormNewUserPassword' label='Password'>
					<Form.Control
						className={inputClassNames}
						isInvalid={errors.password}
						type='password'
						name='password'
						placeholder='Password'
						value={password}
						autoComplete='new-password'
						onChange={handleChange}
						disabled={isLoading}
					/>
				</FloatingLabel>

				<FloatingLabel controlId='idFormNewUserType' label='Type'>
					<Form.Select
						className={inputClassNames}
						isInvalid={errors.type}
						defaultValue={type}
						name='type'
						onChange={handleChange}
						disabled={isLoading}
					>
						<option value={USERS_TYPES.USER}>{USERS_TYPES.USER}</option>
						<option value={USERS_TYPES.ADMIN}>{USERS_TYPES.ADMIN}</option>
					</Form.Select>
				</FloatingLabel>

				{isLoading && <Loader animation='border' variant='primary' />}
				{!isLoading && (
					<div className={styles.Footer}>
						<Button
							variant='primary'
							type='submit'
							className='w-100'
							disabled={hasErrors}
						>
							Create
						</Button>
						<Button variant='danger' className='w-100' onClick={onClose}>
							Cancel
						</Button>
					</div>
				)}
			</Form>
		</div>
	);
};

NewUser.propTypes = propTypes;
NewUser.defaultProps = defaultProps;

export default NewUser;
