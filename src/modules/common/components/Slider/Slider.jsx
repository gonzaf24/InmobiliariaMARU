import React, { useEffect, useRef } from 'react';
import SlickSlider from 'react-slick';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import styles from './Slider.module.scss';

const propTypes = {
	children: PropTypes.node.isRequired,
	className: PropTypes.string,
	dataTestId: PropTypes.string,
	id: PropTypes.string,
	slidesToScroll: PropTypes.number,
	slidesToShow: PropTypes.number,
	slide: PropTypes.number,
	speed: PropTypes.number,
	useArrows: PropTypes.bool,
	useInfinite: PropTypes.bool,
	onSliderChange: PropTypes.func,
};

const defaultProps = {
	className: '',
	dataTestId: '',
	id: undefined,
	slidesToScroll: 1,
	slidesToShow: 1,
	slide: 0,
	speed: 250,
	useArrows: true,
	useInfinite: false,
	onSliderChange: () => {},
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

	const SampleNextArrow = props => {
		// eslint-disable-next-line react/prop-types
		const { className, onClick } = props;
		const arrowClassNames = classnames(styles.NextArrow, className);
		return <div className={arrowClassNames} onClick={onClick} />;
	};

	const SamplePrevArrow = props => {
		// eslint-disable-next-line react/prop-types
		const { className, onClick } = props;
		const arrowClassNames = classnames(styles.PrevArrow, className);
		return <div className={arrowClassNames} onClick={onClick} />;
	};

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
			slide={slide}
			lazyLoad={true}
			nextArrow={<SampleNextArrow />}
			prevArrow={<SamplePrevArrow />}
		>
			{children}
		</SlickSlider>
	);
};

Slider.propTypes = propTypes;
Slider.defaultProps = defaultProps;

export default Slider;
