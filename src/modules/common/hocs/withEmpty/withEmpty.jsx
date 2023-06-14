import React, { forwardRef } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import DefaultEmpty from '../../components/utils/Empty';

import styles from './withEmpty.module.scss';

const propTypes = {
	className: PropTypes.string,
	dataTestId: PropTypes.string,
	emptyClassName: PropTypes.string,
	emptyMsg: PropTypes.string,
	id: PropTypes.string,
	isEmpty: PropTypes.bool,
};

const defaultProps = {
	className: '',
	dataTestId: undefined,
	emptyClassName: '',
	emptyMsg: 'Empty.title',
	id: undefined,
	isEmpty: false,
};

const withEmpty = (
	WrappedComponent,
	{ Empty = DefaultEmpty } = {
		Empty: DefaultEmpty,
	}
) => {
	// eslint-disable-next-line react/display-name
	const WithEmptyComponent = forwardRef(({ className, emptyClassName, isEmpty, emptyMsg, ...props }, ref) => {
		const emptyClassNames = classnames(styles.Empty, emptyClassName);
		const emptyContainerClassNames = classnames(className, styles.EmptyContainer);

		if (isEmpty) {
			return (
				<div className={emptyContainerClassNames}>
					<Empty
						className={emptyClassNames}
						texts={{
							title: emptyMsg,
						}}
					/>
				</div>
			);
		}

		return <WrappedComponent ref={ref} className={className} {...props} />;
	});

	WithEmptyComponent.propTypes = propTypes;
	WithEmptyComponent.defaultProps = defaultProps;

	return WithEmptyComponent;
};

export default withEmpty;
