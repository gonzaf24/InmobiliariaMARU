import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import styles from './EventsMapMarker.module.scss';

const propTypes = {
	className: PropTypes.string,
	testId: PropTypes.string,
	id: PropTypes.string,
	hover: PropTypes.bool,
	text: PropTypes.string,
	link: PropTypes.string,
};

const defaultProps = {
	className: '',
	testId: undefined,
	id: undefined,
	hover: false,
	text: '',
	link: '',
};

const EventsMapMarker = ({ className, testId, id, hover, text, link }) => {
	const eventsMapMarkerClassNames = classnames(styles.EventsMapMarker, className, { [styles.Hovered]: hover });
	console.log('link', link);
	return (
		<div className={eventsMapMarkerClassNames} data-testid={testId} id={id}>
			<div>{text}</div>
			<div className={styles.Overlay}>
				<span>{`Home - ${text}`}</span>
				<a rel='noreferrer' href={link} target={'_blank'}>
					view rental
				</a>
			</div>
		</div>
	);
};

EventsMapMarker.propTypes = propTypes;
EventsMapMarker.defaultProps = defaultProps;

export default EventsMapMarker;
