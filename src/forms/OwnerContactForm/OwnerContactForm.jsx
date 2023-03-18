import React, { useState } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import styles from './OwnerContactForm.module.scss';
import {  Col, FloatingLabel, Form, Row } from 'react-bootstrap';

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

const OwnerContactForm = ({ className, testId, id }) => {
	const OwnerContactFormClassNames = classnames(styles.OwnerContactForm, className);
	const [validated, setValidated] = useState(false);

	const handleSubmit = event => {
		const form = event.currentTarget;
		if (form.checkValidity() === false) {
			event.preventDefault();
			event.stopPropagation();
			console.log(event);
		}

		setValidated(true);
	};

	return (
		<div className={OwnerContactFormClassNames} data-testid={testId} id={id}>
			<Form noValidate validated={validated} onSubmit={handleSubmit}>
				<Row className={styles.Margins}>
					<Form.Group as={Col} md='4' className={styles.Margins} controlId='validationCustom01'>
						<FloatingLabel controlId='floatingInputGrid' label='Nombre propietario'>
							<Form.Control type='text' placeholder='' />
						</FloatingLabel>
					</Form.Group>
					<Form.Group as={Col} md='4' className={styles.Margins} controlId='validationCustom01'>
						<FloatingLabel controlId='floatingInputGrid' label='Telefono propietario'>
							<Form.Control type='text' placeholder='' />
						</FloatingLabel>
					</Form.Group>
					<Form.Group as={Col} md='4' className={styles.Margins} controlId='validationCustom01'>
						<FloatingLabel controlId='floatingInputGrid' label='Email propietario'>
							<Form.Control type='text' placeholder='' />
						</FloatingLabel>
					</Form.Group>
				</Row>
			</Form>
		</div>
	);
};

OwnerContactForm.propTypes = propTypes;
OwnerContactForm.defaultProps = defaultProps;

export default OwnerContactForm;
