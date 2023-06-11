import React, { useState, useRef, useEffect, useCallback } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import styles from './LanguageSelector.module.scss';
import { MdLanguage } from 'react-icons/md';
import { useTranslation } from 'react-i18next';
import { LANGUAGES } from '../../utils/constants';
import { EnFlag, EsFlag } from '../../../../assets/icons';

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

const LanguageSelector = ({ className, testId, id }) => {
	const languageSelectorClassNames = classnames(styles.LanguageSelector, className);
	const { i18n } = useTranslation();
	const language = i18n.language;
	const refSowFlags = useRef();
	const refLanguage = useRef();
	const [showFlags, setShowFlags] = useState(false);

	const engClassNames = classnames(styles.FlagIcon, {
		[styles.FlagActive]: language === LANGUAGES.ENGLISH,
	});

	const espClassNames = classnames(styles.FlagIcon, {
		[styles.FlagActive]: language === LANGUAGES.SPANISH,
	});

	const showFlagWrapper = classnames(styles.FlagWrapper, {
		[styles.ShowFlagWrapper]: showFlags,
	});

	const handleLanguageChange = useCallback(
		_language => () => {
			i18n.changeLanguage(_language);
			setShowFlags(false);
		},
		[i18n, setShowFlags]
	);

	const onClickOutside = event => {
		if (!refSowFlags.current?.contains(event.target) && !refLanguage.current?.contains(event.target)) {
			setShowFlags(false);
		}
	};

	useEffect(() => {
		document.addEventListener('mousedown', onClickOutside);
		return () => {
			document.removeEventListener('mousedown', onClickOutside);
		};
	}, []);

	return (
		<div className={languageSelectorClassNames} data-testid={testId} id={id}>
			<div onClick={() => setShowFlags(!showFlags)} ref={refLanguage} className={styles.LanguageWrapper}>
				<MdLanguage className={styles.Language} />
				<span className={styles.LanguageLabel}>{language}</span>
			</div>
			<div className={showFlagWrapper} ref={refSowFlags}>
				<EnFlag className={engClassNames} onClick={handleLanguageChange(LANGUAGES.ENGLISH)} />
				<EsFlag className={espClassNames} onClick={handleLanguageChange(LANGUAGES.SPANISH)} />
			</div>
		</div>
	);
};

LanguageSelector.propTypes = propTypes;
LanguageSelector.defaultProps = defaultProps;

export default LanguageSelector;
