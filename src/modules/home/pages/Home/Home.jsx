import React, { useEffect, useState } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import { Button } from 'react-bootstrap';
import { SiGooglemaps } from 'react-icons/si';
import { BsListTask, BsFilter } from 'react-icons/bs';
import { RealEstateList, RealEstateMap } from '../../components';

import styles from './Home.module.scss';
import { useDevice, useHouse, useStep } from '../../../common';

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

const HOME_STEPS = {
	HOME_MAP: 0,
	HOME_LIST: 1,
};

const HOME_COMPONENTS = {
	[HOME_STEPS.HOME_MAP]: RealEstateMap,
	[HOME_STEPS.HOME_LIST]: RealEstateList,
};

const INITIAL_STEP = HOME_STEPS.HOME_LIST;

const Home = ({ className, testId, id }) => {
	const { getHousesList } = useHouse();
	const { step, setStep } = useStep(INITIAL_STEP);
	const [greatPlaces, setGreatPlaces] = useState([]);
	const { isMobile, isTablet } = useDevice();

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

	const isMobileOrTablet = isMobile || isTablet;
	const HomeStep = HOME_COMPONENTS[step];
	const mapButtonClassNames = classnames(styles.Button, { [styles.Active]: step === HOME_STEPS.HOME_MAP });
	const listButtonClassNames = classnames(styles.Button, { [styles.Active]: step === HOME_STEPS.HOME_LIST });
	const homeClassNames = classnames(styles.Home, className);

	return (
		<div className={homeClassNames} data-testid={testId} id={id}>
			<div className={styles.Menu}>
				{isMobileOrTablet && (
					<Button className={styles.Button} variant='primary'>
						<BsFilter />
					</Button>
				)}
				<div className={styles.Wrapper}>
					<Button className={listButtonClassNames} variant='primary' onClick={() => setStep(HOME_STEPS.HOME_LIST)}>
						<BsListTask />
						<span className={styles.Text}>Lista</span>
					</Button>
					<Button className={mapButtonClassNames} variant='primary' onClick={() => setStep(HOME_STEPS.HOME_MAP)}>
						<SiGooglemaps />
						<span className={styles.Text}>Mapa</span>
					</Button>
				</div>
			</div>
			<div className={styles.Wrapper}>
				{!isMobileOrTablet && (
					<div className={styles.Filter}>
						<div className={styles.Header}>
							<span>Filtros</span>
						</div>
						<span className={styles.Title}>Aqui van los filtros</span>
						<span className={styles.Subtitle}>ej: alquiler - venta</span>
						<span className={styles.Subtitle}>precio</span>
						<span className={styles.Subtitle}>ascensor</span>
						<span className={styles.Subtitle}>interior</span>
						<span className={styles.Subtitle}>exteriror</span>
					</div>
				)}
				<HomeStep greatPlaces={greatPlaces} className={styles.Map} />
			</div>
		</div>
	);
};

Home.propTypes = propTypes;
Home.defaultProps = defaultProps;

export default Home;
