import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import styles from './PropertyForm.module.scss';
import { Row } from 'react-bootstrap';
import { SELECTORS } from '../../utils/constants';
import { InputCheckbox, InputDate, InputNumber, InputSelect, InputTextarea, InputTextLabel } from '../../components/inputs';

const propTypes = {
	className: PropTypes.string,
	testId: PropTypes.string,
	id: PropTypes.string,
	propertyType: PropTypes.string,
	onPropertyTypeChange: PropTypes.func,
	rooms: PropTypes.number,
	onRoomsChange: PropTypes.func,
	bathrooms: PropTypes.number,
	onBathroomsChange: PropTypes.func,
	size: PropTypes.string,
	onSizeChange: PropTypes.func,
	floors: PropTypes.number,
	onFloorsChange: PropTypes.func,
	heatingCooling: PropTypes.string,
	onHeatingCoolingChange: PropTypes.func,
	water: PropTypes.bool,
	onWaterChange: PropTypes.func,
	electricity: PropTypes.bool,
	onElectricityChange: PropTypes.func,
	gas: PropTypes.bool,
	onGasChange: PropTypes.func,
	furnished: PropTypes.bool,
	onFurnishedChange: PropTypes.func,
	pets: PropTypes.bool,
	onPetsChange: PropTypes.func,
	parking: PropTypes.bool,
	onParkingChange: PropTypes.func,
	pool: PropTypes.bool,
	onPoolChange: PropTypes.func,
	jacuzzi: PropTypes.bool,
	onJacuzziChange: PropTypes.func,
	garden: PropTypes.bool,
	onGardenChange: PropTypes.func,
	terrace: PropTypes.bool,
	onTerraceChange: PropTypes.func,
	horizontal: PropTypes.bool,
	onHorizontalChange: PropTypes.func,
	constructionYear: PropTypes.string,
	onConstructionYearChange: PropTypes.func,
	renovationYear: PropTypes.string,
	onRenovationYearChange: PropTypes.func,
	antiquity: PropTypes.number,
	onAntiquityChange: PropTypes.func,
	observations: PropTypes.string,
	onObservationsChange: PropTypes.func,
};

const defaultProps = {
	className: '',
	testId: undefined,
	id: undefined,
	propertyType: '',
	onPropertyTypeChange: () => {},
	rooms: '',
	onRoomsChange: () => {},
	bathrooms: '',
	onBathroomsChange: () => {},
	size: '',
	onSizeChange: () => {},
	floors: '',
	onFloorsChange: () => {},
	heatingCooling: '',
	onHeatingCoolingChange: () => {},
	water: false,
	onWaterChange: () => {},
	electricity: false,
	onElectricityChange: () => {},
	gas: false,
	onGasChange: () => {},
	furnished: false,
	onFurnishedChange: () => {},
	pets: false,
	onPetsChange: () => {},
	parking: false,
	onParkingChange: () => {},
	pool: false,
	onPoolChange: () => {},
	jacuzzi: false,
	onJacuzziChange: () => {},
	garden: false,
	onGardenChange: () => {},
	terrace: false,
	onTerraceChange: () => {},
	horizontal: false,
	onHorizontalChange: () => {},
	constructionYear: '',
	onConstructionYearChange: () => {},
	renovationYear: '',
	onRenovationYearChange: () => {},
	antiquity: '',
	onAntiquityChange: () => {},
	observations: '',
	onObservationsChange: () => {},
};

const PROPERTY_TYPES = Object.values(SELECTORS.PROPERTY_TYPES);
const PROPERTY_HEATING_COOLING_OPTIONS = Object.values(SELECTORS.PROPERTY_HEATING_COOLING_OPTIONS);

const PropertyForm = ({
	className,
	testId,
	id,
	propertyType,
	onPropertyTypeChange,
	rooms,
	onRoomsChange,
	bathrooms,
	onBathroomsChange,
	size,
	onSizeChange,
	floors,
	onFloorsChange,
	heatingCooling,
	onHeatingCoolingChange,
	water,
	onWaterChange,
	electricity,
	onElectricityChange,
	gas,
	onGasChange,
	furnished,
	onFurnishedChange,
	pets,
	onPetsChange,
	parking,
	onParkingChange,
	pool,
	onPoolChange,
	jacuzzi,
	onJacuzziChange,
	garden,
	onGardenChange,
	terrace,
	onTerraceChange,
	horizontal,
	onHorizontalChange,
	constructionYear,
	onConstructionYearChange,
	renovationYear,
	onRenovationYearChange,
	antiquity,
	onAntiquityChange,
	observations,
	onObservationsChange,
}) => {
	const propertyClassNames = classnames(styles.PropertyForm, className);

	return (
		<div className={propertyClassNames} data-testid={testId} id={id}>
			<Row className={styles.Margins}>
				<InputSelect
					colsWidth={2}
					label='Propiedad'
					options={PROPERTY_TYPES}
					value={propertyType}
					onChange={onPropertyTypeChange}
				/>
				<InputNumber colsWidth={2} label='Habitaciones' value={rooms} onChange={onRoomsChange} />
				<InputNumber colsWidth={2} label='Baños' value={bathrooms} onChange={onBathroomsChange} />
				<InputTextLabel colsWidth={2} label='Tamaño' text={'m2'} value={size} onChange={onSizeChange} />
				<InputNumber colsWidth={2} label='Nro. Plantas' value={floors} onChange={onFloorsChange} />
				<InputSelect
					colsWidth={2}
					label='Calefaccion'
					options={PROPERTY_HEATING_COOLING_OPTIONS}
					value={heatingCooling}
					onChange={onHeatingCoolingChange}
				/>
			</Row>
			<Row className={styles.Margins}>
				<InputCheckbox colsWidth={1} label='Agua' value={water} onChange={onWaterChange} />
				<InputCheckbox colsWidth={1} label='Luz' value={electricity} onChange={onElectricityChange} />
				<InputCheckbox colsWidth={1} label='Gas' value={gas} onChange={onGasChange} />
				<InputCheckbox colsWidth={1} label='Amueblado' value={furnished} onChange={onFurnishedChange} />
				<InputCheckbox colsWidth={1} label='Mascotas' value={pets} onChange={onPetsChange} />
				<InputCheckbox colsWidth={1} label='Parking' value={parking} onChange={onParkingChange} />
				<InputCheckbox colsWidth={1} label='Piscina' value={pool} onChange={onPoolChange} />
				<InputCheckbox colsWidth={1} label='Jacuzzi' value={jacuzzi} onChange={onJacuzziChange} />
				<InputCheckbox colsWidth={1} label='Jardin' value={garden} onChange={onGardenChange} />
				<InputCheckbox colsWidth={1} label='Terraza' value={terrace} onChange={onTerraceChange} />
				<InputCheckbox colsWidth={1} label='Horizontal' value={horizontal} onChange={onHorizontalChange} />
			</Row>
			<Row className={styles.Margins}>
				<InputDate
					colsWidth={3}
					label='Fecha de construccion'
					value={constructionYear}
					onChange={onConstructionYearChange}
				/>
				<InputDate colsWidth={3} label='Fecha ult. renovacion' value={renovationYear} onChange={onRenovationYearChange} />
				<InputNumber colsWidth={3} label='Antiguedad (años)' value={antiquity} onChange={onAntiquityChange} />
			</Row>
			<Row className={styles.Margins}>
				<InputTextarea
					colsWidth={12}
					label='Observaciones de la propiedad'
					value={observations}
					onChange={onObservationsChange}
				/>
			</Row>
		</div>
	);
};

PropertyForm.propTypes = propTypes;
PropertyForm.defaultProps = defaultProps;

export default PropertyForm;
