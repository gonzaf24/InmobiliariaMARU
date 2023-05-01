import React, { useCallback, useEffect, useState } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import { Button, Table } from 'react-bootstrap';
import { MdDeleteForever, MdEdit, MdHomeFilled } from 'react-icons/md';
import { useHouse, useOpenToggle } from '../../../hooks';
import { PROPERTY_ACQUISITION_OPTIONS } from '../../../utils/constants';
import { EditHouseModal, NewHouseModal } from '../../../components';

import styles from './Properties.module.scss';

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

const getOperation = operation => {
	return Object.values(PROPERTY_ACQUISITION_OPTIONS).find(valueObj => valueObj.value === operation).label;
};

const Properties = ({ className, testId, id }) => {
	const [dataTable, setDataTable] = useState([]);
	const [selectedHouse, setSelectedHouse] = useState({}); // [1
	const { getHousesList, isLoading } = useHouse();

	const { isOpen: isOpenNewHouse, open: openNewHouse, close: closeNewHouse } = useOpenToggle(false);
	const { isOpen: isOpenEditHouse, open: openEditHouse, close: closeEditHouse } = useOpenToggle(false);

	useEffect(() => {
		const retrieveHouses = async () => {
			const housesOut = await getHousesList();
			console.log('housesOut', housesOut);

			setDataTable(housesOut);
		};
		retrieveHouses();
	}, []);

	const handleEditHouse = useCallback(
		house => () => {
			setSelectedHouse(house);
			openEditHouse();
		},
		[openEditHouse]
	);

	const propertiesClassNames = classnames(styles.Properties, className);

	return (
		<div className={propertiesClassNames} data-testid={testId} id={id}>
			<div className={styles.HeaderWrapper}>
				<span>{'Lista de Propiedades'}</span>
				<Button onClick={openNewHouse} className={styles.ButtonNewHouse}>
					<MdHomeFilled />
				</Button>
			</div>
			<Table striped bordered hover responsive='sm'>
				<thead>
					<tr>
						<th>Operation</th>
						<th>City</th>
						<th>Neighborhood</th>
						<th>Address</th>
						<th>Description</th>
						<th>Owner</th>
						<th>Photos</th>
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
						dataTable.map((propertie, index) => (
							<tr key={index}>
								<td>{getOperation(propertie.operation)}</td>
								<td>{propertie.city}</td>
								<td>{propertie.neighborhood}</td>
								<td>{propertie.address}</td>
								<td>{propertie.description.substr(0, 40)}</td>
								<td>{propertie.ownerName}</td>
								<td>{propertie.photos.length}</td>
								<td className={styles.Actions}>
									<Button className={styles.ButtonActions} onClick={handleEditHouse(propertie)}>
										<MdEdit />
									</Button>
									<Button className={styles.ButtonActions}>
										<MdDeleteForever />
									</Button>
								</td>
							</tr>
						))
					)}
				</tbody>
			</Table>

			<NewHouseModal isOpen={isOpenNewHouse} onClose={closeNewHouse} />
			<EditHouseModal isOpen={isOpenEditHouse} onClose={closeEditHouse} house={selectedHouse} />
		</div>
	);
};

Properties.propTypes = propTypes;
Properties.defaultProps = defaultProps;

export default Properties;
