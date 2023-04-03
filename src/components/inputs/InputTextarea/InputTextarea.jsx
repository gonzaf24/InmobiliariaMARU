import React, { useCallback, useState } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import styles from './InputTextarea.module.scss';
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

const InputTextarea = ({ className, testId, id, colsWidth, value, onChange, label, placeholder }) => {
	const handleChange = useCallback(
		event => {
			onChange(event.target.value);
		},
		[onChange]
	);

	const [inputId] = useState(`input_${Math.random().toString(36).substr(2, 9)}`);
	const inputTextareaClassNames = classnames(styles.InputTextarea, className);

	return (
		<Form.Group className={inputTextareaClassNames} data-testid={testId} id={id} as={Col} md={colsWidth} controlId={inputId}>
			<FloatingLabel controlId={`textarea_${inputId}`} label={label}>
				<Form.Control
					as='textarea'
					placeholder={placeholder}
					value={value}
					onChange={handleChange}
					className={styles.TextArea}
				/>
			</FloatingLabel>
		</Form.Group>
	);
};

InputTextarea.propTypes = propTypes;
InputTextarea.defaultProps = defaultProps;

export default InputTextarea;
