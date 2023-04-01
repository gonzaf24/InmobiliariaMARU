import React, { useMemo, useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import GoogleMap from 'google-map-react';
import classNames from 'classnames';
import styles from './EventsMapPage.module.scss';
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
	greatPlaces: [
		{ id: 'A', lat: 41.4129159, lng: 2.1865888, link: 'https://www.idealista.com/en/inmueble/100999676/' },
		{ id: 'B', lat: 41.4074918, lng: 2.1872825, link: 'https://www.idealista.com/en/inmueble/100999586/' },
	],
	options: {
		maxZoom: 16,
	},
};

const EventsMapPage = ({ className, center: centerProp, zoom: zoomProp, greatPlaces }) => {
	const [center, setCenter] = useState(centerProp);
	const [zoom, setZoom] = useState(zoomProp);
	const [hoverKey, setHoverKey] = useState(null);
	const [selectedPlace, setSelectedPlace] = useState(defaultProps.greatPlaces[0]);

	const { isOpen: isOpenMarkerInfo, open: openMarkerInfo, close: closeMarkerIndo } = useOpenToggle(false);

	const onBoundsChange = useCallback((newCenter, newZoom) => {
		console.log('onBoundsChange', newCenter, newZoom);
		setCenter(newCenter);
		setZoom(newZoom);
	}, []);

	const onChildClick = useCallback((key, childProps) => {
		console.log('onChildClick', key, childProps);
		setCenter([childProps.lat, childProps.lng]);
		setSelectedPlace(childProps);
		openMarkerInfo();
	}, []);

	const onChildMouseEnter = useCallback(key => {
		console.log('onChildMouseEnter', key);
		setHoverKey(key);
	}, []);

	const onChildMouseLeave = useCallback(() => {
		console.log('onChildMouseLeave');
		setHoverKey(null);
	}, []);

	console.log('selectedPlace', selectedPlace);

	const places = useMemo(
		() =>
			greatPlaces.map(place => {
				const { id, link, ...coords } = place;
				console.log('coords', coords);
				return (
					<EventsMapMarker
						key={id}
						{...coords}
						text={id}
						link={link}
						// use your hover state (from store, react-controllables etc...)
						hover={hoverKey === id}
					/>
				);
			}),
		[greatPlaces, hoverKey]
	);

	const markerInfoClassNames = classNames(styles.MarkerInfo, { [styles.Open]: isOpenMarkerInfo });
	const googleMapClassNames = classNames(styles.EventsMapPage, className);

	return (
		<div className={googleMapClassNames}>
			<GoogleMap
				apiKey={API_KEY}
				center={center}
				zoom={zoom}
				hoverDistance={40 / 2}
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
				<span>{`Home ${selectedPlace.text}`}</span>
				<a href={selectedPlace.link} target={'_blank'} rel='noreferrer'>
					aqui el link
				</a>
			</div>
		</div>
	);
};

EventsMapPage.propTypes = propTypes;
EventsMapPage.defaultProps = defaultProps;

export default EventsMapPage;
