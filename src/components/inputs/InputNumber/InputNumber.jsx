import React, { useCallback, useState } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import styles from './InputNumber.module.scss';
import { Col, FloatingLabel, Form } from 'react-bootstrap';

const propTypes = {
	className: PropTypes.string,
	testId: PropTypes.string,
	id: PropTypes.string,
	value: PropTypes.number,
	onChange: PropTypes.func,
	label: PropTypes.string,
	placeholder: PropTypes.string,
	colsWidth: PropTypes.number,
};

const defaultProps = {
	className: '',
	testId: undefined,
	id: undefined,
	value: undefined,
	onChange: () => {},
	label: '',
	placeholder: '',
	colsWidth: 12,
};

const InputNumber = ({ className, testId, id, colsWidth, value, onChange, label, placeholder }) => {
	const handleChange = useCallback(
		event => {
			onChange(Number(event.target.value));
		},
		[onChange]
	);

	const [inputId] = useState(`input_${Math.random().toString(36).substr(2, 9)}`);
	const inputNumberClassNames = classnames(styles.InputNumber, className);

	return (
		<Form.Group className={inputNumberClassNames} data-testid={testId} id={id} as={Col} md={colsWidth} controlId={inputId}>
			<FloatingLabel controlId={`number_${inputId}`} label={label}>
				<Form.Control type='number' placeholder={placeholder} value={value} onChange={handleChange} />
			</FloatingLabel>
		</Form.Group>
	);
};

InputNumber.propTypes = propTypes;
InputNumber.defaultProps = defaultProps;

export default InputNumber;
