import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import styles from './Admin.module.scss';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';

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
	AdminUsers: 'Admin.AdminUsers',
	RegisterNewHouse: 'Admin.RegisterNewHouse',
	Properties: 'Admin.Properties',
};

const Admin = ({ className, testId, id }) => {
	const adminClassNames = classnames(styles.Admin, className);
	const { t } = useTranslation();

	return (
		<div className={adminClassNames} data-testid={testId} id={id}>
			<span>Admin Area</span>
			<NavLink to='/admin/users' className={styles.ItemLink}>
				{t(texts.AdminUsers)}
			</NavLink>
			<NavLink to='/admin/properties' className={styles.ItemLink}>
				{t(texts.Properties)}
			</NavLink>
		</div>
	);
};

Admin.propTypes = propTypes;
Admin.defaultProps = defaultProps;

export default Admin;
