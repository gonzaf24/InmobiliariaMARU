import React, { useEffect, useState } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import styles from './Home.module.scss';
import EventsMap from '../../components/maps/EventsMap';
import useHouse from '../../hooks/useHouse';
import { Button } from 'react-bootstrap';

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

const Home = ({ className, testId, id }) => {
	const { getHousesList } = useHouse();
	const [greatPlaces, setGreatPlaces] = useState([]);

	useEffect(() => {
		const retrieveHouses = async () => {
			const housesOut = await getHousesList();
			const greatPlace = housesOut.map(house => {
				return {
					lat: house.lat,
					lng: house.lng,
					id: house.id,
					price: house.price,
					photos: house.photos,
					city: house.city,
					neighborhood: house.neighborhood,
					rooms: house.rooms,
					bathrooms: house.bathrooms,
					size: house.size,
					createdAt: house.createdAt,
					operation: house.operation,
					street: house.street,
					floor: house.floor,
				};
			});
			setGreatPlaces(greatPlace);
		};
		retrieveHouses();
	}, []);

	const homeClassNames = classnames(styles.Home, className);

	return (
		<div className={homeClassNames} data-testid={testId} id={id}>
			<div className={styles.Menu}>
				<Button className={styles.Button} variant='primary'>
					<span>Mapa</span>
				</Button>
				<Button className={styles.Button} variant='primary'>
					<span>Lista</span>
				</Button>
			</div>
			<EventsMap greatPlaces={greatPlaces} />
		</div>
	);
};

Home.propTypes = propTypes;
Home.defaultProps = defaultProps;

export default Home;
