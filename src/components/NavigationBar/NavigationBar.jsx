import React, { useMemo, useState } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { Navbar, Container, Nav, Offcanvas } from 'react-bootstrap';
import { USERS_TYPES } from '../../utils/constants';
import useUser from '../../hooks/useUser';
import UserContext from '../../context/userContext';
import LanguageSelector from '../LanguageSelector';
import styles from './NavigationBar.module.scss';
import { BlueLogo } from '../../assets/images';
import Switch from '../Switch/Switch';
import { useNavigate } from 'react-router-dom';

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

const options = [
  { label: 'Home', value: '/' },
  { label: 'About', value: '/about' },
  { label: 'Users', value: '/users', adminOnly: true },
  { label: 'Images', value: '/images', adminOnly: true },
  { label: 'Nuevo Piso', value: '/newFlat', adminOnly: true },
];

const NavigationBar = ({ className, testId, id }) => {
  const navigationBarClassNames = classnames(styles.NavigationBar, className);
  const expand = 'md';
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
    navigate(value);
    setCurrentState(value);
  };

  const testFunction = ( text ) => {
    console.log(text);
  }

  return (
    <div className={navigationBarClassNames} data-testid={testId} id={id}>
      <Navbar key={expand} bg="light" expand={expand}  onSelect={() => testFunction('onSelect ---- > Navbar')} >
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
            <Offcanvas.Header >
              <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                <img src={BlueLogo} className={styles.LogoMobile} alt="logo" />
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="d-flex justify-content-start flex-grow-1">
                <Switch
                  options={filteredOptions}
                  value={currentState}
                  onChange={handleSwitchChange}
                  activeClassName={styles.Active}
                  className={styles.Switch}
                />
              </Nav>
              <Nav className={styles.LoginWrapper}>
                {isLogged ? (
                  <Nav.Link onClick={handleLogout} className={styles.Logout}>logout</Nav.Link>
                ) : (
                  <Nav.Link href="/login" className={styles.Hover}>login</Nav.Link>
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

NavigationBar.propTypes = propTypes;
NavigationBar.defaultProps = defaultProps;

export default NavigationBar;