import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import styles from './Skeleton.module.scss';

const propTypes = {
	className: PropTypes.string,
	dataTestId: PropTypes.string,
	htmlTag: PropTypes.string,
	id: PropTypes.string,
};

const defaultProps = {
	className: '',
	dataTestId: undefined,
	htmlTag: 'div',
	id: undefined,
};

const Skeleton = ({ className, dataTestId, id, htmlTag: Tag }) => {
	const skeletonClassNames = classnames(styles.Skeleton, className);

	return (
		<Tag className={skeletonClassNames} data-testid={dataTestId} id={id}>
			Skeleton
		</Tag>
	);
};

Skeleton.propTypes = propTypes;
Skeleton.defaultProps = defaultProps;

export default Skeleton;
