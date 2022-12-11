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
		setState({ loading: true, error: false });
		return await postImg(formData)
			.then(imageResult => {
				setState({
					loading: false,
					error: false,
					errorCode: null,
					errorMessage: null,
				});
				return imageResult;
			})
			.catch(error => {
				setState({
					loading: false,
					hasError: true,
					errorCode: null,
					errorMessage: error.message,
				});
				return error.message;
			});
	}, []);

	const deleteImage = useCallback(async id => {
		setState({ loading: true, error: false });
		return await deleteImg(id)
			.then(isDeleted => {
				setState({
					loading: false,
					error: false,
					errorCode: null,
					errorMessage: null,
				});
				return isDeleted;
			})
			.catch(error => {
				setState({
					loading: false,
					hasError: true,
					errorCode: null,
					errorMessage: error.message,
				});
				return error.message;
			});
	}, []);

	return {
		isLoginLoadinUpload: state.loading,
		hasUploadError: state.error,
		errorCode: state.errorCode,
		errorMessage: state.errorMessage,
		deleteImage,
		uploadImage,
	};
}
