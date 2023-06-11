import React, { useMemo, useState } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import { useNavigate, useLocation } from 'react-router-dom';
import { BlueLogo } from '../../assets/images';
import { Navbar, Container, Nav, Offcanvas } from 'react-bootstrap';

import { useTranslation } from 'react-i18next';
import { USERS_TYPES } from '../../utils/constants';

import styles from './AppNavbar.module.scss';
import { useUser } from '../../hooks';
import { LanguageSelector, Switch } from '../../modules';

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
	Home: 'AppNavbar.Home',
	Rent: 'AppNavbar.Rent',
	Sale: 'AppNavbar.Sale',
	About: 'AppNavbar.About',
	Admin: 'AppNavbar.Admin',
	Logout: 'AppNavbar.Logout',
	Login: 'AppNavbar.Login',
	MyAcoount: 'AppNavbar.MyAccount',
};

export const ROUTING_OPTIONS = [
	{ label: texts.Home, value: '/' },
	{ label: texts.Rent, value: '/rent' },
	{ label: texts.Sale, value: '/sale' },
	{ label: texts.About, value: '/about' },
	{ label: texts.Admin, value: '/admin', adminOnly: true },
];

function getFirstSegment(path) {
	const segments = path.split('/');
	return '/' + segments[1];
}

const LOGIN_PATH = '/login';

const expand = 'lg';

const AppNavbar = ({ className, testId, id }) => {
	const { t } = useTranslation();
	const navigate = useNavigate();
	const location = useLocation();
	const pathname = getFirstSegment(location.pathname);
	const [currentState, setCurrentState] = useState(pathname);
	const { isLogged, logout, user } = useUser();
	const [showMenu, setShowMenu] = useState(false);

	const isUserAdmin = useMemo(() => user?.type === USERS_TYPES.ADMIN || false, [user]);
	const filteredOptions = useMemo(() => ROUTING_OPTIONS.filter(option => !option.adminOnly || isUserAdmin), [isUserAdmin]);

	const handleLogout = () => {
		setCurrentState(ROUTING_OPTIONS[0].value);
		logout();
	};

	const handleCloseMenu = () => {
		setShowMenu(false);
	};

	const handleSwitchChange = value => {
		navigate(value);
		setCurrentState(value);
		setTimeout(() => {
			setShowMenu(false);
		}, 400);
	};

	const navigationBarClassNames = classnames(styles.AppNavbar, className);

	return (
		<div className={navigationBarClassNames} data-testid={testId} id={id}>
			<Navbar key={expand} bg='light' expand={expand}>
				<Container fluid className={styles.Container}>
					<Navbar.Toggle
						aria-controls={`offcanvasNavbar-expand-${expand}`}
						className={styles.ButtonMenu}
						onClick={() => setShowMenu(true)}
					/>
					<Navbar.Brand href='/'>
						<img src={BlueLogo} className={styles.Logo} alt='logo' />
					</Navbar.Brand>
					<Navbar.Offcanvas
						id={`offcanvasNavbar-expand-${expand}`}
						aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
						placement='start'
						className={styles.Offcanvas}
						show={showMenu}
						onHide={handleCloseMenu}
					>
						<Offcanvas.Body>
							<Nav className={styles.BodyOffcanvas}>
								<Switch
									options={filteredOptions}
									value={currentState}
									onChange={handleSwitchChange}
									onClick={handleSwitchChange}
									activeClassName={styles.Active}
									className={styles.Switch}
								/>
							</Nav>
							<Nav className={styles.LoginWrapper}>
								{isLogged ? (
									<Nav.Link onClick={handleLogout} className={styles.Logout}>
										{t(texts.Logout)}
									</Nav.Link>
								) : (
									<Nav.Link href={LOGIN_PATH} className={styles.Login}>
										{t(texts.Login)}
									</Nav.Link>
								)}
								<LanguageSelector className={styles.LanguageIcon} />
							</Nav>
						</Offcanvas.Body>
					</Navbar.Offcanvas>
				</Container>
			</Navbar>
		</div>
	);
};

AppNavbar.propTypes = propTypes;
AppNavbar.defaultProps = defaultProps;

export default AppNavbar;
