import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import styles from './FileSorteableItem.module.scss';
import { useTranslation } from 'react-i18next';

const propTypes = {
	className: PropTypes.string,
	testId: PropTypes.string,
	id: PropTypes.string,
};

const defaultProps = {
	className: '',
	testId: undefined,
	id: undefined,
};

const texts = {
	Title: 'FileSorteableItem.Title',
};

const FileSorteableItem = ({ className, testId, id }) => {
	const fileSorteableItemClassNames = classnames(styles.FileSorteableItem, className);
	const { t } = useTranslation();

	return (
		<div className={fileSorteableItemClassNames} data-testid={testId} id={id}>
			Text Component Example
			{t(texts.Title)}
		</div>
	);
};

FileSorteableItem.propTypes = propTypes;
FileSorteableItem.defaultProps = defaultProps;

export default FileSorteableItem;
