import React, { useState } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { Button, FloatingLabel, Form } from 'react-bootstrap';
import Loader from '../../../components/Loader/Loader';
import styles from './NewUser.module.scss';
import useToastContext from '../../../context/toastContext';
import { USERS_TYPES } from '../../../utils/constants';
import { useUser } from '../../../hooks';

const propTypes = {
	className: PropTypes.string,
	testId: PropTypes.string,
	id: PropTypes.string,
	onClose: PropTypes.func,
	onSuccess: PropTypes.func,
};

const defaultProps = {
	className: '',
	testId: undefined,
	id: undefined,
	onClose: undefined,
	onSuccess: undefined,
};

const EMAIL_REGEX = /^[a-z0-9]+(.[_a-z0-9]+)*@[a-z0-9-]+(.[a-z0-9-]+)*(.[a-z]{2,15})$/;

const texts = {
	Create: 'Create',
	Cancel: 'Cancel',
};

const NewUser = ({ className, testId, id, onClose, onSuccess }) => {
	const newUserClassNames = classnames(styles.NewUser, className);
	const inputClassNames = classnames('form-control', styles.TextInput);
	const { newUser, errorMessage } = useUser();
	const { addSuccessToast, addErrorToast } = useToastContext();
	const [loading, setLoading] = useState(false);
	const [fullName, setFullName] = useState('');
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [type, setType] = useState(USERS_TYPES.USER);

	const { t } = useTranslation();

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

	const validateForm = user => {
		let isValid = true;
		const errorsObj = {
			fullname: false,
			username: false,
			password: false,
			type: false,
		};
		if (!user.name) {
			errorsObj.fullname = true;
			isValid = false;
		}
		if (!user.username) {
			errorsObj.username = true;
			isValid = false;
		}
		if (!EMAIL_REGEX.exec(user.username)) {
			errorsObj.username = true;
			isValid = false;
		}
		if (!user.password) {
			errorsObj.password = true;
			isValid = false;
		}
		if (!user.type) {
			errorsObj.type = true;
			isValid = false;
		}
		setErrors(errorsObj);
		return isValid;
	};

	const submitForm = async e => {
		try {
			e.preventDefault();
			setLoading(true);
			const name = e.target.idFormNewUserName.value;
			const username = e.target.idFormNewUserUserName.value;
			const password = e.target.idFormNewUserPassword.value;
			const type = e.target.idFormNewUserType.value;
			const user = { name, username, password, type };
			const isValid = validateForm(user);
			if (isValid) {
				const userStored = await newUser(user);
				if (userStored) {
					if (onClose) {
						addSuccessToast(`User ${username} created successfully!`);
						onSuccess();
						onClose();
					}
				} else {
					addErrorToast(t(errorMessage));
				}
			}
			setLoading(false);
		} catch (error) {
			setLoading(false);
		}
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
						disabled={loading}
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
						disabled={loading}
					/>
					<Form.Control.Feedback type='invalid'>Please provide a valid email.</Form.Control.Feedback>
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
						disabled={loading}
					/>
				</FloatingLabel>

				<FloatingLabel controlId='idFormNewUserType' label='Type'>
					<Form.Select
						className={inputClassNames}
						isInvalid={errors.type}
						defaultValue={type}
						name='type'
						onChange={handleChange}
						disabled={loading}
					>
						<option value={USERS_TYPES.USER}>{USERS_TYPES.USER}</option>
						<option value={USERS_TYPES.ADMIN}>{USERS_TYPES.ADMIN}</option>
					</Form.Select>
				</FloatingLabel>

				{loading && <Loader animation='border' variant='primary' />}
				{!loading && (
					<div className={styles.Footer}>
						<Button variant='primary' type='submit' className='w-100' disabled={hasErrors}>
							{t(texts.Create)}
						</Button>
						<Button variant='danger' className='w-100' onClick={onClose}>
							{t(texts.Cancel)}
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
