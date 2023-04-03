import React, { useState } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import styles from './NewFlat.module.scss';
import { useTranslation } from 'react-i18next';
import {
	AddressForm,
	OwnerContactForm,
	PropertyForm,
	SearchAddressForm,
	TitleDescriptionForm,
	TypeOperationForm,
} from '../../../forms';

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

const texts = {
	Title: 'NewFlat.Title',
};

const NewFlat = ({ className, testId, id }) => {
	const newFlatClassNames = classnames(styles.NewFlat, className);
	const { t } = useTranslation();
	const [operation, setOperation] = useState();
	const [price, setPrice] = useState();
	const [country, setCountry] = useState();
	const [region, setRegion] = useState();
	const [city, setCity] = useState();
	const [neighborhood, setNeighborhood] = useState();
	const [postalCode, setPostalCode] = useState();
	const [street, setStreet] = useState();
	const [number, setNumber] = useState();
	const [floor, setFloor] = useState();
	const [door, setDoor] = useState();
	const [stair, setStair] = useState();

	const [propertyType, setPropertyType] = useState();
	const [rooms, setRooms] = useState(0);
	const [bathrooms, setBathrooms] = useState(0);
	const [size, setSize] = useState();
	const [floors, setFloors] = useState(0);
	const [heatingCooling, setHeatingCooling] = useState();
	const [water, setWater] = useState(false);
	const [electricity, setElectricity] = useState(false);
	const [gas, setGas] = useState(false);
	const [furnished, setFurnished] = useState(true);
	const [pets, setPets] = useState(false);
	const [parking, setParking] = useState(false);
	const [pool, setPool] = useState(false);
	const [jacuzzi, setJacuzzi] = useState(false);
	const [garden, setGarden] = useState(false);
	const [terrace, setTerrace] = useState(false);
	const [horizontal, setHorizontal] = useState(false);
	const [constructionYear, setConstructionYear] = useState();
	const [renovationYear, setRenovationYear] = useState();
	const [antiquity, setAntiquity] = useState(0);
	const [observations, setObservations] = useState();

	const [ownerName, setOwnerName] = useState();
	const [ownerPhone, setOwnerPhone] = useState();
	const [ownerEmail, setOwnerEmail] = useState();

	const [title, setTitle] = useState();
	const [description, setDescription] = useState();

	const [address, setAddress] = useState();
	const [lat, setLat] = useState(0);
	const [lng, setLng] = useState(0);
	const [isAddress, setIsAddress] = useState(false);
	const [exactPosition, setExactPosition] = useState(false);
	const [showInMap, setShowInMap] = useState(false);

	return (
		<div className={newFlatClassNames} data-testid={testId} id={id}>
			<span className={styles.Title}>{t(texts.Title)}</span>
			<TypeOperationForm operation={operation} onOperationChange={setOperation} price={price} onPriceChange={setPrice} />
			<AddressForm
				country={country}
				onCountryChange={setCountry}
				region={region}
				onRegionChange={setRegion}
				city={city}
				onCityChange={setCity}
				neighborhood={neighborhood}
				onNeighborhoodChange={setNeighborhood}
				postalCode={postalCode}
				onPostalCodeChange={setPostalCode}
				street={street}
				onStreetChange={setStreet}
				number={number}
				onNumberChange={setNumber}
				floor={floor}
				onFloorChange={setFloor}
				door={door}
				onDoorChange={setDoor}
				stair={stair}
				onStairChange={setStair}
			/>
			<PropertyForm
				propertyType={propertyType}
				onPropertyTypeChange={setPropertyType}
				rooms={rooms}
				onRoomsChange={setRooms}
				bathrooms={bathrooms}
				onBathroomsChange={setBathrooms}
				size={size}
				onSizeChange={setSize}
				floors={floors}
				onFloorsChange={setFloors}
				heatingCooling={heatingCooling}
				onHeatingCoolingChange={setHeatingCooling}
				water={water}
				onWaterChange={setWater}
				electricity={electricity}
				onElectricityChange={setElectricity}
				gas={gas}
				onGasChange={setGas}
				furnished={furnished}
				onFurnishedChange={setFurnished}
				pets={pets}
				onPetsChange={setPets}
				parking={parking}
				onParkingChange={setParking}
				pool={pool}
				onPoolChange={setPool}
				jacuzzi={jacuzzi}
				onJacuzziChange={setJacuzzi}
				garden={garden}
				onGardenChange={setGarden}
				terrace={terrace}
				onTerraceChange={setTerrace}
				horizontal={horizontal}
				onHorizontalChange={setHorizontal}
				constructionYear={constructionYear}
				onConstructionYearChange={setConstructionYear}
				renovationYear={renovationYear}
				onRenovationYearChange={setRenovationYear}
				antiquity={antiquity}
				onAntiquityChange={setAntiquity}
				observations={observations}
				onObservationsChange={setObservations}
			/>
			<SearchAddressForm
				address={address}
				onAddressChange={setAddress}
				lat={lat}
				onLatChange={setLat}
				lng={lng}
				onLngChange={setLng}
				isAddress={isAddress}
				onIsAddressChange={setIsAddress}
				exactPosition={exactPosition}
				onExactPositionChange={setExactPosition}
				showInMap={showInMap}
				onShowInMapChange={setShowInMap}
			/>
			<OwnerContactForm
				name={ownerName}
				onNameChange={setOwnerName}
				phone={ownerPhone}
				onPhoneChange={setOwnerPhone}
				email={ownerEmail}
				onEmailChange={setOwnerEmail}
			/>
			<TitleDescriptionForm
				title={title}
				onTitleChange={setTitle}
				description={description}
				onDescriptionChange={setDescription}
			/>
			<div className={styles.Footer}>
				<Button variant='secondary' onClick={() => {}} className={styles.Button}>
					Cancelar
				</Button>
				<Button variant='primary' type='submit' className={styles.Button}>
					Crear
				</Button>
			</div>
		</div>
	);
};

NewFlat.propTypes = propTypes;
NewFlat.defaultProps = defaultProps;

export default NewFlat;
