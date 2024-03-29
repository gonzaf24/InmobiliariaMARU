import React, { useCallback, useEffect, useMemo, useState } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import GoogleMapReact from 'google-map-react';

import styles from './GoogleMap.module.scss';

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
	lat: 41.3870154, // Latitude of Inmo in Barcelona
	lng: 2.1700471, // Longitude of Inmo in Barcelona
	showExactPosition: true,
};

const mapProps = {
	center: {
		lat: 41.3870154, // Latitude of Inmo in Barcelona
		lng: 2.1700471, // Longitude of Inmo in Barcelona
	},
	zoom: 16,
	options: {
		maxZoom: 16,
	},
};

const POSITION_RADIUS_EXACT = 0;
const POSITION_RADIUS_ZONE = 5;

const GoogleMap = ({ className, testId, id, lat, lng, showExactPosition }) => {
	const [radiusMap, setRadiusMap] = useState(POSITION_RADIUS_EXACT);

	const PositionMarker = useMemo(() => {
		const Marker = () => (
			<div
				style={{
					position: 'absolute',
					width: `${radiusMap * 2}px`,
					height: `${radiusMap * 2}px`,
					left: `${-radiusMap}px`,
					top: `${-radiusMap}px`,
					borderRadius: '50%',
					border: '2px solid red',
					backgroundColor: showExactPosition ? 'red' : 'rgba(255, 0, 0, 0.3)',
					textAlign: 'center',
					color: 'black',
					fontSize: 16,
					fontWeight: 'bold',
					padding: 4,
				}}
			/>
		);
		Marker.displayName = 'Marker';
		return Marker;
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [radiusMap, showExactPosition, lat, lng]);

	const radiusValue = useMemo(
		() => (showExactPosition ? POSITION_RADIUS_EXACT : POSITION_RADIUS_ZONE),
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[showExactPosition, radiusMap]
	);

	const handleMapChange = useCallback(
		value => {
			const calculatedRadius = radiusValue * value.zoom;
			setRadiusMap(calculatedRadius);
		},
		[radiusValue]
	);

	useEffect(() => {
		if (showExactPosition) {
			setRadiusMap(POSITION_RADIUS_EXACT);
		} else {
			setRadiusMap(POSITION_RADIUS_ZONE);
		}
	}, [showExactPosition]);

	const defaultCenter = lat && lng ? { lat, lng } : mapProps.center;
	const googleMapClassNames = classnames(styles.GoogleMap, className);

	return (
		<div className={googleMapClassNames} data-testid={testId} id={id}>
			<GoogleMapReact
				bootstrapURLKeys={{ key: API_KEY }}
				defaultCenter={defaultCenter}
				defaultZoom={mapProps.zoom}
				center={{ lat, lng }}
				onChange={handleMapChange}
				options={mapProps.options}
				resetBoundsOnResize={true}
			>
				<PositionMarker lat={lat} lng={lng} />
			</GoogleMapReact>
		</div>
	);
};

GoogleMap.propTypes = propTypes;
GoogleMap.defaultProps = defaultProps;

export default GoogleMap;
