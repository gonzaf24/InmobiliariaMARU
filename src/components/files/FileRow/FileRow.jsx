import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import styles from './FileRow.module.scss';
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
	Title: 'FileRow.Title',
};

const FileRow = ({ className, testId, id }) => {
	const fileRowClassNames = classnames(styles.FileRow, className);
	const { t } = useTranslation();

	return (
		<div className={fileRowClassNames} data-testid={testId} id={id}>
			Text Component Example
			{t(texts.Title)}
		</div>
	);
};

FileRow.propTypes = propTypes;
FileRow.defaultProps = defaultProps;

export default FileRow;
