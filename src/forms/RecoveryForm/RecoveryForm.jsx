import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import styles from './RecoveryForm.module.scss';
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
	Title: 'RecoveryForm.Title',
};

const RecoveryForm = ({ className, testId, id }) => {
	const recoveryFormClassNames = classnames(styles.RecoveryForm, className);
	const { t } = useTranslation();

	const submitForm = e => {
		e.preventDefault();
	};

	return (
		<div className={recoveryFormClassNames} data-testid={testId} id={id}>
			<span>{t(texts.Title)}</span>
			<Form onSubmit={submitForm}>
				<Form.Group   controlId='idRecoveryEmail'>
					<Form.Label className='text-center'>Email address</Form.Label>
					<Form.Control type='email' placeholder='Enter email' required />
				</Form.Group>
				<div className='d-grid'>
					<Button variant='primary' type='submit'>
						Recuperar
					</Button>
				</div>
			</Form>
		</div>
	);
};

RecoveryForm.propTypes = propTypes;
RecoveryForm.defaultProps = defaultProps;

export default RecoveryForm;
