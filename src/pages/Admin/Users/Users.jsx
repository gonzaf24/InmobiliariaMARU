import React, { useEffect, useState } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import styles from './Users.module.scss';
import { useTranslation } from 'react-i18next';
import useUser from '../../../hooks/useUser';
import { Button, Table } from 'react-bootstrap';
import useOpenToggle from '../../../hooks/useOpenToggle';
import ActionModal from '../../../components/ActionModal';

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
	Title: 'Users.Title',
};

const Users = ({ className, testId, id }) => {
	const usersClassNames = classnames(styles.Users, className);
	const { t } = useTranslation();
	const { users, isLoading } = useUser();
	const [dataTable, setDataTable] = useState([]);

	useEffect(() => {
		const aa = async () => {
			const usersOut = await users();
			setDataTable(usersOut);
			console.log('usersOut ', usersOut);
		};
		aa();
	}, []);

	const {
		isOpen: isOpenConfirmDeleteUser,
		open: openConfirmDeleteUser,
		close: closeConfirmDeleteUser,
	} = useOpenToggle(false);

	return (
		<div className={usersClassNames} data-testid={testId} id={id}>
			{t(texts.Title)}
			{'Aqui los users'}
			<Table striped bordered hover>
				<thead>
					<tr>
						<th>#</th>
						<th>Username</th>
						<th>Name</th>
						<th>Type</th>
						<th>Acciones</th>
					</tr>
				</thead>
				<tbody>
					{isLoading ? (
						<tr>
							<td colSpan='5' className='text-center'>
								Cargando...
							</td>
						</tr>
					) : (
						dataTable.map((user, index) => (
							<tr key={index}>
								<td>{index}</td>
								<td>{user.username}</td>
								<td>{user.name}</td>
								<td>{user.type}</td>
								<td className={styles.Actions}>
									<Button>Edit</Button>
									<Button onClick={openConfirmDeleteUser}>Delete</Button>
								</td>
							</tr>
						))
					)}
				</tbody>
			</Table>

			<ActionModal
				id={id}
				isOpen={isOpenConfirmDeleteUser}
				onHide={closeConfirmDeleteUser}
				onClose={closeConfirmDeleteUser}
				onReject={closeConfirmDeleteUser}
				onAccept={closeConfirmDeleteUser}
				header='Confirmar eliminación'
			>
				<span>Seguro desea eliminar el usuario?</span>
			</ActionModal>
		</div>
	);
};

Users.propTypes = propTypes;
Users.defaultProps = defaultProps;

export default Users;
