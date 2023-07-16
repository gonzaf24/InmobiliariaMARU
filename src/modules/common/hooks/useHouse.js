import { useCallback, useState } from 'react';
import { deleteHouse, getHouses, postHouse, putHouse } from '../services/houseService';

export default function useHouse() {
	const [state, setState] = useState({
		loading: false,
		hasError: null,
		errorMessage: null,
		errorCode: null,
	});

	const getHousesList = useCallback(async () => {
		try {
			setState(prevState => ({ ...prevState, loading: true, hasError: false }));
			const houses = await getHouses();
			setState(prevState => ({ ...prevState, loading: false }));
			return houses;
		} catch (error) {
			setState(prevState => ({
				...prevState,
				loading: false,
				hasError: true,
				errorMessage: error.message,
			}));
			return [];
		}
	}, []);

	const getFilteredHousesList = useCallback(async filters => {
		try {
			setState(prevState => ({ ...prevState, loading: true, hasError: false }));
			const houses = await getHouses();

			// Guarda los filtros en el almacenamiento local
			localStorage.setItem('filters', JSON.stringify(filters));

			const filteredHouses = houses.filter(house => {
				return (
					house.showInMap !== false &&
					(!filters.operation || house.operation === filters.operation) &&
					(!filters.propertyType || house.propertyType === filters.propertyType) &&
					(!filters.country || house.country === filters.country) &&
					(!filters.region || house.region === filters.region) &&
					(!filters.city || house.city === filters.city) &&
					(!filters.minPrice || house.price >= filters.minPrice) &&
					(!filters.maxPrice || house.price <= filters.maxPrice)
				);
			});

			setState(prevState => ({ ...prevState, loading: false }));
			return filteredHouses;
		} catch (error) {
			setState(prevState => ({
				...prevState,
				loading: false,
				hasError: true,
				errorMessage: error.message,
			}));
			return [];
		}
	}, []);

	const newHouse = useCallback(async house => {
		try {
			setState(prevState => ({ ...prevState, loading: true, hasError: false }));
			const newHouse = await postHouse(house);
			setState(prevState => ({ ...prevState, loading: false }));
			return newHouse;
		} catch (error) {
			console.log('Error creating house: ', error);
			setState(prevState => ({ ...prevState, loading: false, hasError: true, errorMessage: error.message }));
			return false;
		}
	}, []);

	const editHouse = useCallback(async house => {
		try {
			setState({ loading: true, hasError: false, errorCode: null, errorMessage: null });
			const editedHouse = await putHouse(house);
			console.log('edited house ', editedHouse);
			setState({ loading: false, hasError: false, errorCode: null, errorMessage: null });
			return true;
		} catch (error) {
			console.log('edited house Error --->', error.message);
			setState({ loading: false, hasError: true, errorCode: null, errorMessage: error.message });
			return error.message;
		}
	}, []);

	const removeHouse = useCallback(async id => {
		try {
			setState({ loading: true, error: false });
			const house = await deleteHouse(id);
			console.log('deleted house ', house);
			setState({
				loading: false,
				error: false,
				errorCode: null,
				errorMessage: null,
			});
			return house;
		} catch (error) {
			console.log('deleted house Error --- > ', error.message);
			setState({
				loading: false,
				hasError: true,
				errorCode: null,
				errorMessage: error.message,
			});
			return false;
		}
	}, []);

	return {
		isLoading: state.loading,
		hasError: state.error,
		errorCode: state.errorCode,
		errorMessage: state.errorMessage,
		getHousesList,
		getFilteredHousesList,
		newHouse,
		editHouse,
		removeHouse,
	};
}
