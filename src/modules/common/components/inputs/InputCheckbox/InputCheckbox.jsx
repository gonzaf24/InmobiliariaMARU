import React, { useCallback, useState } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import styles from './InputCheckbox.module.scss';
import { Col, Form } from 'react-bootstrap';

const propTypes = {
	className: PropTypes.string,
	testId: PropTypes.string,
	id: PropTypes.string,
	value: PropTypes.bool,
	onChange: PropTypes.func,
	label: PropTypes.string,
	colsWidth: PropTypes.number,
	type: PropTypes.string,
	isDisabled: PropTypes.bool,
};

const defaultProps = {
	className: '',
	testId: undefined,
	id: undefined,
	value: false,
	onChange: () => {},
	label: '',
	colsWidth: 12,
	type: 'checkbox',
	isDisabled: false,
};

const InputCheckbox = ({ className, testId, id, colsWidth, value, onChange, label, type, isDisabled }) => {
	const handleChange = useCallback(
		event => {
			onChange(event.target.checked);
		},
		[onChange]
	);

	const [inputId] = useState(`input_${Math.random().toString(36).substr(2, 9)}`);
	const inputCheckboxClassNames = classnames(styles.InputCheckbox, className);

	return (
		<Form.Group className={inputCheckboxClassNames} data-testid={testId} id={id} as={Col} md={colsWidth} controlId={inputId}>
			<Form.Check
				type={type}
				id={id}
				label={label}
				checked={value}
				value={value}
				onChange={handleChange}
				disabled={isDisabled}
			/>
		</Form.Group>
	);
};

InputCheckbox.propTypes = propTypes;
InputCheckbox.defaultProps = defaultProps;

export default InputCheckbox;
