import React, { useRef, useState } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import { BiImageAdd } from 'react-icons/bi';

import useImage from '../../hooks/useImage';
import styles from './FileUpload.module.scss';
import Loader from '../Loader';

const propTypes = {
	className: PropTypes.string,
	testId: PropTypes.string,
	id: PropTypes.string,
	categoryName: PropTypes.string,
	disabled: PropTypes.bool,
	onSuccesUpload: PropTypes.func,
};

const defaultProps = {
	className: '',
	testId: undefined,
	id: undefined,
	disabled: false,
	categoryName: '',
	onSuccesUpload: undefined,
};

const FileUpload = ({ className, testId, id, disabled, categoryName, onSuccesUpload }) => {
	const fileUploadClassNames = classnames(styles.FileUpload, className);
	const hiddenFileInput = useRef(null);
	const { uploadImage } = useImage();
	const [isUploading, setIsUploading] = useState(false);

	const handleClick = () => {
		hiddenFileInput.current.click();
	};

	const onSelectFile = async e => {
		try {
			e.preventDefault();
			setIsUploading(true);
			if (e.target.files && e.target.files.length > 0) {
				const file = e.target.files[0];
				const name = e.target.files[0].name;
				const lastDot = name.lastIndexOf('.');
				const ext = name.substring(lastDot + 1);
				const hora = new Date();
				const fileName = `${categoryName}-${hora.getTime()}.${ext}`;
				const formData = new FormData();
				formData.append('image', file);
				formData.append('fileName', fileName);
				const result = await uploadImage(formData);
				onSuccesUpload(result.imagePath);
				setIsUploading(false);
			}
		} catch (error) {
			setIsUploading(false);
			console.log('error upload file ', error);
		}
	};
	return (
		<Button className={fileUploadClassNames} data-testid={testId} id={id} disabled={disabled} onClick={handleClick}>
			{isUploading ? (
				<Loader className={styles.Loader} />
			) : (
				<>
					<BiImageAdd />
					<input
						ref={hiddenFileInput}
						accept='image/*'
						id='file-upload'
						style={{ display: 'none' }}
						type='file'
						onChange={onSelectFile}
					/>
				</>
			)}
		</Button>
	);
};

FileUpload.propTypes = propTypes;
FileUpload.defaultProps = defaultProps;

export default FileUpload;
