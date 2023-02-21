import React, { useState } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import styles from './NewFlatForm.module.scss';
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

const NewFlatForm = ({ className, testId, id }) => {
	const newFlatFormClassNames = classnames(styles.NewFlatForm, className);
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
		<div className={newFlatFormClassNames} data-testid={testId} id={id}>
			<Form noValidate validated={validated} onSubmit={handleSubmit}>
				<Row className='mb-3'>
					<Form.Group as={Col} md='4' className='mb-3' controlId='validationCustom01'>
						<FloatingLabel controlId='floatingInputGrid' label='Nombre'>
							<Form.Control type='text' placeholder='' />
						</FloatingLabel>
					</Form.Group>
					<Form.Group as={Col} md='4' className='mb-3' controlId='validationCustom01'>
						<FloatingLabel controlId='floatingInputGrid' label='Telefono'>
							<Form.Control type='text' placeholder='' />
						</FloatingLabel>
					</Form.Group>
					<Form.Group as={Col} md='4' className='mb-3' controlId='validationCustom01'>
						<FloatingLabel controlId='floatingInputGrid' label='Email'>
							<Form.Control type='text' placeholder='' />
						</FloatingLabel>
					</Form.Group>
				</Row>
			</Form>
		</div>
	);
};

NewFlatForm.propTypes = propTypes;
NewFlatForm.defaultProps = defaultProps;

export default NewFlatForm;
