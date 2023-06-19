import React, { useCallback, useState } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import styles from './InputSelect.module.scss';
import { Col, FloatingLabel, Form } from 'react-bootstrap';
import { SELECTORS } from '../../../utils';
import { useTranslation } from 'react-i18next';

const propTypes = {
	className: PropTypes.string,
	testId: PropTypes.string,
	id: PropTypes.string,
	value: PropTypes.string,
	onChange: PropTypes.func,
	label: PropTypes.string,
	colsWidth: PropTypes.number,
	options: PropTypes.arrayOf(PropTypes.shape({ value: PropTypes.string, label: PropTypes.string })),
	defaultValue: PropTypes.string,
	isRequired: PropTypes.bool,
};

const defaultProps = {
	className: '',
	testId: undefined,
	id: undefined,
	value: '',
	onChange: () => {},
	label: '',
	colsWidth: 12,
	options: [],
	defaultValue: undefined,
	isRequired: false,
};

const InputSelect = ({ className, testId, id, colsWidth, value, onChange, label, options, isRequired, defaultValue }) => {
	const { t } = useTranslation();
	const handleChange = useCallback(
		event => {
			const _value = event.target.value;
			console.log(_value);
			if (_value === SELECTORS.DEFUALT_SELECTOR) {
				return;
			}
			onChange(event.target.value);
		},
		[onChange]
	);

	const [inputId] = useState(`input_${Math.random().toString(36).substr(2, 9)}`);
	const inputSelectClassNames = classnames(styles.InputSelect, className);

	return (
		<Form.Group className={inputSelectClassNames} data-testid={testId} id={id} as={Col} md={colsWidth} controlId={inputId}>
			<FloatingLabel controlId={`text_${inputId}`} label={label}>
				<Form.Select aria-label='Select' value={value} onChange={handleChange} required={isRequired}>
					{defaultValue && <option value={defaultValue}>{t(defaultValue)}</option>}
					{options?.map((option, index) => {
						return (
							<option key={index} value={option.value}>
								{t(option.label)}
							</option>
						);
					})}
				</Form.Select>
			</FloatingLabel>
		</Form.Group>
	);
};

InputSelect.propTypes = propTypes;
InputSelect.defaultProps = defaultProps;

export default InputSelect;
