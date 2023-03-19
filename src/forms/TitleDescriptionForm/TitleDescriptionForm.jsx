import React, { useState } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import styles from './TitleDescriptionForm.module.scss';
import { Col, FloatingLabel, Form, Row } from 'react-bootstrap';

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

const TitleDescriptionForm = ({ className, testId, id }) => {
	const titleDescriptionFormClassNames = classnames(styles.TitleDescriptionForm, className);
	const [validated, setValidated] = useState(false);

	const handleSubmit = event => {
		const form = event.currentTarget;
		if (form.checkValidity() === false) {
			event.preventDefault();
			event.stopPropagation();
		}

		setValidated(true);
	};



	return (
		<div className={titleDescriptionFormClassNames} data-testid={testId} id={id}>
			<Form noValidate validated={validated} onSubmit={handleSubmit}>
				<Row className={styles.Margins}>
					<Form.Group as={Col} md='12' className={styles.Margins} controlId='validationCustom01'>
						<FloatingLabel controlId='validationCustom01' label='Titulo'>
							<Form.Control type='text' placeholder='' />
						</FloatingLabel>
					</Form.Group>
					<Form.Group as={Col} md='12' className={styles.Margins} controlId='validationCustom02'>
						<FloatingLabel controlId='validationCustom02' label='Descripción'>
							<Form.Control as='textarea' placeholder=''  className={styles.TextArea}/>
						</FloatingLabel>
					</Form.Group>
				</Row>
			</Form>
		</div>
	);
};

TitleDescriptionForm.propTypes = propTypes;
TitleDescriptionForm.defaultProps = defaultProps;

export default TitleDescriptionForm;
