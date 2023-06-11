import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';

import { ToastContext } from './toastContext';
import { DEFAULT_CLOSE_TIME_DELAY, TOASTS_TYPES } from '../../utils/constants';
import ToastMessages from '../../../containers/ToastMessages';

const propTypes = {
	children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
	containerPosition: PropTypes.string,
	dataTestId: PropTypes.string,
};

const defaultProps = {
	containerPosition: 'bottom-center',
	dataTestId: '',
};

const DEFAULT_OPTIONS = {
	hideDelay: DEFAULT_CLOSE_TIME_DELAY,
	useAutoHide: true,
};

const ToastProvider = ({ children, containerPosition, dataTestId }) => {
	const [toasts, setToasts] = useState([]);
	const [toastId, setToastId] = useState(0);

	const addToast = useCallback(
		({
			leftContent = '',
			middleContent = '',
			rightContent = '',
			useAutoHide = true,
			hideDelay = DEFAULT_CLOSE_TIME_DELAY,
		}) => {
			setToastId(toastId + 1);
			const toast = {
				type: TOASTS_TYPES.DEFAULT,
				id: toastId,
				leftContent,
				middleContent,
				rightContent,
				useAutoHide,
				hideDelay,
			};
			setToasts([...toasts, toast]);
		},
		[toastId, toasts]
	);

	const removeToast = useCallback(
		id => () => {
			const newToasts = toasts.filter(t => t.id !== id);
			setToasts(newToasts);
		},
		[toasts]
	);

	const addSuccessToast = useCallback(
		(content = 'Success', options = {}) => {
			setToastId(toastId + 1);
			const optionsConfig = { ...DEFAULT_OPTIONS, ...options };
			const toast = {
				type: TOASTS_TYPES.SUCCESS,
				id: toastId,
				middleContent: content,
				useAutoHide: optionsConfig.useAutoHide,
				hideDelay: optionsConfig.hideDelay,
			};
			setToasts([...toasts, toast]);
		},
		[toastId, toasts]
	);

	const addErrorToast = useCallback(
		(content = 'Error', options = {}) => {
			setToastId(toastId + 1);
			const optionsConfig = { ...DEFAULT_OPTIONS, ...options };
			const toast = {
				type: TOASTS_TYPES.ERROR,
				id: toastId,
				middleContent: content,
				useAutoHide: optionsConfig.useAutoHide,
				hideDelay: optionsConfig.hideDelay,
			};
			setToasts([...toasts, toast]);
		},
		[toastId, toasts]
	);

	const addWarningToast = useCallback(
		(content = 'Warning', options = {}) => {
			setToastId(toastId + 1);
			const optionsConfig = { ...DEFAULT_OPTIONS, ...options };
			const toast = {
				type: TOASTS_TYPES.WARNING,
				id: toastId,
				middleContent: content,
				useAutoHide: optionsConfig.useAutoHide,
				hideDelay: optionsConfig.hideDelay,
			};
			setToasts([...toasts, toast]);
		},
		[toastId, toasts]
	);

	const addInfoToast = useCallback(
		(content = 'Info', options = {}) => {
			setToastId(toastId + 1);
			const optionsConfig = { ...DEFAULT_OPTIONS, ...options };
			const toast = {
				type: TOASTS_TYPES.INFO,
				id: toastId,
				middleContent: content,
				useAutoHide: optionsConfig.useAutoHide,
				hideDelay: optionsConfig.hideDelay,
			};
			setToasts([...toasts, toast]);
		},
		[toastId, toasts]
	);

	return (
		<ToastContext.Provider
			data-testid={dataTestId}
			value={{
				addToast,
				removeToast,
				addSuccessToast,
				addErrorToast,
				addWarningToast,
				addInfoToast,
			}}
		>
			{children}
			<ToastMessages containerPosition={containerPosition} toasts={toasts} />
		</ToastContext.Provider>
	);
};

ToastProvider.propTypes = propTypes;
ToastProvider.defaultProps = defaultProps;

export default ToastProvider;
