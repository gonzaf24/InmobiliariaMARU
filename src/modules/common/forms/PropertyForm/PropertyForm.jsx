import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import { Row } from 'react-bootstrap';
import { SELECTORS } from '../../../../utils';
import { InputCheckbox, InputDate, InputNumber, InputNumberLabel, InputSelect, InputTextarea } from '../../components';

import styles from './PropertyForm.module.scss';

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
	size: PropTypes.number,
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
	parkingIncluded: PropTypes.bool,
	onParkingIncludedChange: PropTypes.func,
	parkingOptional: PropTypes.bool,
	onParkingOptionalChange: PropTypes.func,
	parkingPrice: PropTypes.number,
	onParkingPriceChange: PropTypes.func,
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
	exterior: PropTypes.bool,
	onExteriorChange: PropTypes.func,
	elevator: PropTypes.bool,
	onElevatorChange: PropTypes.func,
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
	rooms: undefined,
	onRoomsChange: () => {},
	bathrooms: undefined,
	onBathroomsChange: () => {},
	size: undefined,
	onSizeChange: () => {},
	floors: undefined,
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
	parkingIncluded: false,
	onParkingIncludedChange: () => {},
	parkingOptional: false,
	onParkingOptionalChange: () => {},
	parkingPrice: undefined,
	onParkingPriceChange: () => {},
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
	exterior: false,
	onExteriorChange: () => {},
	elevator: false,
	onElevatorChange: () => {},
	constructionYear: '',
	onConstructionYearChange: () => {},
	renovationYear: '',
	onRenovationYearChange: () => {},
	antiquity: 0,
	onAntiquityChange: () => {},
	observations: '',
	onObservationsChange: () => {},
};

const PROPERTY_TYPES = Object.values(SELECTORS.PROPERTY_TYPES);
const PROPERTY_HEATING_COOLING_OPTIONS = Object.values(SELECTORS.PROPERTY_HEATING_COOLING_OPTIONS);
const DEFUALT_SELECTOR = SELECTORS.DEFUALT_SELECTOR;

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
	parkingIncluded,
	onParkingIncludedChange,
	parkingOptional,
	onParkingOptionalChange,
	parkingPrice,
	onParkingPriceChange,
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
	exterior,
	onExteriorChange,
	elevator,
	onElevatorChange,
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
			<Row>
				<InputSelect
					colsWidth={2}
					label='Propiedad'
					options={PROPERTY_TYPES}
					value={propertyType}
					onChange={onPropertyTypeChange}
					defaultValue={DEFUALT_SELECTOR}
				/>
				<InputNumber colsWidth={2} label='Habitaciones' value={rooms} onChange={onRoomsChange} />
				<InputNumber colsWidth={2} label='Baños' value={bathrooms} onChange={onBathroomsChange} />
				<InputNumberLabel colsWidth={2} label='Tamaño' text={'m²'} value={size} onChange={onSizeChange} />
				<InputNumber colsWidth={2} label='Nro. Plantas' value={floors} onChange={onFloorsChange} />
				<InputSelect
					colsWidth={2}
					label='Calefacción'
					options={PROPERTY_HEATING_COOLING_OPTIONS}
					value={heatingCooling}
					onChange={onHeatingCoolingChange}
					defaultValue={DEFUALT_SELECTOR}
				/>
			</Row>
			<Row>
				<InputCheckbox colsWidth={2} label='Agua' value={water} onChange={onWaterChange} />
				<InputCheckbox colsWidth={2} label='Luz' value={electricity} onChange={onElectricityChange} />
				<InputCheckbox colsWidth={2} label='Gas' value={gas} onChange={onGasChange} />
				<InputCheckbox colsWidth={2} label='Amueblado' value={furnished} onChange={onFurnishedChange} />
				<InputCheckbox colsWidth={2} label='Mascotas' value={pets} onChange={onPetsChange} />
				<InputCheckbox colsWidth={2} label='Piscina' value={pool} onChange={onPoolChange} />
				<InputCheckbox colsWidth={2} label='Jacuzzi' value={jacuzzi} onChange={onJacuzziChange} />
				<InputCheckbox colsWidth={2} label='Jardin' value={garden} onChange={onGardenChange} />
				<InputCheckbox colsWidth={2} label='Terraza' value={terrace} onChange={onTerraceChange} />
				<InputCheckbox colsWidth={2} label='Horizontal' value={horizontal} onChange={onHorizontalChange} />
				<InputCheckbox colsWidth={2} label='Exterior' value={exterior} onChange={onExteriorChange} />
				<InputCheckbox colsWidth={2} label='Ascensor' value={elevator} onChange={onElevatorChange} />
			</Row>
			<Row className={styles.Row}>
				<InputCheckbox
					isDisabled={parkingOptional}
					colsWidth={2}
					label='Parking incluido'
					value={parkingIncluded}
					onChange={onParkingIncludedChange}
				/>
				<InputCheckbox
					colsWidth={2}
					label='Parking opcional'
					isDisabled={parkingIncluded}
					value={parkingOptional}
					onChange={onParkingOptionalChange}
				/>
				<InputNumberLabel
					colsWidth={3}
					isDisabled={parkingIncluded}
					label='Precio parking'
					text={'€/month'}
					value={parkingPrice}
					onChange={onParkingPriceChange}
				/>
			</Row>
			<Row>
				<InputDate
					colsWidth={3}
					label='Fecha de construcción'
					value={constructionYear}
					onChange={onConstructionYearChange}
				/>
				<InputDate colsWidth={3} label='Fecha ult. renovación' value={renovationYear} onChange={onRenovationYearChange} />
				<InputNumber colsWidth={3} label='Antiguedad (años)' value={antiquity} onChange={onAntiquityChange} />
			</Row>
			<Row>
				<InputTextarea
					colsWidth={12}
					label='Observaciones de la propiedad (no se mostrara en la web)'
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
