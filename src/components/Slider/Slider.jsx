import React, { useEffect, useRef } from 'react';
import SlickSlider from 'react-slick';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import styles from './Slider.module.scss';

const propTypes = {
	children: PropTypes.node.isRequired,
	slide: PropTypes.number.isRequired,
	onSliderChange: PropTypes.func.isRequired,
	className: PropTypes.string,
	dataTestId: PropTypes.string,
	id: PropTypes.string,
	slidesToScroll: PropTypes.number,
	slidesToShow: PropTypes.number,
	speed: PropTypes.number,
	useArrows: PropTypes.bool,
	useInfinite: PropTypes.bool,
};

const defaultProps = {
	className: '',
	dataTestId: '',
	id: undefined,
	slidesToScroll: 1,
	slidesToShow: 1,
	speed: 250,
	useArrows: false,
	useInfinite: false,
};

const Slider = ({
	className,
	dataTestId,
	id,
	children,
	slide,
	onSliderChange,
	speed,
	useArrows,
	useInfinite,
	slidesToScroll,
	slidesToShow,
}) => {
	const sliderRef = useRef(null);

	useEffect(() => {
		sliderRef.current.slickGoTo(slide);
	}, [onSliderChange, slide]);

	const sliderClassNames = classnames(styles.Slider, className);

	return (
		<SlickSlider
			ref={sliderRef}
			afterChange={onSliderChange}
			arrows={useArrows}
			className={sliderClassNames}
			data-testid={dataTestId}
			id={id}
			infinite={useInfinite}
			slidesToScroll={slidesToScroll}
			slidesToShow={slidesToShow}
			speed={speed}
		>
			{children}
		</SlickSlider>
	);
};

Slider.propTypes = propTypes;
Slider.defaultProps = defaultProps;

export default Slider;
