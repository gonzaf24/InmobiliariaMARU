const style = getComputedStyle(document.body);

const theme = {
	blue: style.getPropertyValue('--bs-blue').trim(),
	indigo: style.getPropertyValue('--bs-indigo').trim(),
	purple: style.getPropertyValue('--bs-purple').trim(),
	pink: style.getPropertyValue('--bs-pink').trim(),
	red: style.getPropertyValue('--bs-red').trim(),
	orange: style.getPropertyValue('--bs-orange').trim(),
	yellow: style.getPropertyValue('--bs-yellow').trim(),
	green: style.getPropertyValue('--bs-green').trim(),
	teal: style.getPropertyValue('--bs-teal').trim(),
	cyan: style.getPropertyValue('--bs-cyan').trim(),
	white: style.getPropertyValue('--bs-white').trim(),
	gray: style.getPropertyValue('--bs-gray').trim(),
	black: style.getPropertyValue('--bs-black').trim(),
	grayDark: style.getPropertyValue('--bs-gray-dark').trim(),
	gray100: style.getPropertyValue('--bs-gray-100').trim(),
	gray200: style.getPropertyValue('--bs-gray-200').trim(),
	gray300: style.getPropertyValue('--bs-gray-300').trim(),
	gray400: style.getPropertyValue('--bs-gray-400').trim(),
	gray500: style.getPropertyValue('--bs-gray-500').trim(),
	gray600: style.getPropertyValue('--bs-gray-600').trim(),
	gray700: style.getPropertyValue('--bs-gray-700').trim(),
	gray800: style.getPropertyValue('--bs-gray-800').trim(),
	gray900: style.getPropertyValue('--bs-gray-900').trim(),
	white5: style.getPropertyValue('--bs-white-5').trim(),
	white10: style.getPropertyValue('--bs-white-10').trim(),
	white20: style.getPropertyValue('--bs-white-20').trim(),
	white30: style.getPropertyValue('--bs-white-30').trim(),
	white40: style.getPropertyValue('--bs-white-40').trim(),
	white50: style.getPropertyValue('--bs-white-50').trim(),
	white60: style.getPropertyValue('--bs-white-60').trim(),
	white70: style.getPropertyValue('--bs-white-70').trim(),
	white80: style.getPropertyValue('--bs-white-80').trim(),
	white90: style.getPropertyValue('--bs-white-90').trim(),
	white100: style.getPropertyValue('--bs-white-100').trim(),
	primary: style.getPropertyValue('--bs-primary').trim(),
	primaryHover: style.getPropertyValue('--bs-primary-hover').trim(),
	primaryDisabled: style.getPropertyValue('--bs-primary-disabled').trim(),
	secondary: style.getPropertyValue('--bs-secondary').trim(),
	secondaryHover: style.getPropertyValue('--bs-secondary-hover').trim(),
	success: style.getPropertyValue('--bs-success').trim(),
	info: style.getPropertyValue('--bs-info').trim(),
	warning: style.getPropertyValue('--bs-warning').trim(),
	danger: style.getPropertyValue('--bs-danger').trim(),
	light: style.getPropertyValue('--bs-light').trim(),
	dark: style.getPropertyValue('--bs-dark').trim(),
	darkSecondary: style.getPropertyValue('--bs-dark-secondary').trim(),
	darkSecondaryHover: style.getPropertyValue('--bs-dark-secondary-hover').trim(),
	primaryRgb: style.getPropertyValue('--bs-primary-rgb').trim(),
	secondaryRgb: style.getPropertyValue('--bs-secondary-rgb').trim(),
	successRgb: style.getPropertyValue('--bs-success-rgb').trim(),
	infoRgb: style.getPropertyValue('--bs-info-rgb').trim(),
	warningRgb: style.getPropertyValue('--bs-warning-rgb').trim(),
	dangerRgb: style.getPropertyValue('--bs-danger-rgb').trim(),
	lightRgb: style.getPropertyValue('--bs-light-rgb').trim(),
	darkRgb: style.getPropertyValue('--bs-dark-rgb').trim(),
	whiteRgb: style.getPropertyValue('--bs-white-rgb').trim(),
	blackRgb: style.getPropertyValue('--bs-black-rgb').trim(),
	bodyColorRgb: style.getPropertyValue('--bs-body-color-rgb').trim(),
	bodyBgRgb: style.getPropertyValue('--bs-body-bg-rgb').trim(),
	fontSansSerif: style.getPropertyValue('--bs-font-sans-serif').trim(),
	fontMonospace: style.getPropertyValue('--bs-font-monospace').trim(),
	gradient: style.getPropertyValue('--bs-gradient').trim(),
	bodyFontFamily: style.getPropertyValue('--bs-body-font-family').trim(),
	bodyFontSize: style.getPropertyValue('--bs-body-font-size').trim(),
	bodyFontWeight: style.getPropertyValue('--bs-body-font-weight').trim(),
	bodyLineHeight: style.getPropertyValue('--bs-body-line-height').trim(),
	bodyColor: style.getPropertyValue('--bs-body-color').trim(),
	bodyBg: style.getPropertyValue('--bs-body-bg').trim(),
	radius6: style.getPropertyValue('--bs-radius-6').trim(),
	radiusMedium: style.getPropertyValue('--bs-radius-medium').trim(),
	radiusLarge: style.getPropertyValue('--bs-radius-large').trim(),
	fontExtraSmall: style.getPropertyValue('--bs-font-extra-small').trim(),
	fontSmall: style.getPropertyValue('--bs-font-small').trim(),
	fontMedium: style.getPropertyValue('--bs-font-medium').trim(),
	fontLarge: style.getPropertyValue('--bs-font-large').trim(),
	fontExtraLarge: style.getPropertyValue('--bs-font-extra-large').trim(),
};

export default theme;
