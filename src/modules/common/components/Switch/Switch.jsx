import React, { useCallback, useEffect, useRef } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import styles from './Switch.module.scss';
import { useTranslation } from 'react-i18next';

const propTypes = {
	options: PropTypes.arrayOf(
		PropTypes.shape({
			label: PropTypes.string.isRequired,
			value: PropTypes.string.isRequired,
			Icon: PropTypes.elementType,
		})
	).isRequired,
	value: PropTypes.string.isRequired,
	activeClassName: PropTypes.string,
	className: PropTypes.string,
	dataTestId: PropTypes.string,
	id: PropTypes.string,
	onChange: PropTypes.func,
};

const defaultProps = {
	activeClassName: '',
	className: '',
	dataTestId: '',
	id: undefined,
	onChange: () => {},
};

const Switch = ({ className, dataTestId, id, onChange, options, value, activeClassName }) => {
	const { t } = useTranslation();
	const maskRef = useRef(null);
	const activeButtonRef = useRef(null);

	const handleChange = useCallback(
		_option => () => {
			onChange(_option.value);
		},
		[onChange]
	);

	const updateActiveButtonStyles = useCallback(() => {
		if (activeButtonRef.current) {
			const activeButtonRect = activeButtonRef.current.getBoundingClientRect();
			const switchRect = activeButtonRef.current.parentNode.getBoundingClientRect();
			const activeButtonStyle = window.getComputedStyle(activeButtonRef.current);
			const activeButtonRadius = activeButtonStyle.borderRadius;
			maskRef.current.style.top = `${activeButtonRect.top - switchRect.top}px`;
			maskRef.current.style.left = `${activeButtonRect.left - switchRect.left}px`;
			maskRef.current.style.width = `${activeButtonRect.width}px`;
			maskRef.current.style.height = `${activeButtonRect.height}px`;
			maskRef.current.style.borderRadius = activeButtonRadius;
		}
	}, [activeButtonRef, maskRef, options]);

	useEffect(() => {
		if (activeButtonRef.current && maskRef.current) updateActiveButtonStyles();
	}, [activeButtonRef, maskRef, updateActiveButtonStyles, value]);

	useEffect(() => {
		if (activeButtonRef.current && maskRef.current) {
			updateActiveButtonStyles();
		}
	}, [activeButtonRef, maskRef, updateActiveButtonStyles, value]);

	useEffect(() => {
		const handleResize = () => {
			updateActiveButtonStyles();
		};
		window.addEventListener('resize', handleResize);
		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, [updateActiveButtonStyles]);

	const switchClassNames = classNames(styles.Switch, className);

	const buttonClassNames = (option, index) =>
		classNames(styles.Button, {
			[styles.Active]: value === option.value,
			[activeClassName]: value === option.value,
			[styles.RadiusLeftActive]: index === 0,
			[styles.RadiusRightActive]: index === options.length - 1,
			[styles.RadiusActive]: index > 0 && index < options.length - 1,
		});

	const maskClassNames = classNames(styles.Mask, { [activeClassName]: activeClassName });

	return (
		<div className={switchClassNames} data-testid={dataTestId} id={id}>
			<div ref={maskRef} className={maskClassNames} />
			{options.map((option, index) => (
				<div
					key={option.value}
					ref={value === option.value ? activeButtonRef : null}
					className={buttonClassNames(option, index)}
					role='button'
					tabIndex={0}
					onClick={handleChange(option)}
				>
					<div className={styles.Wrapper}>
						{option.Icon && <option.Icon className={styles.Icon} />}
						<span>{t(option.label)}</span>
					</div>
				</div>
			))}
		</div>
	);
};

Switch.propTypes = propTypes;
Switch.defaultProps = defaultProps;

export default Switch;
