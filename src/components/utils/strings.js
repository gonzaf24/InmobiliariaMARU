// Regexp for different type of strign data

// This regular expression is used to validate an email address.
// It allows letters, numbers, hyphens, and underscores in the username part,
// and letters, hyphens, and periods in the domain part. The domain must be between 2 and 7 letters.
const EMAIL_REG_EXP = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
// This regular expression is used to validate a mobile phone number.
// It allows the plus sign "+" at the beginning, followed by at least 6 digits and/or spaces.
const PHONE_REG_EXP = /^[+\d\s]{6,}$/;
// This regular expression is used to validate a text string representing a name and surname.
// It allows uppercase and lowercase letters, including accented and special letters, as well as spaces.
// The string must be between 1 and 20 characters long. It does not allow numbers or special characters.
const PLAIN_TEXT_REG_EXP = /^[a-zA-ZÀ-ÖØ-öø-ÿ\s]{1,20}$/;

const capitalizeFirstLetter = string => string.charAt(0).toUpperCase() + string.slice(1);

// Check ig is a valid string
const checkIsValidString = string =>
	string !== undefined && string !== null && (typeof string === 'string' || string instanceof String);

// Check if is valid url
const checkIsValidUrl = _url => {
	try {
		const url = new URL(_url);
		return !!url;
	} catch (error) {
		return false;
	}
};

export { capitalizeFirstLetter, checkIsValidString, checkIsValidUrl, EMAIL_REG_EXP, PHONE_REG_EXP, PLAIN_TEXT_REG_EXP };
