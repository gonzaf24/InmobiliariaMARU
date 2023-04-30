import React, { useEffect, useState } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import { Button, Table } from 'react-bootstrap';
import { MdDeleteForever, MdEdit } from 'react-icons/md';
import { useHouse, useOpenToggle } from '../../../hooks';
import { PROPERTY_ACQUISITION_OPTIONS } from '../../../utils/constants';
import styles from './Properties.module.scss';
import { NewHouseModal } from '../../../forms';

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
	return Object.entries(PROPERTY_ACQUISITION_OPTIONS).find(([key, valueObj]) => valueObj.value === operation)[0];
};

const Properties = ({ className, testId, id }) => {
	const [dataTable, setDataTable] = useState([]);
	const { getHousesList, isLoading } = useHouse();

	const { isOpen: isOpenNewHouse, open: openNewHouse, close: closeNewHouse } = useOpenToggle(false);

	useEffect(() => {
		const retrieveHouses = async () => {
			const housesOut = await getHousesList();
			setDataTable(housesOut);
		};
		retrieveHouses();
	}, []);

	const propertiesClassNames = classnames(styles.Properties, className);

	return (
		<div className={propertiesClassNames} data-testid={testId} id={id}>
			<div className={styles.HeaderWrapper}>
				<span>{'Lista de Propiedades'}</span>
				<Button onClick={openNewHouse} className={styles.ButtonNewHouse}>
					<MdEdit />
				</Button>
			</div>
			<Table striped bordered hover responsive='sm'>
				<thead>
					<tr>
						<th>#</th>
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
								<td>{index}</td>
								<td>{getOperation(propertie.operation)}</td>
								<td>{propertie.city}</td>
								<td>{propertie.neighborhood}</td>
								<td>{propertie.address}</td>
								<td>{propertie.description.substr(0, 40)}</td>
								<td>{propertie.ownerName}</td>
								<td>{propertie.photos.length}</td>
								<td className={styles.Actions}>
									<Button className={styles.ButtonActions}>
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
		</div>
	);
};

Properties.propTypes = propTypes;
Properties.defaultProps = defaultProps;

export default Properties;
