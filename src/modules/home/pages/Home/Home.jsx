import React, { useEffect, useState } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import { Button } from 'react-bootstrap';
import { SiGooglemaps } from 'react-icons/si';
import { BsListTask } from 'react-icons/bs';
import { RealEstateList, RealEstateMap } from '../../components';

import styles from './Home.module.scss';
import { FiltersForm, useDevice, useHouse, useStep } from '../../../common';
import { useTranslation } from 'react-i18next';
import FilterModal from '../../components/FilterModal/FilterModal';

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

const texts = {
	List: 'Constants.List',
	Map: 'Constants.Map',
	Filters: 'Constants.Filters',
};

const INITIAL_STEP = HOME_STEPS.HOME_LIST;

const Home = ({ className, testId, id }) => {
	const { t } = useTranslation();
	const { getFilteredHousesList } = useHouse();
	const { step, setStep } = useStep(INITIAL_STEP);
	const [greatPlaces, setGreatPlaces] = useState([]);
	const { isMobile, isTablet } = useDevice();

	useEffect(() => {
		const retrieveHouses = async () => {
			// Recupera los filtros del almacenamiento local
			const savedFilters = localStorage.getItem('filters');

			console.log('savedFilters', savedFilters);
			const filters = savedFilters ? JSON.parse(savedFilters) : {};

			const housesOut = await getFilteredHousesList(filters);
			setGreatPlaces(housesOut);
		};

		retrieveHouses();
	}, []);

	const handleFilter = async filterParams => {
		const housesOut = await getFilteredHousesList(filterParams);
		setGreatPlaces(housesOut);
	};

	const isMobileOrTablet = isMobile || isTablet;
	const HomeStep = HOME_COMPONENTS[step];
	const mapButtonClassNames = classnames(styles.Button, { [styles.Active]: step === HOME_STEPS.HOME_MAP });
	const listButtonClassNames = classnames(styles.Button, { [styles.Active]: step === HOME_STEPS.HOME_LIST });
	const homeClassNames = classnames(styles.Home, className);

	return (
		<div className={homeClassNames} data-testid={testId} id={id}>
			<div className={styles.Menu}>
				{isMobileOrTablet && <FilterModal onFilter={handleFilter} />}
				<div className={styles.Wrapper}>
					<Button className={listButtonClassNames} variant='primary' onClick={() => setStep(HOME_STEPS.HOME_LIST)}>
						<BsListTask />
						<span className={styles.Text}>{t(texts.List)}</span>
					</Button>
					<Button className={mapButtonClassNames} variant='primary' onClick={() => setStep(HOME_STEPS.HOME_MAP)}>
						<SiGooglemaps />
						<span className={styles.Text}>{t(texts.Map)}</span>
					</Button>
				</div>
			</div>
			<div className={styles.Wrapper}>
				{!isMobileOrTablet && (
					<div className={styles.Filter}>
						<div className={styles.Header}>
							<span>{t(texts.Filters)}</span>
						</div>
						<FiltersForm onFilter={handleFilter} />
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
