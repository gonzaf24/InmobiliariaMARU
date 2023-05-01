import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import styles from './TitleDescriptionForm.module.scss';
import { Row } from 'react-bootstrap';
import { InputText, InputTextarea } from '../../components/inputs';

const propTypes = {
	className: PropTypes.string,
	testId: PropTypes.string,
	id: PropTypes.string,
	title: PropTypes.string,
	onTitleChange: PropTypes.func,
	description: PropTypes.string,
	onDescriptionChange: PropTypes.func,
};

const defaultProps = {
	className: '',
	testId: undefined,
	id: undefined,
	title: undefined,
	onTitleChange: () => {},
	description: undefined,
	onDescriptionChange: () => {},
};

const TitleDescriptionForm = ({ className, testId, id, title, onTitleChange, description, onDescriptionChange }) => {
	const titleDescriptionFormClassNames = classnames(styles.TitleDescriptionForm, className);

	return (
		<div className={titleDescriptionFormClassNames} data-testid={testId} id={id}>
			<Row>
				<InputText colsWidth={12} label='Titulo' value={title} onChange={onTitleChange} isRequired />
			</Row>
			<Row>
				<InputTextarea colsWidth={12} label='Descripción' value={description} onChange={onDescriptionChange} isRequired />
			</Row>
		</div>
	);
};

TitleDescriptionForm.propTypes = propTypes;
TitleDescriptionForm.defaultProps = defaultProps;

export default TitleDescriptionForm;
