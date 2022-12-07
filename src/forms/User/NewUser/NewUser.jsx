import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { Button, Form } from 'react-bootstrap';

import styles from './NewUser.module.scss';
import { useTranslation } from 'react-i18next';

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
	Title: 'NewUser.Title',
};

const NewUser = ({ className, testId, id }) => {
	const newUserClassNames = classnames(styles.NewUser, className);
	const { t } = useTranslation();

	const submitForm = e => {
		e.preventDefault();
		console.log('submitting form');
	};
	return (
		<div className={newUserClassNames} data-testid={testId} id={id}>
			<span>{t(texts.Title)}</span>
			<Form onSubmit={submitForm}>
				<Form.Group className='mb-3' controlId='idFormName'>
					<Form.Label className='text-center'>Name</Form.Label>
					<Form.Control type='text' placeholder='Name' required />
				</Form.Group>

				<Form.Group className='mb-3' controlId='idRegisterEmail'>
					<Form.Label className='text-center'>Email address</Form.Label>
					<Form.Control type='email' placeholder='Enter email' required />
				</Form.Group>

				<Form.Group className='mb-3' controlId='idRegisterPassword'>
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

NewUser.propTypes = propTypes;
NewUser.defaultProps = defaultProps;

export default NewUser;
