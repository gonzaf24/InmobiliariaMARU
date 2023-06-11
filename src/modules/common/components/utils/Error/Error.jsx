import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import styles from './Error.module.scss';
import { useTranslation } from 'react-i18next';

const propTypes = {
	className: PropTypes.string,
	dataTestId: PropTypes.string,
	id: PropTypes.string,
	texts: PropTypes.shape({
		title: PropTypes.string,
	}),
};

const defaultProps = {
	className: '',
	dataTestId: undefined,
	id: undefined,
	texts: {
		title: 'Error.title',
		errorMsg: undefined,
	},
};

const Error = ({ className, dataTestId, id, texts: textsProp }) => {
	const texts = { ...defaultProps.texts, ...textsProp };
	const { t } = useTranslation();

	const errorClassNames = classnames(styles.Error, className);
	const showErrorMessage = !!texts.errorMsg;

	return (
		<div className={errorClassNames} data-testid={dataTestId} id={id}>
			<span>{t(texts.title)}</span>
			{showErrorMessage && <p className={styles.ErrorMsg}>{t(texts.errorMsg)}</p>}
		</div>
	);
};

Error.propTypes = propTypes;
Error.defaultProps = defaultProps;

export default Error;
