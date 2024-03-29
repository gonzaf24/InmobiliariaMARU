import React, { useState } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import styles from './InputSelectGeography.module.scss';
import { Col, FloatingLabel, Form } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

const propTypes = {
	className: PropTypes.string,
	testId: PropTypes.string,
	id: PropTypes.string,
	value: PropTypes.string,
	onChange: PropTypes.func,
	label: PropTypes.string,
	colsWidth: PropTypes.number,
	isDisabled: PropTypes.bool,
	options: PropTypes.arrayOf(PropTypes.string),
	defaultValue: PropTypes.shape({ value: PropTypes.string, label: PropTypes.string }),
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
	isDisabled: false,
	defaultValue: undefined,
	isRequired: false,
};

const InputSelectGeography = ({
	className,
	testId,
	id,
	colsWidth,
	value,
	onChange,
	label,
	options,
	isDisabled,
	defaultValue,
	isRequired,
}) => {
	const { t } = useTranslation();
	const [inputId] = useState(`input_${Math.random().toString(36).substr(2, 9)}`);
	const inputSelectGeographyClassNames = classnames(styles.InputSelectGeography, className);

	return (
		<Form.Group
			className={inputSelectGeographyClassNames}
			data-testid={testId}
			id={id}
			as={Col}
			md={colsWidth}
			controlId={inputId}
		>
			<FloatingLabel controlId={`text_${inputId}`} label={label}>
				<Form.Select aria-label='Select' value={value} onChange={onChange} disabled={isDisabled} required={isRequired}>
					{defaultValue && <option value={defaultValue.value}>{t(defaultValue.label)}</option>}
					{options.map((value, index) => {
						return (
							<option key={index} value={value}>
								{value}
							</option>
						);
					})}
				</Form.Select>
			</FloatingLabel>
		</Form.Group>
	);
};

InputSelectGeography.propTypes = propTypes;
InputSelectGeography.defaultProps = defaultProps;

export default InputSelectGeography;
