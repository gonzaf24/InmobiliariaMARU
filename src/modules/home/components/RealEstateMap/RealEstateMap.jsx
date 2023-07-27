import React, { useMemo, useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import GoogleMap from 'google-map-react';
import classNames from 'classnames';
import { LiaRulerCombinedSolid, LiaBedSolid } from 'react-icons/lia';

import RealEstateMapMarker from '../RealEstateMapMarker';
import { BsChatLeftText } from 'react-icons/bs';
import { Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

import { ROUTES, SELECTORS } from '../../../../utils/constants';
import { CloseIcon } from '../../../../assets/icons';
import { NoImageAvailable } from '../../../../assets/images';
import { Image, Slider } from '../../../../modules';
import { useDevice, useOpenToggle } from '../../../common';
import { Link } from 'react-router-dom';

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
				stylers: [{ visibility: 'off' }],
			},
			{
				featureType: 'poi',
				elementType: 'labels',
				stylers: [{ visibility: 'off' }],
			},
			{
				featureType: 'administrative.neighborhood',
				elementType: 'labels',
				stylers: [{ visibility: 'on' }],
			},
		],
	},
};

const texts = {
	FlatText: 'Constants.FlatInStreet',
	Month: 'Constants.Month',
	Bedrooms: 'Constants.Bedrooms',
	Floor: 'Constants.Floor',
	ParkingIncluded: 'Constants.ParkingIncluded',
	ParkingOptional: 'Constants.ParkingOptional',
	ParkingPrice: 'Constants.ParkingPrice',
	Exterior: 'Constants.Exterior',
	Elevator: 'Constants.Elevator',
};

const PROPERTY_ACQUISITION = Object.values(SELECTORS.PROPERTY_ACQUISITION_OPTIONS);

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

	const onChildClick = useCallback(
		(key, childProps) => {
			setCenter([childProps.lat, childProps.lng]);
			setSelectedPlace(childProps);
			openMarkerInfo();
		},
		[openMarkerInfo]
	);

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

	const isSale = selectedPlace?.operation === SELECTORS.PROPERTY_ACQUISITION_OPTIONS.SALE.value;

	const priceLabel = isSale ? `${selectedPlace?.price} €` : `${selectedPlace?.price} €/${t('Constants.Month')}`;

	const addressLabel = useMemo(() => {
		if (isMobile) {
			return `${t('Constants.FlatInStreet')} ${selectedPlace?.street}`;
		} else {
			return `${t('Constants.FlatInStreet')} ${selectedPlace?.street}, ${selectedPlace?.neighborhood} - ${
				selectedPlace?.city
			}`;
		}
	}, [selectedPlace?.street, selectedPlace?.neighborhood, selectedPlace?.city, isMobile, t]);

	const onRealEstateCardClick = useCallback(() => {
		const url = `${ROUTES.REAL_ESTATE}/${selectedPlace?.id}`;
		window.open(url, '_blank');
	}, [selectedPlace]);

	const hasRooms = !!selectedPlace?.rooms;
	const hasSize = !!selectedPlace?.size;
	const hasFloor = !!selectedPlace?.floor;
	const isExterior = !!selectedPlace?.exterior;
	const hasElevator = !!selectedPlace?.elevator;
	const hasParkingIncluded = !!selectedPlace?.parkingIncluded;
	const hasParkingOptional = !!selectedPlace?.parkingOptional;
	const hasAnyParkingOption = hasParkingIncluded || hasParkingOptional;
	const parkingLabel = hasParkingIncluded
		? t('Constants.ParkingIncluded')
		: `${t('Constants.ParkingOptional')} ${selectedPlace?.parkingPrice} €/${t(texts.Month)}`;

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
					<div className={styles.Group}>
						<div className={styles.Wrapper}>
							<Link className={styles.Address} onClick={onRealEstateCardClick}>
								{addressLabel}
							</Link>
						</div>
						<div className={styles.Wrapper}>
							<span className={styles.City}>{selectedPlace?.city} </span>
							<span className={styles.Neighborhood}>{selectedPlace?.neighborhood} </span>
						</div>
						<div className={styles.Wrapper}>
							{hasRooms && (
								<span className={styles.Rooms}>
									<LiaBedSolid className={styles.Icon} />
									{`${selectedPlace?.rooms} ${t(texts.Bedrooms)}.`}
								</span>
							)}
							{hasSize && (
								<span className={styles.Size}>
									<LiaRulerCombinedSolid className={styles.Icon} />
									{`${selectedPlace?.size} m²`}
								</span>
							)}
							{hasFloor && <span className={styles.Floor}>{`${t(texts.Floor)} ${selectedPlace?.floor}ª`}</span>}
						</div>
						<div className={styles.Wrapper}>
							{isExterior && <span className={styles.Exterior}>{t(texts.Exterior)}</span>}
							{hasElevator && <span className={styles.Elevator}>{t(texts.Elevator)}</span>}
						</div>
						<div className={styles.Wrapper}>
							{hasAnyParkingOption && <span className={styles.Parking}>{parkingLabel}</span>}
						</div>
					</div>
					<div className={styles.OperationWrapper}>
						<span className={styles.Operation}>{t(operationLabel)}</span>
						<span className={styles.Price}> {priceLabel}</span>
					</div>
				</div>
				<div className={styles.Footer}>
					<Button className={styles.Button}>
						<span className={styles.Text}>contact</span>
						<BsChatLeftText className={styles.Icon} />
					</Button>
				</div>
			</div>
		</div>
	);
};

RealEstateMap.propTypes = propTypes;
RealEstateMap.defaultProps = defaultProps;

export default RealEstateMap;
