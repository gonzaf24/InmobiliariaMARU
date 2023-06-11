import { useEffect, useState } from 'react';
import { useWindowSize } from 'usehooks-ts';
import { BREAKPOINTS_DEVICES } from '../utils/constants';

const useDevice = () => {
	const { width } = useWindowSize();
	const [isSmallMobile, setIsSmallMobile] = useState(false);
	const [isBigMobile, setIsBigMobile] = useState(false);
	const [isMobile, setIsMobile] = useState(false);
	const [isSmallTablet, setIsSmallTablet] = useState(false);
	const [isBigTablet, setIsBigTablet] = useState(false);
	const [isTablet, setIsTablet] = useState(false);
	const [isSmallDesktop, setIsSmallDesktop] = useState(false);
	const [isBigDesktop, setIsBigDesktop] = useState(false);
	const [isDesktop, setIsDesktop] = useState(false);

	useEffect(() => {
		setIsSmallMobile(width <= BREAKPOINTS_DEVICES.SMALL_MOBILE);
		setIsBigMobile(width > BREAKPOINTS_DEVICES.SMALL_MOBILE && width <= BREAKPOINTS_DEVICES.MOBILE);
		setIsMobile(width <= BREAKPOINTS_DEVICES.MOBILE);
		setIsSmallTablet(width > BREAKPOINTS_DEVICES.MOBILE && width <= BREAKPOINTS_DEVICES.SMALL_TABLET);
		setIsBigTablet(width > BREAKPOINTS_DEVICES.SMALL_TABLET && width <= BREAKPOINTS_DEVICES.TABLET);
		setIsTablet(width > BREAKPOINTS_DEVICES.MOBILE && width <= BREAKPOINTS_DEVICES.TABLET);
		setIsSmallDesktop(width > BREAKPOINTS_DEVICES.TABLET && width <= BREAKPOINTS_DEVICES.BIG_DESKTOP);
		setIsBigDesktop(width > BREAKPOINTS_DEVICES.BIG_DESKTOP);
		setIsDesktop(width > BREAKPOINTS_DEVICES.TABLET);
	}, [
		BREAKPOINTS_DEVICES.BIG_DESKTOP,
		BREAKPOINTS_DEVICES.MOBILE,
		BREAKPOINTS_DEVICES.SMALL_MOBILE,
		BREAKPOINTS_DEVICES.SMALL_TABLET,
		BREAKPOINTS_DEVICES.TABLET,
		width,
	]);

	return {
		isSmallMobile,
		isBigMobile,
		isMobile,
		isSmallTablet,
		isBigTablet,
		isTablet,
		isSmallDesktop,
		isBigDesktop,
		isDesktop,
	};
};

export default useDevice;
