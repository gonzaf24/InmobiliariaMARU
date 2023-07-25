import React from 'react';
import BootstrapButton from 'react-bootstrap/Button';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import LoaderComponent from '../Loader';

import styles from './Button.module.scss';

const propTypes = {
	children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
	className: PropTypes.string,
	dataTestId: PropTypes.string,
	Icon: PropTypes.elementType,
	id: PropTypes.string,
	isDisabled: PropTypes.bool,
	isLoading: PropTypes.bool,
	isOutlined: PropTypes.bool,
	isPrimary: PropTypes.bool,
	isSecondary: PropTypes.bool,
	Loader: PropTypes.elementType,
};

const defaultProps = {
	className: '',
	dataTestId: undefined,
	Icon: undefined,
	id: undefined,
	isDisabled: false,
	isLoading: false,
	isOutlined: false,
	isPrimary: false,
	isSecondary: false,
	Loader: LoaderComponent,
};

const Button = ({
	children,
	className,
	dataTestId,
	id,
	Icon,
	isDisabled,
	isLoading,
	isPrimary,
	isSecondary,
	isOutlined,
	Loader,
	...props
}) => {
	const buttonClassNames = classnames(
		styles.Button,
		{ [styles.Primary]: isPrimary && !isOutlined },
		{ [styles.Secondary]: isSecondary && !isOutlined },

		className
	);

	let variant;
	if (isPrimary) {
		variant = isOutlined ? 'outline-primary' : 'primary';
	} else if (isSecondary) {
		variant = isOutlined ? 'outline-secondary' : 'secondary';
	} else {
		variant = 'outline-primary';
	}

	return (
		<BootstrapButton
			className={buttonClassNames}
			data-testid={dataTestId}
			disabled={isDisabled || isLoading}
			id={id}
			type='button'
			variant={variant}
			{...props} // Extended props with BootstrapButton props
		>
			{!isLoading && (
				<>
					{!!Icon && <Icon className={styles.Icon} />}
					{children}
				</>
			)}
			{isLoading && <Loader className={styles.Loader} />}
		</BootstrapButton>
	);
};

Button.propTypes = propTypes;
Button.defaultProps = defaultProps;

export default Button;
