import React, { useEffect, useState } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import styles from './Properties.module.scss';
import useHouse from '../../../hooks/useHouse';
import { Button, Table } from 'react-bootstrap';
import { MdDeleteForever, MdEdit } from 'react-icons/md';

const propTypes = {
	className: PropTypes.string,
	testId: PropTypes.string,
	id: PropTypes.string,
	isLoading: PropTypes.bool,
};

const defaultProps = {
	className: '',
	testId: undefined,
	id: undefined,
	isLoading: false,
};

const Properties = ({ className, testId, id, isLoading }) => {
	const [dataTable, setDataTable] = useState([]);

	const { getHousesList } = useHouse();
	const propertiesClassNames = classnames(styles.Properties, className);

	useEffect(() => {
		console.log('houseee ', getHousesList());
	}, []);

	useEffect(() => {
		const retrieveHouses = async () => {
			const housesOut = await getHousesList();
			setDataTable(housesOut);
		};
		retrieveHouses();
	}, []);

	return (
		<div className={propertiesClassNames} data-testid={testId} id={id}>
			<Table striped bordered hover responsive='sm'>
				<thead>
					<tr>
						<th>#</th>
						<th>Country</th>
						<th>City</th>
						<th>Neighborhood</th>
						<th>Description</th>
						<th>Owner</th>
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
								<td>{propertie.country}</td>
								<td>{propertie.city}</td>
								<td>{propertie.neighborhood}</td>
								<td>{propertie.description.substr(0, 40)}</td>
								<td>{propertie.ownerName}</td>
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
		</div>
	);
};

Properties.propTypes = propTypes;
Properties.defaultProps = defaultProps;

export default Properties;
