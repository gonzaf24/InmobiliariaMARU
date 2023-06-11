import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import { CaretDownIcon } from '../../../assets';

import styles from './LanguageSelector.module.scss';
import { capitalizeFirstLetter } from '../strings';

const propTypes = {
	className: PropTypes.string,
	dataTestId: PropTypes.string,
	id: PropTypes.string,
	language: PropTypes.string,
	onChangeLanguage: PropTypes.func,
};

const defaultProps = {
	className: '',
	dataTestId: undefined,
	id: undefined,
	language: 'en',
	onChangeLanguage: () => {},
};

const LanguageSelector = ({ className, dataTestId, id, language, onChangeLanguage }) => {
	const handleChangelanguage = () => onChangeLanguage(language);

	const languageSelectorClassNames = classnames(styles.LanguageSelector, className);

	return (
		<div className={languageSelectorClassNames} data-testid={dataTestId} id={id}>
			<button type='button' onClick={handleChangelanguage} onKeyDown={handleChangelanguage}>
				<span>{capitalizeFirstLetter(language)}</span>
				<CaretDownIcon className={styles.LanguageIcon} />
			</button>
		</div>
	);
};

LanguageSelector.propTypes = propTypes;
LanguageSelector.defaultProps = defaultProps;

export default LanguageSelector;
