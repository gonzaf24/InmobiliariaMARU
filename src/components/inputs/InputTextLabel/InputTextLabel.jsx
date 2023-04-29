import React, { useCallback, useState } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import styles from './InputTextLabel.module.scss';
import { Col, FloatingLabel, Form, InputGroup } from 'react-bootstrap';

const propTypes = {
	className: PropTypes.string,
	testId: PropTypes.string,
	id: PropTypes.string,
	value: PropTypes.string,
	onChange: PropTypes.func,
	label: PropTypes.string,
	placeholder: PropTypes.string,
	colsWidth: PropTypes.number,
	text: PropTypes.string,
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
	text: '',
};

const InputTextLabel = ({ className, testId, id, colsWidth, value, onChange, label, text, placeholder }) => {
	const handleChange = useCallback(
		event => {
			onChange(event.target.value);
		},
		[onChange]
	);

	const [inputId] = useState(`input_${Math.random().toString(36).substr(2, 9)}`);
	const inputTextlabelClassNames = classnames(styles.InputTextLabel, className);

	return (
		<Form.Group
			className={inputTextlabelClassNames}
			data-testid={testId}
			id={id}
			as={Col}
			md={colsWidth}
			controlId={inputId}
		>
			<InputGroup className={styles.Wrapper}>
				<FloatingLabel controlId={`text_${inputId}`} label={label}>
					<Form.Control type='text' placeholder={placeholder} value={value} onChange={handleChange} />
				</FloatingLabel>
				<InputGroup.Text className={styles.Label} id={`text_${inputId}`}>{text}</InputGroup.Text>
			</InputGroup>
		</Form.Group>
	);
};

InputTextLabel.propTypes = propTypes;
InputTextLabel.defaultProps = defaultProps;

export default InputTextLabel;
