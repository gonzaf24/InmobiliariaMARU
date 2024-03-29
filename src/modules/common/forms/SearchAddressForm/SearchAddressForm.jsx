import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import Geocode from 'react-geocode';
import styles from './SearchAddressForm.module.scss';
import classNames from 'classnames';
import { Col, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { InputCheckbox, InputNumber, GoogleMap } from '../../components';

const API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
Geocode.setApiKey(API_KEY);

const propTypes = {
	className: PropTypes.string,
	testId: PropTypes.string,
	id: PropTypes.string,
	address: PropTypes.string,
	onAddressChange: PropTypes.func,
	lat: PropTypes.number,
	onLatChange: PropTypes.func,
	lng: PropTypes.number,
	onLngChange: PropTypes.func,
	isAddress: PropTypes.bool,
	onIsAddressChange: PropTypes.func,
	exactPosition: PropTypes.bool,
	onExactPositionChange: PropTypes.func,
	showInMap: PropTypes.bool,
	onShowInMapChange: PropTypes.func,
};

const defaultProps = {
	className: '',
	testId: undefined,
	id: undefined,
	address: '',
	onAddressChange: () => {},
	lat: undefined,
	onLatChange: () => {},
	lng: undefined,
	onLngChange: () => {},
	isAddress: true,
	onIsAddressChange: () => {},
	exactPosition: false,
	onExactPositionChange: () => {},
	showInMap: true,
	onShowInMapChange: () => {},
};

const texts = {
	WithAddress: 'SearchAddressForm.WithAddress',
	WithLatLng: 'SearchAddressForm.WithLatLng',
};

const SearchAddressForm = ({
	className,
	testId,
	id,
	address,
	onAddressChange,
	lat,
	onLatChange,
	lng,
	onLngChange,
	isAddress,
	onIsAddressChange,
	exactPosition,
	onExactPositionChange,
	showInMap,
	onShowInMapChange,
}) => {
	const { t } = useTranslation();

	const handleSelect = useCallback(
		async result => {
			const { description } = result;
			onAddressChange(description);
			try {
				const response = await Geocode.fromAddress(description);
				const { lat, lng } = response.results[0].geometry.location;
				onLatChange(Number(lat));
				onLngChange(Number(lng));
			} catch (error) {
				console.error(error);
			}
		},
		[onAddressChange, onLatChange, onLngChange]
	);

	const onSearchTypeChange = () => {
		onIsAddressChange(!isAddress);
	};

	const handleShowOnMapChange = () => {
		onShowInMapChange(!showInMap);
	};

	const latValue = lat || '';
	const lngValue = lng || '';
	const label = isAddress ? texts.WithAddress : texts.WithLatLng;
	const searchAddressFormClassNames = classNames(styles.SearchAddressForm, className);

	return (
		<div className={searchAddressFormClassNames} data-testid={testId} id={id}>
			<Col>
				<InputCheckbox
					type='switch'
					className={styles.Switch}
					label={t(label)}
					onChange={onSearchTypeChange}
					value={isAddress}
				/>
				<InputCheckbox
					className={styles.Check}
					label='Posición extacta'
					onChange={onExactPositionChange}
					value={exactPosition}
				/>
				<InputCheckbox
					className={styles.Check}
					label='Mostrar en mapa principal'
					onChange={handleShowOnMapChange}
					value={showInMap}
				/>
			</Col>
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
					required
				/>
			)}
			{!isAddress && (
				<Row>
					<InputNumber colsWidth={4} label='Latitud' value={lat} onChange={onLatChange} />
					<InputNumber colsWidth={4} label='Longitud' value={lng} onChange={onLngChange} />
				</Row>
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
