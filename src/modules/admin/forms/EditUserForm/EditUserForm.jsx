import React, { useState } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import { FloatingLabel, Form } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { USERS_TYPES, Button, Loader, useUser } from '../../../common';
import useToastContext from '../../../../context/toastContext';
import useUserContext from '../../../../context/userContext';

import styles from './EditUserForm.module.scss';

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
	onSuccess: PropTypes.func,
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
	onSuccess: undefined,
};

const texts = {
	Accept: 'Accept',
	Cancel: 'Cancel',
};

const EditUserForm = ({ className, testId, id, data, onClose, onSuccess }) => {
	const editUserFormClassNames = classnames(styles.EditUserForm, className);
	const { editUser, errorMessage } = useUser();
	const { addSuccessToast, addErrorToast } = useToastContext();
	const [type, setType] = useState(data.type);
	const [name, setName] = useState(data.name);
	const [loading, setLoading] = useState(false);
	const { user } = useUserContext();
	const { t } = useTranslation();
	const [errors, setErrors] = useState({
		name: false,
		type: false,
	});
	const isSameUser = user.id === data.id;

	const handleChange = event => {
		if (event.target.name === 'name') {
			setName(event.target.value);
			setErrors({ ...errors, name: false });
		} else if (event.target.name === 'type') {
			setType(event.target.value);
			setErrors({ ...errors, type: false });
		}
	};

	const validateForm = user => {
		let isValid = true;
		const errorsObj = {
			name: false,
			type: false,
		};
		if (!user.name) {
			errorsObj.name = true;
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
		e.preventDefault();
		setLoading(true);
		const id = e.target.idFormEditId.value;
		const name = e.target.idFormEditName.value;
		const type = e.target.idFormType.value;
		const user = { id, name, type };
		const isValid = validateForm(user);
		if (isValid) {
			const userOut = await editUser(user);
			if (userOut === true) {
				if (onClose) {
					addSuccessToast(`User ${name} edited successfully!`);
					onSuccess();
					onClose();
				}
			} else {
				addErrorToast(t(userOut));
				addErrorToast(t(errorMessage));
			}
		}
		setLoading(false);
	};

	const hasErrors = Object.keys(errors).some(key => errors[key] === true);

	return (
		<div className={editUserFormClassNames} data-testid={testId} id={id}>
			<Form onSubmit={submitForm} className={styles.Form} noValidate>
				<FloatingLabel controlId='idFormEditId' label='Id'>
					<Form.Control type='text' placeholder='' disabled value={data.id} />
				</FloatingLabel>
				<FloatingLabel controlId='idFormEditUserFormName' label='Username'>
					<Form.Control type='text' placeholder='Username' disabled value={data.username} />
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
						disabled={loading}
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
						disabled={loading || isSameUser}
					>
						<option value={USERS_TYPES.USER}>{USERS_TYPES.USER}</option>
						<option value={USERS_TYPES.ADMIN}>{USERS_TYPES.ADMIN}</option>
					</Form.Select>
				</FloatingLabel>
				{loading && <Loader animation='border' variant='primary' />}
				{!loading && (
					<div className={styles.Footer}>
						<Button isSecondary onClick={onClose} isLoading={loading}>
							{t(texts.Cancel)}
						</Button>
						<Button isPrimary type='submit' isLoading={loading} isDisabled={hasErrors}>
							{t(texts.Accept)}
						</Button>
					</div>
				)}
			</Form>
		</div>
	);
};

EditUserForm.propTypes = propTypes;
EditUserForm.defaultProps = defaultProps;

export default EditUserForm;
