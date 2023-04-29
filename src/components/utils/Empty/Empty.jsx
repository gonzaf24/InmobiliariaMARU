import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import styles from './Empty.module.scss';
import { useTranslation } from 'react-i18next';

const propTypes = {
	className: PropTypes.string,
	dataTestId: PropTypes.string,
	id: PropTypes.string,
	texts: PropTypes.shape({
		title: PropTypes.string,
	}),
};

const defaultProps = {
	className: '',
	dataTestId: undefined,
	id: undefined,
	texts: {
		title: 'Empty.title',
	},
};

const Empty = ({ className, dataTestId, id, texts: textsProp }) => {
	const texts = { ...defaultProps.texts, ...textsProp };
	const { t } = useTranslation();

	const emptyClassNames = classnames(styles.Empty, className);

	return (
		<div className={emptyClassNames} data-testid={dataTestId} id={id}>
			<span>{t(texts.title)}</span>
		</div>
	);
};

Empty.propTypes = propTypes;
Empty.defaultProps = defaultProps;

export default Empty;
