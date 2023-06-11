import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import styles from './TypeOperationForm.module.scss';
import { Row } from 'react-bootstrap';
import { DEFUALT_SELECTOR, SELECTORS } from '../../utils/constants';
import { InputNumberLabel, InputSelect } from '../../components';

const propTypes = {
	className: PropTypes.string,
	testId: PropTypes.string,
	id: PropTypes.string,
	operation: PropTypes.string,
	onOperationChange: PropTypes.func,
	price: PropTypes.string,
	onPriceChange: PropTypes.func,
};

const defaultProps = {
	className: '',
	testId: undefined,
	id: undefined,
	operation: '',
	onOperationChange: () => {},
	price: undefined,
	onPriceChange: () => {},
};

const PROPERTY_ACQUISITION_OPTIONS = Object.values(SELECTORS.PROPERTY_ACQUISITION_OPTIONS);

const TypeOperationForm = ({ className, testId, id, operation, onOperationChange, price, onPriceChange }) => {
	const typeOperationFormClassNames = classnames(styles.TypeOperationForm, className);

	return (
		<div className={typeOperationFormClassNames} data-testid={testId} id={id}>
			<Row>
				<InputSelect
					colsWidth={2}
					label='Operacion'
					options={PROPERTY_ACQUISITION_OPTIONS}
					value={operation}
					onChange={onOperationChange}
					isRequired
					defaultValue={DEFUALT_SELECTOR}
				/>
				<InputNumberLabel colsWidth={2} label='Precio' text={'€'} value={price} onChange={onPriceChange} isRequired />
			</Row>
		</div>
	);
};

TypeOperationForm.propTypes = propTypes;
TypeOperationForm.defaultProps = defaultProps;

export default TypeOperationForm;
