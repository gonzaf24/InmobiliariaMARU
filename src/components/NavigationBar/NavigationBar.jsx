import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { Navbar, Container, Nav, Offcanvas } from 'react-bootstrap';
import { USERS_TYPES } from '../../utils/constants';
import useUser from '../../hooks/useUser';
import UserContext from '../../context/userContext';
import LanguageSelector from '../LanguageSelector';
import styles from './NavigationBar.module.scss';
import {  BlueLogo } from '../../assets/images';

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

const NavigationBar = ({ className, testId, id }) => {
	const navigationBarClassNames = classnames(styles.NavigationBar, className);
	const expand = 'md';
	const { isLogged, logout } = useUser();
	const { user } = UserContext();
	const isUserAdmin = user?.type === USERS_TYPES.ADMIN || false;

	return (
		<div className={navigationBarClassNames} data-testid={testId} id={id}>
			<Navbar key={expand} bg='light' expand={expand} className='mb-3'>
				<Container fluid>
					<Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} className={styles.ButtonMenu}></Navbar.Toggle>
					<Navbar.Brand href='/'>
						<img src={BlueLogo} className={styles.Logo} />
					</Navbar.Brand>
					<Navbar.Offcanvas
						id={`offcanvasNavbar-expand-${expand}`}
						aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
						placement='start'
						className={styles.Offcanvas}
					>
						<Offcanvas.Header closeButton>
							<Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
								<img src={BlueLogo} className={styles.LogoMobile} /> 
							</Offcanvas.Title>
						</Offcanvas.Header>
						<Offcanvas.Body>
							<Nav className='d-flex justify-content-start flex-grow-1'>
								<Nav.Link href='/'>Home</Nav.Link>
								<Nav.Link href='/about'>About</Nav.Link>
								{isUserAdmin && <Nav.Link href='/users'>Users</Nav.Link>}
								{isUserAdmin && <Nav.Link href='/images'>Images</Nav.Link>}
								{isUserAdmin && <Nav.Link href='/newFlat'>Nuevo Piso</Nav.Link>}
							</Nav>
							<Nav className={styles.LoginWrapper}>
								{isLogged && <Nav.Link onClick={logout}>Logout</Nav.Link>}
								{!isLogged && <Nav.Link href='/login'>Login</Nav.Link>}
								<LanguageSelector />
							</Nav>
						</Offcanvas.Body>
					</Navbar.Offcanvas>
				</Container>
			</Navbar>
		</div>
	);
};

NavigationBar.propTypes = propTypes;
NavigationBar.defaultProps = defaultProps;

export default NavigationBar;
