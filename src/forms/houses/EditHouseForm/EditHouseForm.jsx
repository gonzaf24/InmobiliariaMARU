import React, { useEffect, useState } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import { Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { UPLOAD_TYPE } from '../../FileUploadForm/FileUploadForm';
import { useHouse } from '../../../hooks';

import styles from './EditHouseForm.module.scss';
import TypeOperationForm from '../../TypeOperationForm';
import AddressForm from '../../AddressForm';
import PropertyForm from '../../PropertyForm/PropertyForm';
import SearchAddressForm from '../../SearchAddressForm';
import TitleDescriptionForm from '../../TitleDescriptionForm';
import FileUploadForm from '../../FileUploadForm';
import OwnerContactForm from '../../OwnerContactForm';
import useToastContext from '../../../context/toastContext';

const propTypes = {
	className: PropTypes.string,
	testId: PropTypes.string,
	id: PropTypes.string,
	isOpen: PropTypes.bool,
	onClose: PropTypes.func,
	house: PropTypes.object,
};

const defaultProps = {
	className: '',
	testId: undefined,
	id: undefined,
	isOpen: false,
	onClose: () => {},
	house: {},
};

const EditHouseForm = ({ className, testId, id, onClose, house }) => {
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
	const [water, setWater] = useState();
	const [electricity, setElectricity] = useState();
	const [gas, setGas] = useState();
	const [furnished, setFurnished] = useState();
	const [pets, setPets] = useState();
	const [parking, setParking] = useState();
	const [pool, setPool] = useState();
	const [jacuzzi, setJacuzzi] = useState();
	const [garden, setGarden] = useState();
	const [terrace, setTerrace] = useState();
	const [horizontal, setHorizontal] = useState();
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
	const [exactPosition, setExactPosition] = useState();
	const [showInMap, setShowInMap] = useState();

	const [photos, setPhotos] = useState();
	const [videos, setVideos] = useState();
	const [documents, setDocuments] = useState();

	const { editHouse, isLoading, hasError, errorMessage } = useHouse();
	const navigate = useNavigate();

	const priceValue = house?.price ? String(house?.price) : '';

	const { addSuccessToast, addErrorToast } = useToastContext();

	useEffect(() => {
		setOperation(house?.operation);
		setPrice(priceValue);
		setCountry(house?.country);
		setRegion(house?.region);
		setCity(house?.city);
		setNeighborhood(house?.neighborhood);
		setPostalCode(house?.postalCode);
		setStreet(house?.street);
		setAddressNumber(house?.addressNumber);
		setFloor(house?.floor);
		setDoor(house?.door);
		setStair(house?.stair);

		setPropertyType(house?.propertyType);
		setRooms(house?.rooms);
		setBathrooms(house?.bathrooms);
		setSize(house?.size);
		setFloors(house?.floors);
		setHeatingCooling(house?.heatingCooling);
		setWater(house?.water);
		setElectricity(house?.electricity);
		setGas(house?.gas);
		setFurnished(house?.furnished);
		setPets(house?.pets);
		setParking(house?.parking);
		setPool(house?.pool);
		setJacuzzi(house?.jacuzzi);
		setGarden(house?.garden);
		setTerrace(house?.terrace);
		setHorizontal(house?.horizontal);
		setConstructionYear(house?.constructionYear);
		setRenovationYear(house?.renovationYear);
		setAntiquity(house?.antiquity);
		setObservations(house?.observations);

		setOwnerName(house?.ownerName);
		setOwnerPhone(house?.ownerPhone);
		setOwnerEmail(house?.ownerEmail);

		setTitle(house?.title);
		setDescription(house?.description);

		setAddress(house?.address);
		setLat(house?.lat);
		setLng(house?.lng);
		setIsAddress(house?.isAddress);
		setExactPosition(house?.exactPosition);
		setShowInMap(house?.showInMap);

		setPhotos(house?.photos);
		setVideos(house?.videos);
		setDocuments(house?.documents);
	}, []);

	const resetInputs = () => {
		setOperation(undefined);
		setPrice(undefined);
		setCountry(undefined);
		setRegion(undefined);
		setCity(undefined);
		setNeighborhood(undefined);
		setPostalCode(undefined);
		setStreet(undefined);
		setAddressNumber(undefined);
		setFloor(undefined);
		setDoor(undefined);
		setStair(undefined);
		setPropertyType(undefined);
		setRooms(undefined);
		setBathrooms(undefined);
		setSize(undefined);
		setFloors(undefined);
		setHeatingCooling(undefined);
		setWater(false);
		setElectricity(false);
		setGas(false);
		setFurnished(true);
		setPets(false);
		setParking(false);
		setPool(false);
		setJacuzzi(false);
		setGarden(false);
		setTerrace(false);
		setHorizontal(false);
		setConstructionYear(undefined);
		setRenovationYear(undefined);
		setAntiquity(undefined);
		setObservations(undefined);
		setOwnerName(undefined);
		setOwnerPhone(undefined);
		setOwnerEmail(undefined);
		setTitle(undefined);
		setDescription(undefined);
		setAddress(undefined);
		setLat(undefined);
		setLng(undefined);
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
				id: house?.id,
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
				parking,
				pool,
				jacuzzi,
				garden,
				terrace,
				horizontal,
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
			const response = await editHouse(data);
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

	const EditHouseFormClassNames = classnames(styles.EditHouseForm, className);

	return (
		<Form onSubmit={submitForm} noValidate>
			<div className={EditHouseFormClassNames} data-testid={testId} id={id}>
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
						Cancelar
					</Button>
					<Button variant='primary' type='submit' className={styles.Button}>
						Editar
					</Button>
				</div>
			</div>
		</Form>
	);
};

EditHouseForm.propTypes = propTypes;
EditHouseForm.defaultProps = defaultProps;

export default EditHouseForm;
