import React, { useCallback, useMemo } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import { useTranslation } from 'react-i18next';
import { Image, Slider } from '../../../common/components';
import { NoImageAvailable } from '../../../../assets/images';
import { SELECTORS } from '../../../common';

import styles from './RealEstateCard.module.scss';
import { Link } from 'react-router-dom';

const propTypes = {
	className: PropTypes.string,
	testId: PropTypes.string,
	id: PropTypes.string,
	place: PropTypes.shape({
		photos: PropTypes.arrayOf(PropTypes.string),
		street: PropTypes.string,
		neighborhood: PropTypes.string,
		city: PropTypes.string,
		operation: PropTypes.string,
		price: PropTypes.number,
		rooms: PropTypes.number,
		size: PropTypes.number,
		floor: PropTypes.string,
		exterior: PropTypes.bool,
		elevator: PropTypes.bool,
		parkingIncluded: PropTypes.bool,
		parkingOptional: PropTypes.bool,
		parkingPrice: PropTypes.number,
		id: PropTypes.number,
	}),
};

const defaultProps = {
	className: '',
	testId: undefined,
	id: undefined,
	place: {
		photos: [],
		street: '',
		neighborhood: '',
		city: '',
		operation: '',
		price: 0,
		rooms: 0,
		size: 0,
		floor: '',
		exterior: false,
		elevator: false,
		parkingIncluded: false,
		parkingOptional: false,
		parkingPrice: 0,
		id: undefined,
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

const RealEstateCard = ({ className, testId, id, place }) => {
	const { t } = useTranslation();

	const renderSliderImages = useCallback(() => {
		if (!place?.photos?.length) {
			return <Image className={classnames(styles.Image, styles.NoAvailable)} src={NoImageAvailable} />;
		}
		return place?.photos.map((photo, index) => {
			return <Image className={styles.Image} src={photo} key={index} />;
		});
	}, [place?.photos]);

	const addressLabel = useMemo(() => {
		return `${t(texts.FlatText)} ${place?.street}, ${place?.neighborhood} - ${place?.city}`;
	}, [place?.street, place?.neighborhood, place?.city, t]);

	const operationLabel = useMemo(() => {
		return PROPERTY_ACQUISITION.find(option => option.value === place?.operation)?.label;
	}, [place?.operation]);

	const onRealEstateCardClick = useCallback(() => {
		const url = `/realEstate/${place?.id}`;
		window.open(url, '_blank');
	}, [place]);

	const isSale = place?.operation === SELECTORS.PROPERTY_ACQUISITION_OPTIONS.SALE.value;

	const priceLabel = isSale ? `${place?.price} €` : `${place?.price} €/${t(texts.Month)}`;

	const hasRooms = !!place?.rooms;
	const hasSize = !!place?.size;
	const hasFloor = !!place?.floor;
	const isExterior = !!place?.exterior;
	const hasElevator = !!place?.elevator;
	const hasParkingIncluded = !!place?.parkingIncluded;
	const hasParkingOptional = !!place?.parkingOptional;
	const hasAnyParkingOption = hasParkingIncluded || hasParkingOptional;
	const parkingLabel = hasParkingIncluded
		? t(texts.ParkingIncluded)
		: `${t(texts.ParkingOptional)} ${place?.parkingPrice} €/${t(texts.Month)}`;

	const realEstateCardClassNames = classnames(styles.RealEstateCard, className);

	return (
		<div className={realEstateCardClassNames} data-testid={testId} id={id}>
			<Slider className={styles.Slider}>{renderSliderImages()}</Slider>
			<div className={styles.DescriptionWrapper}>
				<div className={styles.Wrapper}>
					<Link className={styles.Address} onClick={onRealEstateCardClick}>
						{addressLabel}
					</Link>
				</div>
				<div className={styles.Wrapper}>
					<span className={styles.Operation}>{t(operationLabel)}</span>
					<span className={styles.Price}> {priceLabel}</span>
					{hasAnyParkingOption && <span className={styles.Parking}>{parkingLabel}</span>}
				</div>
				<div className={styles.Wrapper}>
					{hasRooms && <span className={styles.Rooms}>{`${place?.rooms} ${t(texts.Bedrooms)}.`}</span>}
					{hasSize && <span className={styles.Size}>{`${place?.size} m²`}</span>}
					{hasFloor && <span className={styles.Floor}>{`${t(texts.Floor)} ${place?.floor}ª`}</span>}
					{isExterior && <span className={styles.Exterior}>{t(texts.Exterior)}</span>}
					{hasElevator && <span className={styles.Elevator}>{t(texts.Elevator)}</span>}
				</div>
			</div>
		</div>
	);
};

RealEstateCard.propTypes = propTypes;
RealEstateCard.defaultProps = defaultProps;

export default RealEstateCard;
