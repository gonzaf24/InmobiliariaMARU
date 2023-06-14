import React, { forwardRef } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import DefaultError from '../../components/utils/Error';

import styles from './withError.module.scss';

const propTypes = {
	className: PropTypes.string,
	dataTestId: PropTypes.string,
	errorClassName: PropTypes.string,
	errorMsg: PropTypes.string,
	hasError: PropTypes.bool,
	id: PropTypes.string,
};

const defaultProps = {
	className: '',
	dataTestId: undefined,
	errorClassName: '',
	errorMsg: 'Unknown error',
	id: undefined,
	hasError: false,
};

const WithError = (
	WrappedComponent,
	{ Error = DefaultError } = {
		Error: DefaultError,
	}
) => {
	// eslint-disable-next-line react/display-name
	const WithErrorComponent = forwardRef(({ className, errorClassName, hasError, errorMsg, ...props }, ref) => {
		const defaultErrorClassNames = classnames(styles.Error, errorClassName);
		const errorContainerClassNames = classnames(className, styles.ErrorContainer);

		if (hasError) {
			return (
				<div className={errorContainerClassNames}>
					<Error
						className={defaultErrorClassNames}
						texts={{
							errorMsg,
						}}
					/>
				</div>
			);
		}

		return <WrappedComponent ref={ref} className={className} {...props} />;
	});

	WithErrorComponent.propTypes = propTypes;
	WithErrorComponent.defaultProps = defaultProps;

	return WithErrorComponent;
};

export default WithError;
