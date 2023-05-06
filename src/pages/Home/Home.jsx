import React, { useEffect, useState } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import styles from './Home.module.scss';
import EventsMapPage from '../../components/maps/EventsMapPage';
import useHouse from '../../hooks/useHouse';

const propTypes = {
	className: PropTypes.string,
	testId: PropTypes.string,
	id: PropTypes.string,
};

const defaultProps = {
	className: '',
	testId: undefined,
	id: undefined,
};


const Home = ({ className, testId, id }) => {

	const {getHousesList  } = useHouse();
	const [ greatPlaces, setGreatPlaces ] = useState([]);

	useEffect(() => {
		const retrieveHouses = async () => {
		  const housesOut = await getHousesList();
		  const greatPlace = housesOut.map(house => {
			console.log('house ' , house);

			return {
			  lat: house.lat,
			  lng: house.lng,
			  id: house.id,
			  price: house.price,
			};
		  });
		  setGreatPlaces(greatPlace);
		};
	  
		retrieveHouses();
	  }, []);
	  

	const homeClassNames = classnames(styles.Home, className);


	return (
		<div className={homeClassNames} data-testid={testId} id={id}>
			<EventsMapPage greatPlaces={greatPlaces}/>
		</div>
	);
};

Home.propTypes = propTypes;
Home.defaultProps = defaultProps;

export default Home;
