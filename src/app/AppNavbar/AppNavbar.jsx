import React, { useMemo, useState } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import useUser from '../../hooks/useUser';
import UserContext from '../../context/userContext';
import { useNavigate } from 'react-router-dom';
import { BlueLogo } from '../../assets/images';
import { Navbar, Container, Nav, Offcanvas } from 'react-bootstrap';

import styles from './AppNavbar.module.scss';
import { useTranslation } from 'react-i18next';
import { USERS_TYPES } from '../../utils/constants';
import { LanguageSelector, Switch } from '../../components';

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
  MyAcoount : 'AppNavbar.MyAccount'
};


const LOGIN_PATH = '/login';

const AppNavbar = ({ className, testId, id }) => {
  const { t } = useTranslation();
  const navigationBarClassNames = classnames(styles.AppNavbar, className);
  const expand = 'lg';

  const options = [
    { label: t(texts.Home), value: '/' },
    { label: t(texts.Rent), value: '/rent' },
    { label: t(texts.Sale), value: '/sale' },
    { label: t(texts.About), value: '/about' },
    { label: t(texts.Admin), value: '/admin', adminOnly: true },
  ];

  const [currentState, setCurrentState] = useState(options[0].value);
  const { isLogged, logout } = useUser();
  const { user } = UserContext();

  const isUserAdmin = useMemo(() => user?.type === USERS_TYPES.ADMIN || false, [user]);

  const navigate = useNavigate();

  const handleLogout = () => {
    setCurrentState(options[0].value);
    logout();
  };

  const filteredOptions = useMemo(
    () => options.filter(option => !option.adminOnly || isUserAdmin),
    [isUserAdmin],
  );

  const handleSwitchChange = value => {
    console.log("ntro");
    navigate(value);
    setCurrentState(value);
  };

  return (
    <div className={navigationBarClassNames} data-testid={testId} id={id}>
      <Navbar key={expand} bg="light" expand={expand} sticky="top" >
        <Container fluid className={styles.Container}>
          <Navbar.Toggle
            aria-controls={`offcanvasNavbar-expand-${expand}`}
            className={styles.ButtonMenu}
          />
          <Navbar.Brand href="/">
            <img src={BlueLogo} className={styles.Logo} alt="logo" />
          </Navbar.Brand>
          <Navbar.Offcanvas
            id={`offcanvasNavbar-expand-${expand}`}
            aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
            placement="start"
            className={styles.Offcanvas}
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
                  <Nav.Link onClick={handleLogout} className={styles.Logout}>{t(texts.Logout)}</Nav.Link>
                ) : (
                  <Nav.Link href={LOGIN_PATH} className={styles.Login}>{t(texts.Login)}</Nav.Link>
                )}
                <LanguageSelector className={styles.LanguageIcon}/>
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