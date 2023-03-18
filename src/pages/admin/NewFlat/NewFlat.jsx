import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import styles from './NewFlat.module.scss';
import { useTranslation } from 'react-i18next';
import { OwnerContactForm, SearchAddressForm } from '../../../forms';
import AddressForm from '../../../forms/AddressForm/AddressForm';
import Property from '../../../forms/Property/Property';
import TypeOperationForm from '../../../forms/TypeOperationForm/TypeOperationForm';
import { Button } from 'react-bootstrap';

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

const texts = {
	Title: 'NewFlat.Title',
};

const NewFlat = ({ className, testId, id }) => {
	const newFlatClassNames = classnames(styles.NewFlat, className);
	const { t } = useTranslation();

	return (
		<div className={newFlatClassNames} data-testid={testId} id={id}>
			<span className={styles.Title}>{t(texts.Title)}</span>
			<TypeOperationForm />
			<AddressForm />
			<Property />
			<SearchAddressForm />
			<OwnerContactForm />
			<div className={styles.Footer}>
				<Button variant="secondary" onClick={()=>{}} className={styles.Button}>
					Cancelar
				</Button>
				<Button variant="primary" type="submit" className={styles.Button}>
					Crear
				</Button>
			</div>
		</div>
	);
};

NewFlat.propTypes = propTypes;
NewFlat.defaultProps = defaultProps;

export default NewFlat;
