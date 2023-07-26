import React, { useCallback, useEffect, useMemo, useState } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import { Button, Form, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import geografia from '../../../../utils/geografia.json';
import { SELECTORS } from '../../../../utils';
import { InputSelect, InputSelectGeography } from '../../components';

import styles from './FiltersForm.module.scss';

const propTypes = {
	className: PropTypes.string,
	testId: PropTypes.string,
	id: PropTypes.string,
	onFilter: PropTypes.func,
};

const defaultProps = {
	className: '',
	testId: undefined,
	id: undefined,
	onFilter: () => {},
};

const texts = {
	Operation: 'Constants.Operation',
	PropertyType: 'Constants.PropertyType',
	Country: 'Constants.Country',
	Region: 'Constants.Region',
	City: 'Constants.City',
	Neighborhood: 'Constants.Neighborhood',
	MinPrice: 'Constants.SelectMin',
	MaxPrice: 'Constants.SelectMax',
};

const PROPERTY_ACQUISITION_OPTIONS = Object.values(SELECTORS.PROPERTY_ACQUISITION_OPTIONS);
const PROPERTY_TYPES = Object.values(SELECTORS.PROPERTY_TYPES);
const DEFUALT_SELECTOR = SELECTORS.DEFUALT_SELECTOR;
const MIN_MAX_DEFAULT_SELECTOR = SELECTORS.MIN_MAX_DEFAULT_SELECTOR;
const RENT_PRICE_FILTER = Object.values(SELECTORS.RENT_PRICE_FILTER);
const SALE_PRICE_FILTER = Object.values(SELECTORS.SALE_PRICE_FILTER);

const operationOptionsMap = {
	[SELECTORS.PROPERTY_ACQUISITION_OPTIONS.RENT.value]: RENT_PRICE_FILTER,
	[SELECTORS.PROPERTY_ACQUISITION_OPTIONS.SALE.value]: SALE_PRICE_FILTER,
};

const FiltersForm = ({ className, testId, id, onFilter }) => {
	const { t } = useTranslation();

	const [operation, setOperation] = useState();
	const [propertyType, setPropertyType] = useState();
	const [country, setCountry] = useState('');
	const [region, setRegion] = useState('');
	const [city, setCity] = useState('');
	const [neighborhood, setNeighborhood] = useState('');
	const [minPrice, setMinPrice] = useState();
	const [maxPrice, setMaxPrice] = useState();

	const [regiones, setRegiones] = useState([]);
	const [ciudades, setCiudades] = useState([]);
	const [barrios, setBarrios] = useState([]);
	const paisesMap = Object.keys(geografia);
	const regionesMap = Object.keys(regiones);
	const ciudadesMap = Object.keys(ciudades);

	const getFilterValues = () => {
		return {
			operation,
			propertyType,
			country,
			region,
			city,
			neighborhood,
			minPrice,
			maxPrice,
		};
	};

	useEffect(() => {
		onFilter(getFilterValues());
	}, [operation, propertyType, country, region, city, neighborhood, minPrice, maxPrice]);

	useEffect(() => {
		const savedFilters = localStorage.getItem('real_state_filters');
		if (savedFilters) {
			const { operation, propertyType, country, region, city, neighborhood, minPrice, maxPrice } = JSON.parse(savedFilters);
			setOperation(operation);
			setPropertyType(propertyType);
			setCountry(country);
			setRegion(region);
			setCity(city);
			setNeighborhood(neighborhood);
			setMinPrice(minPrice);
			setMaxPrice(maxPrice);
		}
	}, []);

	useEffect(() => {
		if (!!country && !!region && !!city) {
			setRegiones(geografia[country]);
			setCiudades(geografia[country][region]);
			setBarrios(geografia[country][region][city]);
		}
	}, [country, region, city]);

	const resetValues = useCallback(() => {
		setCountry('');
		setRegiones([]);
		setCiudades([]);
		setBarrios([]);
		setRegion('');
		setCity('');
		setNeighborhood('');
	}, []);

	const handlePaisSeleccionado = useCallback(event => {
		const _country = event.target.value;
		if (_country === SELECTORS.DEFUALT_SELECTOR) {
			resetValues();
			return;
		}
		setCountry(_country);
		setRegiones(geografia[_country]);
		setCiudades([]);
		setBarrios([]);
		setRegion('');
		setCity('');
		setNeighborhood('');
	}, []);

	const handleRegionSeleccionada = useCallback(
		event => {
			const _region = event.target.value;
			if (_region === SELECTORS.DEFUALT_SELECTOR) {
				return;
			}
			setRegion(_region);
			setCiudades(geografia[country][_region]);
			setBarrios([]);
			setCity('');
			setNeighborhood('');
		},
		[country]
	);

	const handleCiudadSeleccionada = useCallback(
		event => {
			const _city = event.target.value;
			if (_city === SELECTORS.DEFUALT_SELECTOR) {
				return;
			}
			setCity(_city);
			setBarrios(geografia[country][region][_city]);
			setNeighborhood('');
		},
		[country, region]
	);

	const handleBarrioSeleccionado = useCallback(event => {
		const _neighborhood = event.target.value;
		if (_neighborhood === SELECTORS.DEFUALT_SELECTOR) {
			return;
		}
		setNeighborhood(_neighborhood);
	}, []);

	const MinMaxOptions = useMemo(() => {
		return operationOptionsMap[operation] || [];
	}, [operation]);

	const handleClearFilters = () => {
		setOperation(undefined);
		setPropertyType(undefined);
		setCountry('');
		setRegion('');
		setCity('');
		setNeighborhood('');
		setMinPrice(undefined);
		setMaxPrice(undefined);

		// Clear data from localStorage
		localStorage.removeItem('real_state_filters');
	};

	const filtersFormClassNames = classnames(styles.FiltersForm, className);

	return (
		<Form>
			<div className={filtersFormClassNames} data-testid={testId} id={id}>
				<Row>
					<InputSelect
						colsWidth={12}
						label={t(texts.Operation)}
						options={PROPERTY_ACQUISITION_OPTIONS}
						defaultValue={SELECTORS.DEFUALT_SELECTOR}
						value={operation}
						onChange={setOperation}
						isRequired
						className={styles.Selector}
					/>
				</Row>
				<Row>
					<InputSelect
						colsWidth={6}
						label={t(texts.MinPrice)}
						options={MinMaxOptions}
						value={minPrice}
						onChange={setMinPrice}
						defaultValue={MIN_MAX_DEFAULT_SELECTOR.min}
						className={styles.Selector}
					/>
					<InputSelect
						colsWidth={6}
						label={t(texts.MaxPrice)}
						options={MinMaxOptions}
						value={maxPrice}
						onChange={setMaxPrice}
						defaultValue={MIN_MAX_DEFAULT_SELECTOR.max}
						className={styles.Selector}
					/>
				</Row>
				<Row>
					<InputSelect
						colsWidth={12}
						label={t(texts.PropertyType)}
						options={PROPERTY_TYPES}
						value={propertyType}
						onChange={setPropertyType}
						defaultValue={DEFUALT_SELECTOR}
						className={styles.Selector}
					/>
				</Row>
				<Row>
					<InputSelectGeography
						options={paisesMap}
						defaultValue={DEFUALT_SELECTOR}
						colsWidth={12}
						label={t(texts.Country)}
						value={country}
						onChange={handlePaisSeleccionado}
						isRequired
					/>
					<InputSelectGeography
						options={regionesMap}
						defaultValue={DEFUALT_SELECTOR}
						colsWidth={12}
						label={t(texts.Region)}
						value={region}
						onChange={handleRegionSeleccionada}
						isDisabled={!country}
						isRequired
					/>
					<InputSelectGeography
						options={ciudadesMap}
						defaultValue={DEFUALT_SELECTOR}
						colsWidth={12}
						label={t(texts.City)}
						value={city}
						onChange={handleCiudadSeleccionada}
						isDisabled={!region}
						isRequired
					/>
					<InputSelectGeography
						options={barrios}
						defaultValue={DEFUALT_SELECTOR}
						colsWidth={12}
						label={t(texts.Neighborhood)}
						value={neighborhood}
						onChange={handleBarrioSeleccionado}
						isDisabled={!city}
						isRequired
					/>
				</Row>

				<div className={styles.ButtonWrapper}>
					<Button className={styles.Button} variant='primary' onClick={handleClearFilters}>
						{t('Constants.ClearFilters')}
					</Button>
				</div>
			</div>
		</Form>
	);
};

FiltersForm.propTypes = propTypes;
FiltersForm.defaultProps = defaultProps;

export default FiltersForm;
