import React, { useState } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import styles from './EditUser.module.scss';
import { Button, FloatingLabel, Form } from 'react-bootstrap';
import Loader from '../../../components/Loader/Loader';

export const USERS_TYPES = {
	USER: 'user',
	ADMIN: 'admin',
};

const propTypes = {
	className: PropTypes.string,
	testId: PropTypes.string,
	id: PropTypes.string,
	data: PropTypes.shape({
		id: PropTypes.string,
		username: PropTypes.string,
		name: PropTypes.string,
		type: PropTypes.string,
	}),
	onClose: PropTypes.func,
};

const defaultProps = {
	className: '',
	testId: undefined,
	id: undefined,
	data: {
		id: '',
		username: '',
		name: '',
		type: USERS_TYPES.USER,
	},
	onClose: undefined,
};

const EditUser = ({ className, testId, id, data, onClose }) => {
	const editUserClassNames = classnames(styles.EditUser, className);
	const [type, setType] = useState(data.type);
	const [name, setName] = useState(data.name);
	const [isLoading, setIsLoading] = useState(false);
	const [errors, setErrors] = useState({
		name: false,
		type: false,
	});

	const handleChange = event => {
		if (event.target.name === 'name') {
			setName(event.target.value);
			setErrors({ ...errors, name: false });
		} else if (event.target.name === 'type') {
			setType(event.target.value);
			setErrors({ ...errors, type: false });
		}
	};

	const validateForm = (name, type) => {
		let isValid = true;
		const errorsObj = {
			name: false,
			type: false,
		};
		if (!name) {
			errorsObj.name = true;
			isValid = false;
		}
		if (!type) {
			errorsObj.type = true;
			isValid = false;
		}
		setErrors(errorsObj);
		return isValid;
	};

	const submitForm = async e => {
		e.preventDefault();
		setIsLoading(true);
		const name = e.target.idFormEditName.value;
		const type = e.target.idFormType.value;
		const isValid = validateForm(name, type);
		console.log('isValid', isValid);
		setIsLoading(false);
	};

	const hasErrors = Object.keys(errors).some(key => errors[key] === true);

	return (
		<div className={editUserClassNames} data-testid={testId} id={id}>
			<Form onSubmit={submitForm} className={styles.Form} noValidate>
				<FloatingLabel controlId='idFormEditId' label='Id'>
					<Form.Control type='text' placeholder='' disabled value={data.id} />
				</FloatingLabel>
				<FloatingLabel controlId='idFormEditUserName' label='Username'>
					<Form.Control
						type='text'
						placeholder='Username'
						disabled
						value={data.username}
					/>
				</FloatingLabel>
				<FloatingLabel controlId='idFormEditName' label='Name'>
					<Form.Control
						type='text'
						name='name'
						isInvalid={errors.name}
						placeholder='Name'
						required
						value={name}
						onChange={handleChange}
					/>
				</FloatingLabel>
				<FloatingLabel controlId='idFormType' label='Type'>
					<Form.Select
						aria-label='Select type'
						defaultValue={type}
						name='type'
						isInvalid={errors.type}
						required
						onChange={handleChange}
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
							Accept
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

EditUser.propTypes = propTypes;
EditUser.defaultProps = defaultProps;

export default EditUser;
