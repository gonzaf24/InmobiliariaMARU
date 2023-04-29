import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import Error from '../Error/Error';

import styles from './ErrorFallback.module.scss';
import { useTranslation } from 'react-i18next';
import { Button } from 'react-bootstrap';

const propTypes = {
	className: PropTypes.string,
	dataTestId: PropTypes.string,
	error: PropTypes.shape({
		message: PropTypes.string,
	}),
	errorClassName: PropTypes.string,
	id: PropTypes.string,
	texts: PropTypes.shape({
		resetButton: PropTypes.string,
	}),
	useReset: PropTypes.bool,
	onReset: PropTypes.func,
};

const defaultProps = {
	className: '',
	dataTestId: undefined,
	errorClassName: '',
	id: undefined,
	error: undefined,
	texts: {
		resetButton: 'ErrorFallback.resetButton',
	},
	useReset: true,
	onReset: undefined,
};

const ErrorFallback = ({ className, dataTestId, id, errorClassName, error, texts: textsProp, onReset, useReset }) => {
	const texts = { ...defaultProps.texts, ...textsProp };
	const { t } = useTranslation();

	const errorFallbackClassNames = classnames(styles.ErrorFallback, className);
	const errorClassNames = classnames(styles.Error, errorClassName);

	return (
		<div className={errorFallbackClassNames} data-testid={dataTestId} id={id}>
			<div className={styles.ErrorWrapper}>
				<Error
					className={errorClassNames}
					texts={{
						errorMsg: error.message,
					}}
				/>
				{useReset && (
					<Button className={styles.Button} onClick={onReset}>
						{t(texts.resetButton)}
					</Button>
				)}
			</div>
		</div>
	);
};

ErrorFallback.propTypes = propTypes;
ErrorFallback.defaultProps = defaultProps;

export default ErrorFallback;
