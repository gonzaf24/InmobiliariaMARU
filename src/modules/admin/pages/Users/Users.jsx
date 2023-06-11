import React, { useEffect, useState } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import { Button, Table } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { MdDeleteForever, MdEdit } from 'react-icons/md';
import { ImUserPlus } from 'react-icons/im';
import { EditUser, NewUser, useOpenToggle, useUser, ActionModal, Modal } from '../../../common';

import styles from './Users.module.scss';

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
	DeleteHeader: 'DeleteHeader',
	DeleteMessage: 'DeleteMessage',
	EditUser: 'EditUser.Title',
	NewUser: 'NewUser.Title',
};

const Users = ({ className, testId, id }) => {
	const usersClassNames = classnames(styles.Users, className);
	const { t } = useTranslation();
	const { users, isLoading, removeUser } = useUser();
	const [userIdDelete, setUserIdDelete] = useState();
	const [dataTable, setDataTable] = useState([]);

	const [user, setUser] = useState(undefined);

	const updateUsersTable = async () => {
		const usersOut = await users();
		setDataTable(usersOut);
	};

	useEffect(() => {
		const retrieveUsers = async () => {
			const usersOut = await users();
			setDataTable(usersOut);
		};
		retrieveUsers();
	}, []);

	const {
		isOpen: isOpenConfirmDeleteUser,
		open: openConfirmDeleteUser,
		close: closeConfirmDeleteUser,
	} = useOpenToggle(false);

	const { isOpen: isOpenEditUser, open: openEditUser, close: closeEditUser } = useOpenToggle(false);

	const { isOpen: isOpenNewUser, open: openNewUser, close: closeNewUser } = useOpenToggle(false);

	const handleEditeUser = user => {
		setUser(user);
		openEditUser();
	};

	const handleDeleteUser = id => {
		openConfirmDeleteUser();
		setUserIdDelete(id);
	};

	const onDeleteUser = async () => {
		const removed = await removeUser(userIdDelete);
		if (removed) {
			updateUsersTable();
			closeConfirmDeleteUser();
		}
	};

	return (
		<div className={usersClassNames} data-testid={testId} id={id}>
			<div className={styles.HeaderWrapper}>
				<span>{t(texts.Title)}</span>
				<Button className={styles.NewUserButton} onClick={openNewUser}>
					<ImUserPlus />
				</Button>
			</div>
			<div>
				<Table striped bordered hover responsive='sm'>
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
										<Button className={styles.ButtonActions} onClick={() => handleEditeUser(user)}>
											<MdEdit />
										</Button>
										<Button className={styles.ButtonActions} onClick={() => handleDeleteUser(user.id)}>
											<MdDeleteForever />
										</Button>
									</td>
								</tr>
							))
						)}
					</tbody>
				</Table>
			</div>

			<ActionModal
				id={id}
				isOpen={isOpenConfirmDeleteUser}
				onHide={closeConfirmDeleteUser}
				onClose={closeConfirmDeleteUser}
				onReject={closeConfirmDeleteUser}
				onAccept={onDeleteUser}
				header={t(texts.DeleteHeader)}
			>
				<span>{t(texts.DeleteMessage)}</span>
			</ActionModal>

			<Modal
				id={id}
				size='xs'
				isOpen={isOpenEditUser}
				onHide={closeEditUser}
				onClose={closeEditUser}
				header={t(texts.EditUser)}
			>
				<EditUser data={user} onClose={closeEditUser} onSuccess={updateUsersTable} />
			</Modal>

			<Modal id={id} size='xs' isOpen={isOpenNewUser} onHide={closeNewUser} onClose={closeNewUser} header={t(texts.NewUser)}>
				<NewUser data={user} onClose={closeNewUser} onSuccess={updateUsersTable} />
			</Modal>
		</div>
	);
};

Users.propTypes = propTypes;
Users.defaultProps = defaultProps;

export default Users;
