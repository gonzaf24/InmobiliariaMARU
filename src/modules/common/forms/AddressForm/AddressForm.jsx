import React, { useCallback, useEffect, useState } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import { Row } from 'react-bootstrap';
import geografia from '../../../../utils/geografia.json';
import { SELECTORS } from '../../../../utils';
import { InputNumber, InputSelectGeography, InputText } from '../../components';

import styles from './AddressForm.module.scss';

const propTypes = {
	className: PropTypes.string,
	testId: PropTypes.string,
	id: PropTypes.string,
	country: PropTypes.string,
	onCountryChange: PropTypes.func,
	region: PropTypes.string,
	onRegionChange: PropTypes.func,
	city: PropTypes.string,
	onCityChange: PropTypes.func,
	neighborhood: PropTypes.string,
	onNeighborhoodChange: PropTypes.func,
	postalCode: PropTypes.number,
	onPostalCodeChange: PropTypes.func,
	street: PropTypes.string,
	onStreetChange: PropTypes.func,
	addressNumber: PropTypes.string,
	onAddressNumberChange: PropTypes.func,
	floor: PropTypes.string,
	onFloorChange: PropTypes.func,
	door: PropTypes.string,
	onDoorChange: PropTypes.func,
	stair: PropTypes.string,
	onStairChange: PropTypes.func,
};

const defaultProps = {
	className: '',
	testId: undefined,
	id: undefined,
	country: '',
	onCountryChange: () => {},
	region: '',
	onRegionChange: () => {},
	city: '',
	onCityChange: () => {},
	neighborhood: '',
	onNeighborhoodChange: () => {},
	postalCode: undefined,
	onPostalCodeChange: () => {},
	street: '',
	onStreetChange: () => {},
	addressNumber: '',
	onAddressNumberChange: () => {},
	floor: '',
	onFloorChange: () => {},
	door: '',
	onDoorChange: () => {},
	stair: '',
	onStairChange: () => {},
};

const AddressForm = ({
	className,
	testId,
	id,
	country,
	onCountryChange,
	region,
	onRegionChange,
	city,
	onCityChange,
	neighborhood,
	onNeighborhoodChange,
	postalCode,
	onPostalCodeChange,
	street,
	onStreetChange,
	addressNumber,
	onAddressNumberChange,
	floor,
	onFloorChange,
	door,
	onDoorChange,
	stair,
	onStairChange,
}) => {
	const addressFormClassNames = classnames(styles.AddressForm, className);
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

	return (
		<div className={addressFormClassNames} data-testid={testId} id={id}>
			<Row>
				<InputSelectGeography
					options={paisesMap}
					defaultValue={SELECTORS.DEFUALT_SELECTOR}
					colsWidth={3}
					label='Pais'
					value={country}
					onChange={handlePaisSeleccionado}
					isRequired
				/>
				<InputSelectGeography
					options={regionesMap}
					defaultValue={SELECTORS.DEFUALT_SELECTOR}
					colsWidth={3}
					label='Region'
					value={region}
					onChange={handleRegionSeleccionada}
					isDisabled={!country}
					isRequired
				/>
				<InputSelectGeography
					options={ciudadesMap}
					defaultValue={SELECTORS.DEFUALT_SELECTOR}
					colsWidth={2}
					label='Ciudad'
					value={city}
					onChange={handleCiudadSeleccionada}
					isDisabled={!region}
					isRequired
				/>
				<InputSelectGeography
					options={barrios}
					defaultValue={SELECTORS.DEFUALT_SELECTOR}
					colsWidth={2}
					label='Barrio'
					value={neighborhood}
					onChange={handleBarrioSeleccionado}
					isDisabled={!city}
					isRequired
				/>
				<InputNumber colsWidth={2} label='Codigo Postal' value={postalCode} onChange={onPostalCodeChange} isRequired />
			</Row>
			<Row>
				<InputText colsWidth={5} label='Calle' value={street} onChange={onStreetChange} isRequired />
				<InputText colsWidth={2} label='Numero' value={addressNumber} onChange={onAddressNumberChange} isRequired />
				<InputText colsWidth={1} label='Piso' value={floor} onChange={onFloorChange} />
				<InputText colsWidth={2} label='Puerta' value={door} onChange={onDoorChange} />
				<InputText colsWidth={2} label='Escalera' value={stair} onChange={onStairChange} />
			</Row>
		</div>
	);
};

AddressForm.propTypes = propTypes;
AddressForm.defaultProps = defaultProps;

export default AddressForm;
