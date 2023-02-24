import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import styles from './NewFlat.module.scss';
import { useTranslation } from 'react-i18next';
import { NewFlatForm } from '../../../forms';
import AddressForm from '../../../forms/AddressForm/AddressForm';
import Property from '../../../forms/Property/Property';

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
			{t(texts.Title)}
			<AddressForm />
			<Property />
			<NewFlatForm />
		</div>
	);
};

NewFlat.propTypes = propTypes;
NewFlat.defaultProps = defaultProps;

export default NewFlat;
