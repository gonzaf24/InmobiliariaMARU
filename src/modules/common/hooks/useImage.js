import { useCallback, useState } from 'react';
import { deleteImg, postImg } from '../services/imageService';

export default function useImage() {
	const [state, setState] = useState({
		loading: false,
		hasError: null,
		errorMessage: null,
		errorCode: null,
	});

	const uploadImage = useCallback(async formData => {
		setState(prevState => ({ ...prevState, loading: true }));
		try {
			const imageResult = await postImg(formData);
			setState(prevState => ({
				...prevState,
				loading: false,
				hasError: false,
				errorMessage: null,
				errorCode: null,
			}));
			return imageResult;
		} catch (error) {
			setState(prevState => ({
				...prevState,
				loading: false,
				hasError: true,
				errorMessage: error.message,
				errorCode: null,
			}));
			return error.message;
		}
	}, []);

	const deleteImage = useCallback(
		async id => {
			setState({ ...state, loading: true });
			try {
				const isDeleted = await deleteImg(id);
				setState({ ...state, loading: false, hasError: false });
				return isDeleted;
			} catch (error) {
				setState({ ...state, loading: false, hasError: true, errorMessage: error.message });
				return error.message;
			}
		},
		[state]
	);

	return {
		isLoading: state.loading,
		hasUploadError: state.error,
		errorCode: state.errorCode,
		errorMessage: state.errorMessage,
		deleteImage,
		uploadImage,
	};
}
