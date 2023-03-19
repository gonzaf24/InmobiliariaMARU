import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import Geocode from 'react-geocode';
import styles from './SearchAddressForm.module.scss';
import classNames from 'classnames';
import { GoogleMap } from '../../components';
import { Col, FloatingLabel, Form, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

const API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
Geocode.setApiKey(API_KEY);

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
	WithAddress: 'SearchAddressForm.WithAddress',
	WithLatLng: 'SearchAddressForm.WithLatLng',
};

const SearchAddressForm = ({ className, testId, id }) => {
	const { t } = useTranslation();
	const [address, setAddress] = useState('');
	const [lat, setLat] = useState();
	const [lng, setLng] = useState();
	const [isAddress, setIsAddress] = useState(true);
	const [validated, setValidated] = useState(false);
	const [exactPosition, setExactPosition] = useState(false);
	const [showInMap, setShowInMap] = useState(true);

	const handleSelect = useCallback(async result => {
		console.log('handleSelect  result ', result);

		const { description } = result;
		console.log('handleSelect description ', description);

		setAddress(description);
		try {
			const response = await Geocode.fromAddress(description);
			console.log('handleSelect dopo await ', response);
			const { lat, lng } = response.results[0].geometry.location;
			console.log(' aca son lat, lng ', lat, lng);
			setLat(Number(lat));
			setLng(Number(lng));
		} catch (error) {
			console.error(error);
		}
	}, []);

	const onSearchTypeChange = e => {
		setIsAddress(!isAddress);
	};

	const onExactPostionChange = e => {
		setExactPosition(!exactPosition);
	};

	const onShowOnMapChange = e => {
		setShowInMap(!showInMap);
	};

	const onLatitudeChange = e => {
		const { value } = e.target;
		setLat(Number(value));
	};

	const onLongitudeChange = e => {
		const { value } = e.target;
		setLng(Number(value));
	};

	const handleSubmit = event => {
		const form = event.currentTarget;
		if (form.checkValidity() === false) {
			event.preventDefault();
			event.stopPropagation();
		}

		setValidated(true);
	};

	const latValue = lat || '';
	const lngValue = lng || '';
	const label = isAddress ? texts.WithAddress : texts.WithLatLng;
	const searchAddressFormClassNames = classNames(styles.SearchAddressForm, className);

	return (
		<div className={searchAddressFormClassNames} data-testid={testId} id={id}>
			<div className={styles.ChecksWrapper}>
				<Form.Check
					type='switch'
					label={t(label)}
					className={styles.Switch}
					onChange={onSearchTypeChange}
					checked={isAddress}
				/>

				<Form.Check
					onChange={onExactPostionChange}
					label='Posicion extacta'
					type={'checkbox'}
					id={`inline-checks-2`}
					className={styles.Check}
					checked={exactPosition}
				/>

				<Form.Check
					onChange={onShowOnMapChange}
					label='Mostrar en mapa principal'
					type={'checkbox'}
					id={`inline-checks-3`}
					className={styles.Check}
					checked={showInMap}
				/>
			</div>
			{isAddress && (
				<GooglePlacesAutocomplete
					className={styles.InputText}
					apiKey={API_KEY}
					initialValue={address}
					onSelect={handleSelect}
					keyboardShouldPersistTaps='handled'
					autocompletionRequest={{
						types: ['geocode'],
						componentRestrictions: { country: ['es', 'do'] },
					}}
					fetchDetails={true}
				/>
			)}
			{!isAddress && (
				<Form noValidate validated={validated} onSubmit={handleSubmit}>
					<Row className={styles.Margins}>
						<Form.Group as={Col} md='4' className={styles.Margins} controlId='validationCustom01'>
							<FloatingLabel controlId='validationCustom01' label='Latitud'>
								<Form.Control type='number' placeholder='' value={lat} onChange={onLatitudeChange} />
							</FloatingLabel>
						</Form.Group>
						<Form.Group as={Col} md='4' className={styles.Margins} controlId='validationCustom02'>
							<FloatingLabel controlId='validationCustom02' label='Longitud'>
								<Form.Control type='number' placeholder='' value={lng} onChange={onLongitudeChange} />
							</FloatingLabel>
						</Form.Group>
					</Row>
				</Form>
			)}

			<GoogleMap lat={lat} lng={lng} showExactPosition={exactPosition} />

			<div className={styles.LatLngWrapper}>
				<span className={styles.Label}>{`Lat : ${latValue}`}</span>
				<span className={styles.Label}>{`Lng : ${lngValue}`}</span>
			</div>

			<span className={styles.Address}>{address}</span>
		</div>
	);
};

SearchAddressForm.propTypes = propTypes;
SearchAddressForm.defaultProps = defaultProps;

export default SearchAddressForm;
