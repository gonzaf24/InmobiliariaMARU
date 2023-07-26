import React, { useEffect } from 'react';
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

	useEffect(() => {
		const fetchData = async () => {
			const house = await getHouse(realEstateId);
			console.log('house ', house);
		};
		fetchData();
	}, [getHouse, id]);

	const is404Error = hasError && errorCode === 404;

	const realEstateClassNames = classnames(styles.RealEstate, className);

	return (
		<div className={realEstateClassNames} data-testid={testId} id={id}>
			{is404Error && <NotFound />}
		</div>
	);
};

RealEstate.propTypes = propTypes;
RealEstate.defaultProps = defaultProps;

export default RealEstate;
