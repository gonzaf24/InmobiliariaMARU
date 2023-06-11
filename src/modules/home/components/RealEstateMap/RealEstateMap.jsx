import React, { useMemo, useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import GoogleMap from 'google-map-react';
import classNames from 'classnames';

import RealEstateMapMarker from '../RealEstateMapMarker';
import { BsChatLeftText } from 'react-icons/bs';
import { Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

import { useDevice, useOpenToggle } from '../../../../hooks';
import { PROPERTY_ACQUISITION_OPTIONS } from '../../../../utils/constants';
import { CloseIcon } from '../../../../assets/icons';
import { NoImageAvailable } from '../../../../assets/images';
import { Image, Slider } from '../../../../components';

import styles from './RealEstateMap.module.scss';

const API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

const propTypes = {
	testId: PropTypes.string,
	id: PropTypes.string,
	className: PropTypes.string,
	center: PropTypes.array,
	zoom: PropTypes.number,
	greatPlaces: PropTypes.array,
};

const defaultProps = {
	testId: undefined,
	id: undefined,
	center: [41.3873974, 2.168568],
	zoom: 13,
	greatPlaces: [],
	options: {
		maxZoom: 16,
		styles: [
			{
				featureType: 'transit.station',
				elementType: 'labels',
				stylers: [
					{
						visibility: 'off',
					},
				],
			},
			{
				featureType: 'poi',
				elementType: 'labels',
				stylers: [
					{
						visibility: 'off',
					},
				],
			},
		],
	},
};

const PROPERTY_ACQUISITION = Object.values(PROPERTY_ACQUISITION_OPTIONS);

const RealEstateMap = ({ className, center: centerProp, zoom: zoomProp, greatPlaces }) => {
	const { t } = useTranslation();
	const [center, setCenter] = useState(centerProp);
	const [zoom, setZoom] = useState(zoomProp);
	const [hoverKey, setHoverKey] = useState(null);
	const [selectedPlace, setSelectedPlace] = useState();
	const { isMobile } = useDevice();

	const { isOpen: isOpenMarkerInfo, open: openMarkerInfo, close: closeMarkerIndo } = useOpenToggle(false);

	const onBoundsChange = useCallback((newCenter, newZoom) => {
		setCenter(newCenter);
		setZoom(newZoom);
	}, []);

	const onChildClick = useCallback((key, childProps) => {
		setCenter([childProps.lat, childProps.lng]);
		setSelectedPlace(childProps);
		openMarkerInfo();
	}, []);

	const onChildMouseEnter = useCallback(key => {
		setHoverKey(key);
	}, []);

	const onChildMouseLeave = useCallback(() => {
		setHoverKey(null);
	}, []);

	const places = useMemo(
		() =>
			greatPlaces.map(place => {
				const { id, price, link, ...coords } = place;
				const formattedPrice = `${price}€`;
				return (
					<RealEstateMapMarker
						key={id}
						{...coords}
						text={formattedPrice}
						link={link}
						// use your hover state (from store, react-controllables etc...)
						hover={hoverKey === id}
						{...place}
					/>
				);
			}),
		[greatPlaces, hoverKey]
	);

	const renderSliderImages = useCallback(() => {
		if (!selectedPlace?.photos.length) {
			return <Image className={styles.Image} src={NoImageAvailable} />;
		}
		return selectedPlace?.photos.map((photo, index) => {
			return <Image className={styles.Image} src={photo} key={index} />;
		});
	}, [selectedPlace?.photos]);

	const operationLabel = useMemo(() => {
		return PROPERTY_ACQUISITION.find(option => option.value === selectedPlace?.operation)?.label;
	}, [selectedPlace?.operation]);

	const isSale = selectedPlace?.operation === PROPERTY_ACQUISITION_OPTIONS.SALE.value;

	const priceLabel = isSale ? `${selectedPlace?.price} €` : `${selectedPlace?.price} €/${t('Constants.Month')}`;

	const addressLabel = useMemo(() => {
		if (isMobile) {
			return `${t('Constants.FlatInStreet')} ${selectedPlace?.street}`;
		} else {
			return `${t('Constants.FlatInStreet')} ${selectedPlace?.street}, ${selectedPlace?.neighborhood} - ${
				selectedPlace?.city
			}`;
		}
	}, [selectedPlace?.street, selectedPlace?.neighborhood, selectedPlace?.city]);
	const markerInfoClassNames = classNames(styles.MarkerInfo, {
		[styles.Open]: isOpenMarkerInfo,
	});
	const googleMapClassNames = classNames(styles.RealEstateMap, className);

	return (
		<div className={googleMapClassNames}>
			<GoogleMap
				apiKey={API_KEY}
				center={center}
				zoom={zoom}
				hoverDistance={75}
				onBoundsChange={onBoundsChange}
				onChildClick={onChildClick}
				onChildMouseEnter={onChildMouseEnter}
				onChildMouseLeave={onChildMouseLeave}
				options={defaultProps.options}
			>
				{places}
			</GoogleMap>
			<div className={markerInfoClassNames}>
				<CloseIcon onClick={closeMarkerIndo} className={styles.CloseButton} />
				<Slider className={styles.Slider}>{renderSliderImages()}</Slider>
				<div className={styles.Container}>
					<div className={styles.Wrapper}>
						<span className={styles.Address}>{addressLabel}</span>
					</div>
					{isMobile && (
						<div className={styles.Wrapper}>
							<span className={styles.City}>{selectedPlace?.city} </span>
							<span className={styles.Neighborhood}>{selectedPlace?.neighborhood} </span>
						</div>
					)}
					<div className={styles.Wrapper}>
						{selectedPlace?.rooms && (
							<span className={styles.Rooms}>{`${selectedPlace?.rooms} ${t('Constants.Bedrooms')}.`}</span>
						)}
						{selectedPlace?.size && <span className={styles.Size}>{`${selectedPlace?.size} m²`}</span>}
						{selectedPlace?.floor && (
							<span className={styles.Floor}>{`${t('Constants.Floor')} ${selectedPlace?.floor}ª`}</span>
						)}
					</div>
					<div className={styles.Wrapper}>
						<span className={styles.Operation}>{t(operationLabel)}</span>
						<span className={styles.Price}> {priceLabel}</span>
					</div>
					<div className={styles.Footer}>
						<Button className={styles.Button}>
							<span className={styles.Text}>contact</span>
							<BsChatLeftText className={styles.Icon} />
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
};

RealEstateMap.propTypes = propTypes;
RealEstateMap.defaultProps = defaultProps;

export default RealEstateMap;
