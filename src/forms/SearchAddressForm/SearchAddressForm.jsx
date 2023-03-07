import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import Geocode from 'react-geocode';
import styles from './SearchAddressForm.module.scss';
import classNames from 'classnames';
import GoogleMap from '../../pages/GoogleMap/GoogleMap';

const propTypes = {
  className: PropTypes.string,
  testId: PropTypes.string,
  id: PropTypes.string,
};

const defaultProps = {
  className: '',
  testId: undefined,
  id: undefined,
};

const API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
console.log('API_KEY', API_KEY);

Geocode.setApiKey(API_KEY);

const SearchAddressForm = ({ className, testId, id }) => {
  const [address, setAddress] = useState('');
	const [lat, setLat] = useState();
	const [lng, setLng] = useState();
  
  useEffect(() => {
    console.log('useEffect address', address); 
  }, [address]);
  
  const handleSelect = useCallback(async (result) => {
    console.log('result', result);
    // eslint-disable-next-line no-unused-vars
    const { description, placeID } = result;
    setAddress(description);
    console.log('lat', lat);
    console.log('lng', lng);
    try {
      const response = await Geocode.fromAddress(description);
      const { lat, lng } = response.results[0].geometry.location;
      setLat(lat);
      setLng(lng);
      
      // onSearch({ lat, lng });
    } catch (error) {
      console.error(error);
    }
  }, []);
  
  const searchAddressFormClassNames = classNames(styles.SearchAddressForm, className);
  
  return (
    <div className={searchAddressFormClassNames} data-testid={testId} id={id} >
      <GooglePlacesAutocomplete
      className={styles.InputText}
        apiKey={API_KEY}
        onSelect={handleSelect}
        keyboardShouldPersistTaps="handled"
        autocompletionRequest={{
          types: ['geocode'],
          componentRestrictions: { country: ['es','do'] },
        }}
        fetchDetails={true} 
      />
      <GoogleMap lat={lat} lng={lng} /> 
      <div><span>{address}</span></div>
      <div><span>{`Lat : ${lat}`}</span></div>
      <div><span>{`Lng : ${lng}`}</span></div>
    </div>

    
  );
};

SearchAddressForm.propTypes = propTypes;
SearchAddressForm.defaultProps = defaultProps;

export default SearchAddressForm;
