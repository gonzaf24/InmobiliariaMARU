import React, { useCallback, useState } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import styles from './InputDate.module.scss';
import { Col, FloatingLabel, Form } from 'react-bootstrap';

const propTypes = {
	className: PropTypes.string,
	testId: PropTypes.string,
	id: PropTypes.string,
	value: PropTypes.string,
	onChange: PropTypes.func,
	label: PropTypes.string,
	placeholder: PropTypes.string,
	colsWidth: PropTypes.number,
};

const defaultProps = {
	className: '',
	testId: undefined,
	id: undefined,
	value: '',
	onChange: () => {},
	label: '',
	placeholder: '',
	colsWidth: 12,
};

const InputDate = ({ className, testId, id, colsWidth, value, onChange, label, placeholder }) => {
	const handleChange = useCallback(
		event => {
			onChange(event.target.value);
		},
		[onChange]
	);

	const [inputId] = useState(`input_${Math.random().toString(36).substr(2, 9)}`);
	const inputDateClassNames = classnames(styles.InputDate, className);

	return (
		<Form.Group className={inputDateClassNames} data-testid={testId} id={id} as={Col} md={colsWidth} controlId={inputId}>
			<FloatingLabel controlId={`date_${inputId}`} label={label}>
				<Form.Control type='date' placeholder={placeholder} value={value} onChange={handleChange} />
			</FloatingLabel>
		</Form.Group>
	);
};

InputDate.propTypes = propTypes;
InputDate.defaultProps = defaultProps;

export default InputDate;
