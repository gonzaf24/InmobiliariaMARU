import React, { useMemo, useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import GoogleMap from 'google-map-react';
import classNames from 'classnames';
import styles from './EventsMap.module.scss';
import EventsMapMarker from '../EventsMapMarker/EventsMapMarker';
import useOpenToggle from '../../../hooks/useOpenToggle';
import { CloseButton } from 'react-bootstrap';
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
	},
};

const EventsMap = ({ className, center: centerProp, zoom: zoomProp, greatPlaces }) => {
	const [center, setCenter] = useState(centerProp);
	const [zoom, setZoom] = useState(zoomProp);
	const [hoverKey, setHoverKey] = useState(null);
	const [selectedPlace, setSelectedPlace] = useState();

	const { isOpen: isOpenMarkerInfo, open: openMarkerInfo, close: closeMarkerIndo } = useOpenToggle(false);

	const onBoundsChange = useCallback((newCenter, newZoom) => {
		setCenter(newCenter);
		setZoom(newZoom);
	}, []);

	const onChildClick = useCallback((key, childProps) => {
		setCenter([childProps.lat, childProps.lng]);
		console.log('childProps ', childProps);
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
				console.log('place  ', place);
				const formattedPrice = `${price}€`;
				return (
					<EventsMapMarker
						key={id}
						{...coords}
						text={formattedPrice}
						link={link}
						// use your hover state (from store, react-controllables etc...)
						hover={hoverKey === id}
					/>
				);
			}),
		[greatPlaces, hoverKey]
	);

	console.log('selectedPlace ', selectedPlace);
	const markerInfoClassNames = classNames(styles.MarkerInfo, { [styles.Open]: isOpenMarkerInfo });
	const googleMapClassNames = classNames(styles.EventsMap, className);

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
				<CloseButton onClick={closeMarkerIndo} />
				<span>{`Home ${selectedPlace?.text}`}</span>
				<a href={selectedPlace?.link} target={'_blank'} rel='noreferrer'>
					aqui el link
				</a>
			</div>
		</div>
	);
};

EventsMap.propTypes = propTypes;
EventsMap.defaultProps = defaultProps;

export default EventsMap;
