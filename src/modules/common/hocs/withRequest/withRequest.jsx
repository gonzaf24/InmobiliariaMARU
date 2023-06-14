import withEmpty from '../withEmpty/withEmpty';
import withError from '../withError/withError';
import withLoading from '../withLoading/withLoading';

const withRequest = (
	WrappedComponent,
	{ useSkeleton = false, Loader = undefined, Skeleton = undefined, Empty = undefined, Error = undefined } = {
		useSkeleton: false,
		Loader: undefined,
		Skeleton: undefined,
		Empty: undefined,
		Error: undefined,
	}
) => {
	const WrappedComponentWithEmpty = withEmpty(WrappedComponent, { Empty });

	const WrappedComponentWithEmptyAndError = withError(WrappedComponentWithEmpty, { Error });

	const WrappedComponentWithLoadingErrorAndEmpty = withLoading(WrappedComponentWithEmptyAndError, {
		useSkeleton,
		Loader,
		Skeleton,
	});

	return WrappedComponentWithLoadingErrorAndEmpty;
};

export default withRequest;
