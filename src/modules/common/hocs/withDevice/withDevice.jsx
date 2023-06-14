import React, { forwardRef, useMemo } from 'react';
import PropTypes from 'prop-types';
import { useDevice } from '../../hooks';

const propTypes = {
	bigDesktopComponent: PropTypes.elementType,
	bigMobileComponent: PropTypes.elementType,
	bigTabletComponent: PropTypes.elementType,
	className: PropTypes.string,
	dataTestId: PropTypes.string,
	desktopComponent: PropTypes.elementType,
	id: PropTypes.string,
	mobileComponent: PropTypes.elementType,
	smallDesktopComponent: PropTypes.elementType,
	smallMobileComponent: PropTypes.elementType,
	smallTabletComponent: PropTypes.elementType,
	tabletComponent: PropTypes.elementType,
};

const defaultProps = {
	className: '',
	dataTestId: undefined,
	id: undefined,
	smallMobileComponent: undefined,
	mobileComponent: undefined,
	smallTabletComponent: undefined,
	tabletComponent: undefined,
	desktopComponent: undefined,
	bigDesktopComponent: undefined,
	bigMobileComponent: undefined,
	bigTabletComponent: undefined,
	smallDesktopComponent: undefined,
};

const withDevice = (
	WrappedComponent,
	{
		smallMobileComponent: SmallMobileComponent,
		bigMobileComponent: BigMobileComponent,
		mobileComponent: MobileComponent,
		smallTabletComponent: SmallTabletComponent,
		bigTabletComponent: BigTabletComponent,
		tabletComponent: TabletComponent,
		smallDesktopComponent: SmallDesktopComponent,
		bigDesktopComponent: BigDesktopComponent,
		desktopComponent: DesktopComponent,
	}
) => {
	// eslint-disable-next-line react/display-name
	const WithMobileComponent = forwardRef(({ className, dataTestId, id, ...props }, ref) => {
		const {
			isSmallMobile,
			isBigMobile,
			isMobile,
			isSmallTablet,
			isBigTablet,
			isTablet,
			isSmallDesktop,
			isBigDesktop,
			isDesktop,
		} = useDevice();

		const ComponentToRender = useMemo(() => {
			const componentToRender = WrappedComponent;

			if (isSmallMobile && SmallMobileComponent) {
				return SmallMobileComponent;
			}
			if (isBigMobile && BigMobileComponent) {
				return BigMobileComponent;
			}
			if (isMobile && MobileComponent) {
				return MobileComponent;
			}
			if (isSmallTablet && SmallTabletComponent) {
				return SmallTabletComponent;
			}
			if (isBigTablet && BigTabletComponent) {
				return BigTabletComponent;
			}
			if (isTablet && TabletComponent) {
				return TabletComponent;
			}
			if (isSmallDesktop && SmallDesktopComponent) {
				return SmallDesktopComponent;
			}
			if (isBigDesktop && BigDesktopComponent) {
				return BigDesktopComponent;
			}
			if (isDesktop && DesktopComponent) {
				return DesktopComponent;
			}

			return componentToRender;
		}, [
			isSmallMobile,
			isBigMobile,
			isMobile,
			isSmallTablet,
			isBigTablet,
			isTablet,
			isSmallDesktop,
			isBigDesktop,
			isDesktop,
		]);

		return (
			<ComponentToRender
				ref={ref}
				className={className}
				data-testid={dataTestId}
				id={id}
				// eslint-disable-next-line react/jsx-props-no-spreading
				{...props}
			/>
		);
	});

	WithMobileComponent.propTypes = propTypes;
	WithMobileComponent.defaultProps = defaultProps;

	return WithMobileComponent;
};

export default withDevice;
