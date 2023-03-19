import React, { useState } from 'react';
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
	markerText: PropTypes.string,
};

const defaultProps = {
	className: '',
	testId: undefined,
	id: undefined,
	lat: 41.4129159,
	lng: 2.1865888,
	markerText: 'ES AQUI',
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

// eslint-disable-next-line react/prop-types
const AnyReactComponent = ({ text, radius }) => (
	<div
		style={{
			position: 'absolute',
			width: `${radius * 2}px`,
			height: `${radius * 2}px`,
			left: `${-radius}px`,
			top: `${-radius}px`,
			borderRadius: '50%',
			border: '2px solid red',
			backgroundColor: 'rgba(255, 0, 0, 0.3)',
			textAlign: 'center',
			color: 'black',
			fontSize: 16,
			fontWeight: 'bold',
			padding: 4,
		}}
	>
		{text}
	</div>
);

const GoogleMap = ({ className, testId, id, lat, lng, markerText }) => {
	const [radiusMap, setRadiusMap] = useState(100);

	const handleMapChange = value => {
		const calculatedRadius = 5 * value.zoom;
		setRadiusMap(calculatedRadius);
	};

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
			>
				<AnyReactComponent lat={lat} lng={lng} markerText={markerText} radius={radiusMap} />
			</GoogleMapReact>
		</div>
	);
};

GoogleMap.propTypes = propTypes;
GoogleMap.defaultProps = defaultProps;

export default GoogleMap;
