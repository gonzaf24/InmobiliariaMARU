import React, { useCallback, useState } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import styles from './AddressForm.module.scss';
import { Row } from 'react-bootstrap';
import geografia from './geografia.json';
import { InputSelectGeography, InputText } from '../../components/inputs';

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
	postalCode: PropTypes.string,
	onPostalCodeChange: PropTypes.func,
	street: PropTypes.string,
	onStreetChange: PropTypes.func,
	number: PropTypes.string,
	onNumberChange: PropTypes.func,
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
	postalCode: '',
	onPostalCodeChange: () => {},
	street: '',
	onStreetChange: () => {},
	number: '',
	onNumberChange: () => {},
	floor: '',
	onFloorChange: () => {},
	door: '',
	onDoorChange: () => {},
	stair: '',
	onStairChange: () => {},
};

const DEFUALT_SELECTOR = 'Seleccione';

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
	number,
	onNumberChange,
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
		const pais = event.target.value;
		if (pais === DEFUALT_SELECTOR) {
			resetValues();
			return;
		}
		onCountryChange(pais);
		setRegiones(geografia[pais]);
		setCiudades([]);
		setBarrios([]);
		onRegionChange('');
		onCityChange('');
		onNeighborhoodChange('');
	}, []);

	const handleRegionSeleccionada = useCallback(
		event => {
			const _region = event.target.value;
			if (_region === DEFUALT_SELECTOR) {
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
			const ciudad = event.target.value;
			if (ciudad === DEFUALT_SELECTOR) {
				return;
			}
			onCityChange(ciudad);
			setBarrios(geografia[country][region][ciudad]);
			onNeighborhoodChange('');
		},
		[country, region]
	);

	const handleBarrioSeleccionado = useCallback(event => {
		const barrio = event.target.value;
		if (barrio === DEFUALT_SELECTOR) {
			return;
		}
		onNeighborhoodChange(barrio);
	}, []);

	return (
		<div className={addressFormClassNames} data-testid={testId} id={id}>
			<Row className={styles.Margins}>
				<InputSelectGeography
					options={paisesMap}
					defaultValue={DEFUALT_SELECTOR}
					colsWidth={3}
					label='Pais'
					value={country}
					onChange={handlePaisSeleccionado}
				/>
				<InputSelectGeography
					options={regionesMap}
					defaultValue={DEFUALT_SELECTOR}
					colsWidth={3}
					label='Comunidad'
					value={region}
					onChange={handleRegionSeleccionada}
					isDisabled={!country}
				/>
				<InputSelectGeography
					options={ciudadesMap}
					defaultValue={DEFUALT_SELECTOR}
					colsWidth={2}
					label='Ciudad'
					value={city}
					onChange={handleCiudadSeleccionada}
					isDisabled={!region}
				/>
				<InputSelectGeography
					options={barrios}
					defaultValue={DEFUALT_SELECTOR}
					colsWidth={2}
					label='Barrio'
					value={neighborhood}
					onChange={handleBarrioSeleccionado}
					isDisabled={!city}
				/>
				<InputText colsWidth={2} label='Codigo Postal' value={postalCode} onChange={onPostalCodeChange} />
			</Row>
			<Row className={styles.Margins}>
				<InputText colsWidth={5} label='Calle' value={street} onChange={onStreetChange} />
				<InputText colsWidth={2} label='Numero' value={number} onChange={onNumberChange} />
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
