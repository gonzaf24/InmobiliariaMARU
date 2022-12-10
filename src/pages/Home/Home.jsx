import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';

import styles from './Home.module.scss';
import { useTranslation } from 'react-i18next';
import useToastContext from '../../context/toastContext';
import useUserContext from '../../context/userContext';
import { LANGUAGES } from '../../utils/constants';

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
	TestText: 'Home.TestText',
	ChangeLanguage: 'Home.ChangeLanguage',
};

const Home = ({ className, testId, id }) => {
	const homeClassNames = classnames(styles.Home, className);
	const { t, i18n } = useTranslation();
	const { addToast } = useToastContext();
	const { user } = useUserContext();

	const changeLanguage = () => {
		const lang = i18n.language === LANGUAGES.ENGLISH ? LANGUAGES.SPANISH : LANGUAGES.ENGLISH;
		i18n.changeLanguage(lang);
	};

	const handleCreateToast = () => {
		addToast({
			id: 1,
			type: 'success',
			middleContent: 'Toast created',
			useAutoHide: false,
		});
	};

	return (
		<div className={homeClassNames} data-testid={testId} id={id}>
			<h1>HOME</h1>
			<br />
			<br />
			<br />
			<span>{t(texts.TestText)}</span>
			<br />
			<br />
			<br />
			<Button variant='outline-success' onClick={changeLanguage}>
				{t(texts.ChangeLanguage)}
			</Button>
			<br />
			<br />
			<br />
			<span>{`Lenguaje:  ${i18n.language}`}</span>
			<br />
			<br />
			<br />
			<Button variant='outline-success' onClick={handleCreateToast}>
				Test Toast
			</Button>
			<br />
			<br />
			<br />
			<span>Moked User context</span>
			<br />
			<br />
			<span>{`Id:  ${user?.id}`}</span>
			<br />
			<span>{`Nane:  ${user?.name}`}</span>
			<br />
			<span>{`Username:  ${user?.username}`}</span>
			<br />
			<span>{`Type:  ${user?.type}`}</span>
			<br />
			<span>{`Token:  ${user?.token}`}</span>
			<br />
			<br />
			<br />
			<span>{t(texts.TestText)}</span>
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<span>{t(texts.TestText)}</span>
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<span>{t(texts.TestText)}</span>
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<span>{t(texts.TestText)}</span>
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<span>{t(texts.TestText)}</span>
			<br />
			<br />
			<br />
		</div>
	);
};

Home.propTypes = propTypes;
Home.defaultProps = defaultProps;

export default Home;
