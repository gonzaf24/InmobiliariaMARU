import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import styles from './OwnerContactForm.module.scss';
import { Row } from 'react-bootstrap';
import { InputText } from '../../components/inputs';

const propTypes = {
	className: PropTypes.string,
	testId: PropTypes.string,
	id: PropTypes.string,
	name: PropTypes.string,
	onNameChange: PropTypes.func,
	phone: PropTypes.string,
	onPhoneChange: PropTypes.func,
	email: PropTypes.string,
	onEmailChange: PropTypes.func,
};

const defaultProps = {
	className: '',
	testId: undefined,
	id: undefined,
	name: undefined,
	onNameChange: () => {},
	phone: undefined,
	onPhoneChange: () => {},
	email: undefined,
	onEmailChange: () => {},
};

const OwnerContactForm = ({ className, testId, id, name, onNameChange, phone, onPhoneChange, email, onEmailChange }) => {
	const OwnerContactFormClassNames = classnames(styles.OwnerContactForm, className);

	return (
		<div className={OwnerContactFormClassNames} data-testid={testId} id={id}>
			<Row>
				<InputText colsWidth={4} label='Nombre propietario' value={name} onChange={onNameChange} isRequired />
				<InputText colsWidth={4} label='Telefono propietario' value={phone} onChange={onPhoneChange} />
				<InputText colsWidth={4} label='Email propietario' value={email} onChange={onEmailChange} />
			</Row>
		</div>
	);
};

OwnerContactForm.propTypes = propTypes;
OwnerContactForm.defaultProps = defaultProps;

export default OwnerContactForm;
