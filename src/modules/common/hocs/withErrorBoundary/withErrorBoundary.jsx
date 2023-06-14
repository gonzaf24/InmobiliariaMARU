import React, { forwardRef, useCallback } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import DefaultErrorFallback from '../../components/utils/ErrorFallback/ErrorFallback';
import useToastContext from '../../../../context/toastContext';

import styles from './withErrorBoundary.module.scss';

const propTypes = {
	className: PropTypes.string,
	dataTestId: PropTypes.string,
	errorMsg: PropTypes.string,
	id: PropTypes.string,
	onError: PropTypes.func,
	onReset: PropTypes.func,
};

const defaultProps = {
	className: '',
	dataTestId: undefined,
	errorMsg: 'Unknown error',
	id: undefined,
	onReset: () => {},
	onError: () => {},
};

const WithErrorBoundary = (
	WrappedComponent,
	{ ErrorFallback = DefaultErrorFallback, useErrorToasts = false, useReset = true, texts = {} } = {
		ErrorFallback: DefaultErrorFallback,
		useErrorNotifications: false,
	}
) => {
	// eslint-disable-next-line react/display-name
	const WithErrorBoundaryComponent = forwardRef(({ className, onReset, onError, errorMsg, ...props }, ref) => {
		const { addErrorToast } = useToastContext();
		const errorBoundaryClassNames = classnames(styles.ErrorBoundary, className);

		const handleError = useCallback(
			(error, info) => {
				if (useErrorToasts) {
					addErrorToast(errorMsg);
				}
				onError(error, info, errorMsg);
			},
			[errorMsg, addErrorToast, onError]
		);

		const FallbackComponent = useCallback(
			({ resetErrorBoundary, ..._props }) => (
				<ErrorFallback className={className} texts={texts} useReset={useReset} onReset={resetErrorBoundary} {..._props} />
			),
			[className]
		);

		return (
			<div className={errorBoundaryClassNames}>
				<ErrorBoundary FallbackComponent={FallbackComponent} onError={handleError} onReset={onReset}>
					<WrappedComponent ref={ref} className={className} {...props} />
				</ErrorBoundary>
			</div>
		);
	});

	WithErrorBoundaryComponent.propTypes = propTypes;
	WithErrorBoundaryComponent.defaultProps = defaultProps;

	return WithErrorBoundaryComponent;
};

export default WithErrorBoundary;
