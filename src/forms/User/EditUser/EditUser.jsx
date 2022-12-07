import React, { useState } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import styles from './EditUser.module.scss';
/* import { useTranslation } from 'react-i18next';
 */ import { Button, Form } from 'react-bootstrap';

const USERS_TYPES = {
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
};

/* const texts = {
	Title: 'EditUser.Title',
}; */

const EditUser = ({ className, testId, id, data }) => {
	const editUserClassNames = classnames(styles.EditUser, className);
	const [type, setType] = useState(data.type);
	const [name, setName] = useState(data.name);
	/* 	const { t } = useTranslation();
	 */
	const submitForm = e => {
		e.preventDefault();
		console.log('submitting form ... ', name, '  and  ', type);
	};

	const handleName = e => {
		setName(e.target.value);
	};

	const handleSelectType = e => {
		setType(e.target.value);
	};

	return (
		<div className={editUserClassNames} data-testid={testId} id={id}>
			{/* <span>{t(texts.Title)}</span> */}
			<Form onSubmit={submitForm} className={styles.Form}>
				<Form.Group controlId='idFormEditUserName'>
					<Form.Control type='text' placeholder='Id' disabled value={data.id} />
				</Form.Group>
				<Form.Group controlId='idFormEditUserName'>
					<Form.Control
						className={styles.InputDisabled}
						type='text'
						placeholder='Username'
						disabled
						value={data.username}
						onChange={e => console.log(e.target.value)}
					/>
				</Form.Group>
				<Form.Group controlId='idFormEditName'>
					<Form.Control
						type='text'
						placeholder='Name'
						required
						value={name}
						onChange={handleName}
					/>
				</Form.Group>
				<Form.Select
					aria-label='Select type'
					defaultValue={type}
					onChange={handleSelectType}
				>
					<option value='user'>user</option>
					<option value='admin'>admin</option>
				</Form.Select>
				<div className={styles.Footer}>
					<Button variant='primary' type='submit' className='w-100'>
						Cancel
					</Button>
					<Button variant='primary' type='submit' className='w-100'>
						Confirm
					</Button>
				</div>
			</Form>
		</div>
	);
};

EditUser.propTypes = propTypes;
EditUser.defaultProps = defaultProps;

export default EditUser;
