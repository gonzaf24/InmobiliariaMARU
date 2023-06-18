import React, { useCallback, useMemo } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import { useTranslation } from 'react-i18next';
import { Image, Slider } from '../../../common/components';
import { NoImageAvailable } from '../../../../assets/images';
import { PROPERTY_ACQUISITION_OPTIONS } from '../../../common';

import styles from './RealEstateCard.module.scss';

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
	},
};

const texts = {
	FlatText: 'Constants.FlatInStreet',
	Month: 'Constants.Month',
	Bedrooms: 'Constants.Bedrooms',
	Floor: 'Constants.Floor',
};

const PROPERTY_ACQUISITION = Object.values(PROPERTY_ACQUISITION_OPTIONS);

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

	const isSale = place?.operation === PROPERTY_ACQUISITION_OPTIONS.SALE.value;

	const priceLabel = isSale ? `${place?.price} €` : `${place?.price} €/${t(texts.Month)}`;

	const hasRooms = !!place?.rooms;
	const hasSize = !!place?.size;
	const hasFloor = !!place?.floor;

	const realEstateCardClassNames = classnames(styles.RealEstateCard, className);

	return (
		<div className={realEstateCardClassNames} data-testid={testId} id={id}>
			<Slider className={styles.Slider}>{renderSliderImages()}</Slider>
			<div className={styles.DescriptionWrapper}>
				<div className={styles.Wrapper}>
					<span className={styles.Address}>{addressLabel}</span>
				</div>
				<div className={styles.Wrapper}>
					<span className={styles.Operation}>{t(operationLabel)}</span>
					<span className={styles.Price}> {priceLabel}</span>
				</div>
				<div className={styles.Wrapper}>
					{hasRooms && <span className={styles.Rooms}>{`${place?.rooms} ${t(texts.Bedrooms)}.`}</span>}
					{hasSize && <span className={styles.Size}>{`${place?.size} m²`}</span>}
					{hasFloor && <span className={styles.Floor}>{`${t(texts.Floor)} ${place?.floor}ª`}</span>}
				</div>
			</div>
		</div>
	);
};

RealEstateCard.propTypes = propTypes;
RealEstateCard.defaultProps = defaultProps;

export default RealEstateCard;
