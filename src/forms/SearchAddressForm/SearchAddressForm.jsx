import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import Geocode from 'react-geocode';
import styles from './SearchAddressForm.module.scss';
import classNames from 'classnames';
import { GoogleMap } from '../../components';

const API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
Geocode.setApiKey(API_KEY);

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

const SearchAddressForm = ({ className, testId, id }) => {
  const [address, setAddress] = useState('');
	const [lat, setLat] = useState();
	const [lng, setLng] = useState();
  
  const handleSelect = useCallback(async (result) => {
    const { description } = result;
    setAddress(description);
    try {
      const response = await Geocode.fromAddress(description);
      const { lat, lng } = response.results[0].geometry.location;
      setLat(lat);
      setLng(lng);
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
      
      <div className={styles.LatLngWrapper}>
        <span>{`Lat : ${lat}`}</span>
        <span>{`Lng : ${lng}`}</span>
      </div>

      <span className={styles.Address}>{address}</span>
    </div>

    
  );
};

SearchAddressForm.propTypes = propTypes;
SearchAddressForm.defaultProps = defaultProps;

export default SearchAddressForm;
