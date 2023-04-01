import React, { useCallback, useEffect, useMemo, useState } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import GoogleMapReact from 'google-map-react';
import HomeMarker from '../HomeMarker/HomeMarker';

import styles from './HomeMap.module.scss';

const API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

const propTypes = {
	className: PropTypes.string,
	testId: PropTypes.string,
	id: PropTypes.string,
	lat: PropTypes.number,
	lng: PropTypes.number,
	showExactPosition: PropTypes.bool,
};

const defaultProps = {
	className: '',
	testId: undefined,
	id: undefined,
	lat: 41.4129159,
	lng: 2.1865888,
	showExactPosition: true,
};

const mapProps = {
	center: {
		lat: 41.4129159, // Latitude of Inmo in Barcelona
		lng: 2.1865888, // Longitude of Inmo in Barcelona
	},
	zoom: 16,
	options: {
		maxZoom: 16,
	},
};

function createMapOptions(maps) {
	// next props are exposed at maps
	// "Animation", "ControlPosition", "MapTypeControlStyle", "MapTypeId",
	// "NavigationControlStyle", "ScaleControlStyle", "StrokePosition", "SymbolPath", "ZoomControlStyle",
	// "DirectionsStatus", "DirectionsTravelMode", "DirectionsUnitSystem", "DistanceMatrixStatus",
	// "DistanceMatrixElementStatus", "ElevationStatus", "GeocoderLocationType", "GeocoderStatus", "KmlLayerStatus",
	// "MaxZoomStatus", "StreetViewStatus", "TransitMode", "TransitRoutePreference", "TravelMode", "UnitSystem"
	return {
		zoomControlOptions: {
			position: maps.ControlPosition.RIGHT_CENTER,
			style: maps.ZoomControlStyle.SMALL,
		},
		mapTypeControlOptions: {
			position: maps.ControlPosition.TOP_RIGHT,
		},
		mapTypeControl: true,
	};
}

const POSITION_RADIUS_EXACT = 0;
const POSITION_RADIUS_ZONE = 5;

const HomeMap = ({ className, testId, id, lat, lng, showExactPosition }) => {
	const [radiusMap, setRadiusMap] = useState(POSITION_RADIUS_EXACT);

	const radiusValue = useMemo(
		() => (showExactPosition ? POSITION_RADIUS_EXACT : POSITION_RADIUS_ZONE),
		[showExactPosition, radiusMap]
	);

	const handleMapChange = useCallback(
		value => {
			const calculatedRadius = radiusValue * value.zoom;
			setRadiusMap(calculatedRadius);
		},
		[showExactPosition, radiusValue]
	);

	useEffect(() => {
		if (showExactPosition) {
			setRadiusMap(POSITION_RADIUS_EXACT);
		} else {
			setRadiusMap(POSITION_RADIUS_ZONE);
		}
	}, [showExactPosition]);

	const defaultCenter = lat && lng ? { lat, lng } : mapProps.center;

	const homeMapClassNames = classnames(styles.HomeMap, className);

	return (
		<div className={homeMapClassNames} data-testid={testId} id={id}>
			<GoogleMapReact
				bootstrapURLKeys={{ key: API_KEY }}
				defaultCenter={defaultCenter}
				defaultZoom={mapProps.zoom}
				center={{ lat, lng }}
				onChange={handleMapChange}
				/* options={mapProps.options} */
				options={createMapOptions}
			>
				<HomeMarker lat={lat} lng={lng} />
			</GoogleMapReact>
		</div>
	);
};

HomeMap.propTypes = propTypes;
HomeMap.defaultProps = defaultProps;

export default HomeMap;
