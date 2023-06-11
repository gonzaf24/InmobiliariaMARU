import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import styles from './Login.module.scss';
import { LoginForm } from '../../common';
/* import { RecoveryForm, RegisterForm } from '../../forms';
 */
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

const Login = ({ className, testId, id }) => {
	const loginClassNames = classnames(styles.Login, className);

	return (
		<div className={loginClassNames} data-testid={testId} id={id}>
			<LoginForm />
			{/* <RegisterForm />
			<RecoveryForm /> */}
		</div>
	);
};

Login.propTypes = propTypes;
Login.defaultProps = defaultProps;

export default Login;
