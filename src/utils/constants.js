export const USERS_TYPES = {
	USER: 'user',
	ADMIN: 'admin',
};

export const LANGUAGES = {
	ENGLISH: 'en',
	SPANISH: 'es',
};

export const DEFAULT_CLOSE_TIME_DELAY = 4000;

export const TOASTS_TYPES = {
	DEFAULT: 'DEFAULT',
	SUCCESS: 'SUCCESS',
	ERROR: 'ERROR',
	INFO: 'INFO',
	WARNING: 'WARNING',
};

export const BREAKPOINTS_DEVICES = {
	SMALL_MOBILE: 320,
	MOBILE: 430,
	SMALL_TABLET: 744,
	TABLET: 990,
	BIG_DESKTOP: 1500,
};

export const MODAL_TRANSITION_EFFECT = {
	up: 'up',
	down: 'down',
};

export const ROUTES = {
	HOME: '/',
	ABOUT: '/about',
	REAL_ESTATE: '/realEstate',
	RENT: '/rent',
	SALE: '/sale',
};

const DEFUALT_SELECTOR = { label: 'Constants.SelectOne', value: '' };

const PROPERTY_TYPES = {
	APARTMENT: { label: 'Apartamento', value: 'apartment' },
	HOUSE: { label: 'Casa', value: 'house' },
	STORE: { label: 'Local', value: 'store' },
	OFFICE: { label: 'Oficina', value: 'office' },
	LAND: { label: 'Terreno', value: 'land' },
};

const PROPERTY_HEATING_COOLING_OPTIONS = {
	NO_HEATING_COOLING: { label: 'Sin calefacción', value: 'no_heating_cooling' },
	CENTRAL: { label: 'Central', value: 'central' },
	INDIVIDUAL: { label: 'Individual', value: 'individual' },
};

const PROPERTY_ACQUISITION_OPTIONS = {
	RENT: { label: 'Constants.Rent', value: 'rent', name: 'Rent' },
	SALE: { label: 'Constants.Sale', value: 'sale', name: 'Sale' },
};

const MIN_MAX_DEFAULT_SELECTOR = {
	min: { label: 'Constants.Option.SelectMin', value: '' },
	max: { label: 'Constants.Option.SelectMax', value: '' },
};

const RENT_PRICE_FILTER = {
	1: { label: '200', value: '200' },
	2: { label: '400', value: '400' },
	3: { label: '600', value: '600' },
	4: { label: '800', value: '800' },
	5: { label: '1000', value: '1000' },
	6: { label: '1200', value: '1200' },
	7: { label: '1400', value: '1400' },
	8: { label: '1600', value: '1600' },
	9: { label: '1800', value: '1800' },
	10: { label: '2000', value: '2000' },
	11: { label: '2200', value: '2200' },
	12: { label: '2400', value: '2400' },
	13: { label: '2600', value: '2600' },
	14: { label: '2800', value: '2800' },
	15: { label: '3000', value: '3000' },
	16: { label: '3200', value: '3200' },
	17: { label: '3400', value: '3400' },
};

const SALE_PRICE_FILTER = {
	1: { label: '50000', value: '50000' },
	2: { label: '100000', value: '100000' },
	3: { label: '150000', value: '150000' },
	4: { label: '200000', value: '200000' },
	5: { label: '250000', value: '250000' },
	6: { label: '300000', value: '300000' },
	7: { label: '350000', value: '350000' },
	8: { label: '400000', value: '400000' },
	9: { label: '450000', value: '450000' },
	10: { label: '500000', value: '500000' },
	11: { label: '550000', value: '550000' },
	12: { label: '600000', value: '600000' },
	13: { label: '650000', value: '650000' },
	14: { label: '700000', value: '700000' },
};

export const SELECTORS = {
	PROPERTY_HEATING_COOLING_OPTIONS,
	PROPERTY_ACQUISITION_OPTIONS,
	PROPERTY_TYPES,
	DEFUALT_SELECTOR,
	MIN_MAX_DEFAULT_SELECTOR,
	RENT_PRICE_FILTER,
	SALE_PRICE_FILTER,
};
