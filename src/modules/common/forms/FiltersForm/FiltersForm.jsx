import React, { useCallback, useEffect, useState } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import geografia from '../../utils/geografia.json';
import { Form, Row } from 'react-bootstrap';
import { InputSelect, InputSelectGeography } from '../../components';
import { SELECTORS } from '../../utils/constants';

import styles from './FiltersForm.module.scss';

const propTypes = {
	className: PropTypes.string,
	testId: PropTypes.string,
	id: PropTypes.string,
	operation: PropTypes.string,
	onOperationChange: PropTypes.func,
	price: PropTypes.string,
	onPriceChange: PropTypes.func,
	propertyType: PropTypes.string,
	onPropertyTypeChange: PropTypes.func,
	country: PropTypes.string,
	onCountryChange: PropTypes.func,
	region: PropTypes.string,
	onRegionChange: PropTypes.func,
	city: PropTypes.string,
	onCityChange: PropTypes.func,
	neighborhood: PropTypes.string,
	onNeighborhoodChange: PropTypes.func,
};

const defaultProps = {
	className: '',
	testId: undefined,
	id: undefined,
	operation: '',
	onOperationChange: () => {},
	price: '',
	onPriceChange: () => {},
	propertyType: '',
	onPropertyTypeChange: () => {},
	country: '',
	onCountryChange: () => {},
	region: '',
	onRegionChange: () => {},
	city: '',
	onCityChange: () => {},
	neighborhood: '',
	onNeighborhoodChange: () => {},
};

const PROPERTY_ACQUISITION_OPTIONS = Object.values(SELECTORS.PROPERTY_ACQUISITION_OPTIONS);
const PROPERTY_TYPES = Object.values(SELECTORS.PROPERTY_TYPES);
const DEFUALT_SELECTOR = SELECTORS.DEFUALT_SELECTOR;
const MIN_MAX_DEFAULT_SELECTOR = SELECTORS.MIN_MAX_DEFAULT_SELECTOR;
const RENT_PRICE_FILTER = Object.values(SELECTORS.RENT_PRICE_FILTER);

const FiltersForm = ({
	className,
	testId,
	id,
	operation,
	onOperationChange,
	propertyType,
	onPropertyTypeChange,
	price,
	onPriceChange,
	country,
	onCountryChange,
	region,
	onRegionChange,
	city,
	onCityChange,
	neighborhood,
	onNeighborhoodChange,
}) => {
	const [regiones, setRegiones] = useState([]);
	const [ciudades, setCiudades] = useState([]);
	const [barrios, setBarrios] = useState([]);
	const paisesMap = Object.keys(geografia);
	const regionesMap = Object.keys(regiones);
	const ciudadesMap = Object.keys(ciudades);

	useEffect(() => {
		if (!!country && !!region && !!city) {
			setRegiones(geografia[country]);
			setCiudades(geografia[country][region]);
			setBarrios(geografia[country][region][city]);
		}
	}, [country, region, city]);

	const resetValues = useCallback(() => {
		onCountryChange('');
		setRegiones([]);
		setCiudades([]);
		setBarrios([]);
		onRegionChange('');
		onCityChange('');
		onNeighborhoodChange('');
	}, []);

	const handlePaisSeleccionado = useCallback(event => {
		const _country = event.target.value;
		if (_country === SELECTORS.DEFUALT_SELECTOR) {
			resetValues();
			return;
		}
		onCountryChange(_country);
		setRegiones(geografia[_country]);
		setCiudades([]);
		setBarrios([]);
		onRegionChange('');
		onCityChange('');
		onNeighborhoodChange('');
	}, []);

	const handleRegionSeleccionada = useCallback(
		event => {
			const _region = event.target.value;
			if (_region === SELECTORS.DEFUALT_SELECTOR) {
				return;
			}
			onRegionChange(_region);
			setCiudades(geografia[country][_region]);
			setBarrios([]);
			onCityChange('');
			onNeighborhoodChange('');
		},
		[country]
	);

	const handleCiudadSeleccionada = useCallback(
		event => {
			const _city = event.target.value;
			if (_city === SELECTORS.DEFUALT_SELECTOR) {
				return;
			}
			onCityChange(_city);
			setBarrios(geografia[country][region][_city]);
			onNeighborhoodChange('');
		},
		[country, region]
	);

	const handleBarrioSeleccionado = useCallback(event => {
		const _neighborhood = event.target.value;
		if (_neighborhood === SELECTORS.DEFUALT_SELECTOR) {
			return;
		}
		onNeighborhoodChange(_neighborhood);
	}, []);

	const submitForm = event => {
		event.preventDefault();
	};

	const filtersFormClassNames = classnames(styles.FiltersForm, className);

	return (
		<Form onSubmit={submitForm}>
			<div className={filtersFormClassNames} data-testid={testId} id={id}>
				<Row>
					<InputSelect
						colsWidth={12}
						label='Operacion'
						options={PROPERTY_ACQUISITION_OPTIONS}
						value={operation}
						onChange={onOperationChange}
						isRequired
						defaultValue={DEFUALT_SELECTOR}
						className={styles.Selector}
					/>
				</Row>
				<Row>
					<InputSelect
						colsWidth={12}
						label='Propiedad'
						options={PROPERTY_TYPES}
						value={propertyType}
						onChange={onPropertyTypeChange}
						defaultValue={DEFUALT_SELECTOR}
						className={styles.Selector}
					/>
				</Row>
				<Row>
					<InputSelectGeography
						options={paisesMap}
						defaultValue={SELECTORS.DEFUALT_SELECTOR}
						colsWidth={12}
						label='Pais'
						value={country}
						onChange={handlePaisSeleccionado}
						isRequired
					/>
					<InputSelectGeography
						options={regionesMap}
						defaultValue={SELECTORS.DEFUALT_SELECTOR}
						colsWidth={12}
						label='Region'
						value={region}
						onChange={handleRegionSeleccionada}
						isDisabled={!country}
						isRequired
					/>
					<InputSelectGeography
						options={ciudadesMap}
						defaultValue={SELECTORS.DEFUALT_SELECTOR}
						colsWidth={12}
						label='Ciudad'
						value={city}
						onChange={handleCiudadSeleccionada}
						isDisabled={!region}
						isRequired
					/>
					<InputSelectGeography
						options={barrios}
						defaultValue={SELECTORS.DEFUALT_SELECTOR}
						colsWidth={12}
						label='Barrio'
						value={neighborhood}
						onChange={handleBarrioSeleccionado}
						isDisabled={!city}
						isRequired
					/>
				</Row>
				<Row>
					<InputSelect
						colsWidth={6}
						label='Precio minimo'
						options={RENT_PRICE_FILTER}
						value={price}
						onChange={onPriceChange}
						defaultValue={MIN_MAX_DEFAULT_SELECTOR.min}
						className={styles.Selector}
					/>
					<InputSelect
						colsWidth={6}
						label='Precio maximo'
						options={RENT_PRICE_FILTER}
						value={price}
						onChange={onPriceChange}
						defaultValue={MIN_MAX_DEFAULT_SELECTOR.max}
						className={styles.Selector}
					/>
				</Row>
			</div>
		</Form>
	);
};

FiltersForm.propTypes = propTypes;
FiltersForm.defaultProps = defaultProps;

export default FiltersForm;
