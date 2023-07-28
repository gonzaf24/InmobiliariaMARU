import React, { useEffect, useState } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

/* import { useTranslation } from 'react-i18next'; */
import { useParams } from 'react-router-dom';
import { NotFound, useHouse } from '../../../common';

import styles from './RealEstate.module.scss';

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

/* const texts = {
	NotFoundTitle: 'NotFound.Text.Title',
}; */

const RealEstate = ({ className, testId, id }) => {
	// const { t } = useTranslation();
	const { id: realEstateId } = useParams();

	const { getHouse, hasError, errorCode } = useHouse();
	const [house, setHouse] = useState({});

	useEffect(() => {
		const fetchData = async () => {
			const house = await getHouse(realEstateId);
			console.log('house ', house);
			setHouse(house);
		};
		fetchData();
	}, [getHouse, id, realEstateId]);

	const is404Error = hasError && errorCode === 404;

	const realEstateClassNames = classnames(styles.RealEstate, className);

	return (
		<div className={realEstateClassNames} data-testid={testId} id={id}>
			{!is404Error && (
				<div>
					<h3>RealEstate full details property under construction</h3>
					<h4>{house.id}</h4>
					<h4>{house.street}</h4>
					<h4>{house.neighborhood}</h4>
					<h4>{house.city}</h4>
					<h4>{house.operation}</h4>
					<h4>{house.price}</h4>
					<h4>{house.rooms}</h4>
					<h4>{house.size}</h4>
					<h4>{house.floor}</h4>
					<h4>{house.exterior}</h4>
					<h4>{house.elevator}</h4>
					<h4>{house.parkingIncluded}</h4>
					<h4>{house.parkingOptional}</h4>
					<h4>{house.parkingPrice}</h4>
				</div>
			)}
			{is404Error && <NotFound />}
		</div>
	);
};

RealEstate.propTypes = propTypes;
RealEstate.defaultProps = defaultProps;

export default RealEstate;
