import React, { forwardRef } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import DefaultLoader from '../../components/Loader';
import DefaultSkeleton from '../../components/utils/Skeleton';

import styles from './withLoading.module.scss';

const propTypes = {
	className: PropTypes.string,
	dataTestId: PropTypes.string,
	id: PropTypes.string,
	isLoading: PropTypes.bool,
	loaderClassName: PropTypes.string,
};

const defaultProps = {
	className: '',
	dataTestId: undefined,
	id: undefined,
	isLoading: false,
	loaderClassName: '',
};

const withLoading = (
	WrappedComponent,
	{ useSkeleton = false, Loader = DefaultLoader, Skeleton = DefaultSkeleton } = {
		useSkeleton: false,
		Loader: DefaultLoader,
		Skeleton: DefaultSkeleton,
	}
) => {
	// eslint-disable-next-line react/display-name
	const WithLoadingComponent = forwardRef(({ className, loaderClassName, isLoading, ...props }, ref) => {
		const defaultLoaderClassNames = classnames(styles.Loader, loaderClassName);
		const loaderContainerClassNames = classnames(className, styles.LoaderContainer);
		const skeletonClassNames = classnames(className, styles.Skeleton);

		if (isLoading && useSkeleton) {
			return <Skeleton className={skeletonClassNames} />;
		}

		if (isLoading && !useSkeleton) {
			return (
				<div className={loaderContainerClassNames}>
					<Loader className={defaultLoaderClassNames} />
				</div>
			);
		}

		return <WrappedComponent ref={ref} className={className} {...props} />;
	});

	WithLoadingComponent.propTypes = propTypes;
	WithLoadingComponent.defaultProps = defaultProps;

	return WithLoadingComponent;
};

export default withLoading;
