import React, { useState } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import { Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import FileUploadForm, { UPLOAD_TYPE } from '../FileUploadForm/FileUploadForm';

import useToastContext from '../../../../context/toastContext';
import {
	TypeOperationForm,
	useHouse,
	PropertyForm,
	AddressForm,
	SearchAddressForm,
	TitleDescriptionForm,
	OwnerContactForm,
} from '../../../common';

import styles from './NewHouseForm.module.scss';

const propTypes = {
	className: PropTypes.string,
	testId: PropTypes.string,
	id: PropTypes.string,
	isOpen: PropTypes.bool,
	onClose: PropTypes.func,
};

const defaultProps = {
	className: '',
	testId: undefined,
	id: undefined,
	isOpen: false,
	onClose: () => {},
};

const texts = {
	Cancel: 'Cancel',
	Create: 'Create',
};

const NewHouseForm = ({ className, testId, id, onClose }) => {
	const { t } = useTranslation();
	const [operation, setOperation] = useState();
	const [price, setPrice] = useState();

	const [country, setCountry] = useState();
	const [region, setRegion] = useState();
	const [city, setCity] = useState();
	const [neighborhood, setNeighborhood] = useState();
	const [postalCode, setPostalCode] = useState();
	const [street, setStreet] = useState();
	const [addressNumber, setAddressNumber] = useState();
	const [floor, setFloor] = useState();
	const [door, setDoor] = useState();
	const [stair, setStair] = useState();

	const [propertyType, setPropertyType] = useState();
	const [rooms, setRooms] = useState();
	const [bathrooms, setBathrooms] = useState();
	const [size, setSize] = useState();
	const [floors, setFloors] = useState();
	const [heatingCooling, setHeatingCooling] = useState();

	const [water, setWater] = useState(false);
	const [electricity, setElectricity] = useState(false);
	const [gas, setGas] = useState(false);
	const [furnished, setFurnished] = useState(false);
	const [pets, setPets] = useState(false);
	const [parkingIncluded, setParkingIncluded] = useState(false);
	const [parkingOptional, setParkingOptional] = useState(false);
	const [parkingPrice, setParkingPrice] = useState();
	const [pool, setPool] = useState(false);
	const [jacuzzi, setJacuzzi] = useState(false);
	const [garden, setGarden] = useState(false);
	const [terrace, setTerrace] = useState(false);
	const [horizontal, setHorizontal] = useState(false);
	const [exterior, setExterior] = useState(false);
	const [elevator, setElevator] = useState(false);

	const [constructionYear, setConstructionYear] = useState();
	const [renovationYear, setRenovationYear] = useState();
	const [antiquity, setAntiquity] = useState();
	const [observations, setObservations] = useState();

	const [ownerName, setOwnerName] = useState();
	const [ownerPhone, setOwnerPhone] = useState();
	const [ownerEmail, setOwnerEmail] = useState();

	const [title, setTitle] = useState();
	const [description, setDescription] = useState();

	const [address, setAddress] = useState();
	const [lat, setLat] = useState();
	const [lng, setLng] = useState();
	const [isAddress, setIsAddress] = useState(true);
	const [exactPosition, setExactPosition] = useState(true);
	const [showInMap, setShowInMap] = useState(true);

	const [photos, setPhotos] = useState([]);
	const [videos, setVideos] = useState([]);
	const [documents, setDocuments] = useState([]);

	const { newHouse, isLoading, hasError, errorMessage } = useHouse();
	const navigate = useNavigate();

	const { addSuccessToast, addErrorToast } = useToastContext();

	const resetInputs = () => {
		setOperation();
		setPrice();

		setCountry();
		setRegion();
		setCity();
		setNeighborhood();
		setPostalCode();
		setStreet();
		setAddressNumber();
		setFloor();
		setDoor();
		setStair();

		setPropertyType();
		setRooms();
		setBathrooms();
		setSize();
		setFloors();
		setHeatingCooling();
		setWater(false);
		setElectricity(false);
		setGas(false);
		setFurnished(true);
		setPets(false);
		setParkingIncluded(false);
		setParkingOptional(false);
		setParkingPrice();
		setPool(false);
		setJacuzzi(false);
		setGarden(false);
		setTerrace(false);
		setHorizontal(false);
		setExterior(false);
		setElevator(false);
		setConstructionYear();
		setRenovationYear();
		setAntiquity();
		setObservations();

		setOwnerName();
		setOwnerPhone();
		setOwnerEmail();

		setTitle();
		setDescription();
		setAddress();
		setLat();
		setLng();
		setIsAddress(true);
		setExactPosition(false);
		setShowInMap(false);

		setPhotos([]);

		setVideos([]);

		setDocuments([]);
	};

	const submitForm = async e => {
		try {
			e.preventDefault();
			const data = {
				operation,
				price,
				country,
				region,
				city,
				neighborhood,
				postalCode,
				street,
				addressNumber,
				floor,
				door,
				stair,
				propertyType,
				rooms,
				bathrooms,
				size,
				floors,
				heatingCooling,
				water,
				electricity,
				gas,
				furnished,
				pets,
				parkingIncluded,
				parkingOptional,
				parkingPrice,
				pool,
				jacuzzi,
				garden,
				terrace,
				horizontal,
				exterior,
				elevator,
				constructionYear,
				renovationYear,
				antiquity,
				observations,
				ownerName,
				ownerPhone,
				ownerEmail,
				title,
				description,
				address,
				lat,
				lng,
				isAddress,
				exactPosition,
				showInMap,
				photos,
				videos,
				documents,
			};

			console.log('data ', data);
			const response = await newHouse(data);
			if (response) {
				resetInputs(); // se reinician los inputs después de enviar los datos exitosamente
				console.log('hay respuesta ', response);
				console.log('isLoading ', isLoading);
				console.log('hasError ', hasError);
				console.log('errorMessage ', errorMessage);
				addSuccessToast('Creado exitosamente');
				navigate('/admin');
			}
		} catch (error) {
			addErrorToast(error);
			console.log(error);
		}
	};

	const handleClose = () => {
		resetInputs();
		onClose();
	};

	const newHouseFormClassNames = classnames(styles.NewHouseForm, className);

	return (
		<Form onSubmit={submitForm}>
			<div className={newHouseFormClassNames} data-testid={testId} id={id}>
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
					addressNumber={addressNumber}
					onAddressNumberChange={setAddressNumber}
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
					parkingIncluded={parkingIncluded}
					onParkingIncludedChange={setParkingIncluded}
					parkingOptional={parkingOptional}
					onParkingOptionalChange={setParkingOptional}
					parkingPrice={parkingPrice}
					onParkingPriceChange={setParkingPrice}
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
					exterior={exterior}
					onExteriorChange={setExterior}
					elevator={elevator}
					onElevatorChange={setElevator}
					constructionYear={constructionYear}
					onConstructionYearChange={setConstructionYear}
					renovationYear={renovationYear}
					onRenovationYearChange={setRenovationYear}
					antiquity={antiquity}
					onAntiquityChange={setAntiquity}
					observations={observations}
					onObservationsChange={setObservations}
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
				<FileUploadForm files={photos} onFileChange={setPhotos} uploadType={UPLOAD_TYPE.IMAGE} />
				<FileUploadForm files={videos} onFileChange={setVideos} uploadType={UPLOAD_TYPE.VIDEO} />
				<FileUploadForm files={documents} onFileChange={setDocuments} uploadType={UPLOAD_TYPE.DOCUMENT} />
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
				<div className={styles.Footer}>
					<Button variant='secondary' onClick={handleClose} className={styles.Button}>
						{t(texts.Cancel)}
					</Button>
					<Button variant='primary' type='submit' className={styles.Button}>
						{t(texts.Create)}
					</Button>
				</div>
			</div>
		</Form>
	);
};

NewHouseForm.propTypes = propTypes;
NewHouseForm.defaultProps = defaultProps;

export default NewHouseForm;
