import React from 'react';
import PropTypes from 'prop-types';
import { greatPlaceStyle, greatPlaceStyleHover } from './aux';

const MyGreatPlaceWithControllableHover = ({ hover, text }) => {
	const style = hover ? greatPlaceStyleHover : greatPlaceStyle;

	return (
		<div style={style}>
			<div>{text}</div>
			<div style={{ width: 80 }}>Сlick me</div>
		</div>
	);
};

MyGreatPlaceWithControllableHover.propTypes = {
	hover: PropTypes.bool,
	text: PropTypes.string,
};

MyGreatPlaceWithControllableHover.defaultProps = {};

export default MyGreatPlaceWithControllableHover;
