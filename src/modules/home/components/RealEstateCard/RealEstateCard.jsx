import React, { useCallback, useMemo } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import styles from './RealEstateCard.module.scss';
import { useTranslation } from 'react-i18next';
import { Image, Slider } from '../../../common/components';
import { NoImageAvailable } from '../../../../assets/images';
import { PROPERTY_ACQUISITION_OPTIONS } from '../../../common';

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
		floor: PropTypes.number,
	}),
};

const defaultProps = {
	className: '',
	testId: undefined,
	id: undefined,
	place: {
		photos: [],
	},
};

const PROPERTY_ACQUISITION = Object.values(PROPERTY_ACQUISITION_OPTIONS);

const RealEstateCard = ({ className, testId, id, place }) => {
	const { t } = useTranslation();

	const renderSliderImages = useCallback(() => {
		if (!place?.photos?.length) {
			return <Image className={styles.Image} src={NoImageAvailable} />;
		}
		return place?.photos.map((photo, index) => {
			console.log('photo', photo);
			return <Image className={styles.Image} src={photo} key={index} />;
		});
	}, [place?.photos]);

	const addressLabel = useMemo(() => {
		return `${t('Constants.FlatInStreet')} ${place?.street}, ${place?.neighborhood} - ${place?.city}`;
	}, [place?.street, place?.neighborhood, place?.city]);

	const operationLabel = useMemo(() => {
		return PROPERTY_ACQUISITION.find(option => option.value === place?.operation)?.label;
	}, [place?.operation]);

	const isSale = place?.operation === PROPERTY_ACQUISITION_OPTIONS.SALE.value;

	const priceLabel = isSale ? `${place?.price} €` : `${place?.price} €/${t('Constants.Month')}`;

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
					{place?.rooms && <span className={styles.Rooms}>{`${place?.rooms} ${t('Constants.Bedrooms')}.`}</span>}
					{place?.size && <span className={styles.Size}>{`${place?.size} m²`}</span>}
					{place?.floor && <span className={styles.Floor}>{`${t('Constants.Floor')} ${place?.floor}ª`}</span>}
				</div>
			</div>
		</div>
	);
};

RealEstateCard.propTypes = propTypes;
RealEstateCard.defaultProps = defaultProps;

export default RealEstateCard;
