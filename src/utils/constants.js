export const TOASTS_TYPES = {
	DEFAULT: 'DEFAULT',
	SUCCESS: 'SUCCESS',
	ERROR: 'ERROR',
	INFO: 'INFO',
	WARNING: 'WARNING',
};

export const DEFAULT_CLOSE_TIME_DELAY = 4000;

export const USERS_TYPES = {
	USER: 'user',
	ADMIN: 'admin',
};

export const LANGUAGES = {
	ENGLISH: 'en',
	SPANISH: 'es',
};

export const PROPERTY_ACQUISITION_OPTIONS = {
	RENT: { label: 'Alquiler', value: 'rent' },
	SALE: { label: 'Venta', value: 'sale' },
};

export const PROPERTY_TYPES = {
	APARTMENT: { label: 'Apartamento', value: 'apartment' },
	HOUSE: { label: 'Casa', value: 'house' },
	STORE: { label: 'Local', value: 'store' },
	OFFICE: { label: 'Oficina', value: 'office' },
	LAND: { label: 'Terreno', value: 'land' },
};

export const PROPERTY_HEATING_COOLING_OPTIONS = {
	NO_HEATING_COOLING: { label: 'Sin calefacción', value: 'no_heating_cooling' },
	CENTRAL: { label: 'Central', value: 'central' },
	INDIVIDUAL: { label: 'Individual', value: 'individual' },
};

export const SELECTORS = {
	PROPERTY_HEATING_COOLING_OPTIONS,
	PROPERTY_ACQUISITION_OPTIONS,
	PROPERTY_TYPES,
};

export const BREAKPOINTS_DEVICES = {
	SMALL_MOBILE: 320,
	MOBILE: 430,
	SMALL_TABLET: 744,
	TABLET: 990,
	BIG_DESKTOP: 1920,
};
