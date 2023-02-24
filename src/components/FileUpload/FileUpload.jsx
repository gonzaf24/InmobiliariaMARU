import React, { useCallback, useRef, useState } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import { BiImageAdd } from 'react-icons/bi';

import useImage from '../../hooks/useImage';
import styles from './FileUpload.module.scss';
import Loader from '../Loader';

const propTypes = {
  onSuccesUpload: PropTypes.func.isRequired,
  className: PropTypes.string,
  testId: PropTypes.string,
  id: PropTypes.string,
  categoryName: PropTypes.string,
  disabled: PropTypes.bool,
  useName: PropTypes.bool,
};

const defaultProps = {
  className: '',
  testId: undefined,
  id: undefined,
  disabled: false,
  categoryName: '',
  useName: false,
};

const FileUpload = ({ className, testId, id, disabled, categoryName, onSuccesUpload, useName }) => {
  const fileUploadClassNames = classnames(styles.FileUpload, className);
  const hiddenFileInput = useRef(null);
  const { uploadImage } = useImage();
  const [isUploading, setIsUploading] = useState(false);

  const handleFileInputChange = useCallback(async (e) => {
	try {
	  e.preventDefault();
	  setIsUploading(true);
	  const file = e.target.files[0];
	  const ext = file.name.split('.').pop();
	  const fileName = useName ? `${categoryName}-${file.name}` : `${categoryName}-${Date.now()}.${ext}`;
	  const formData = new FormData();
	  formData.append('image', file);
	  formData.append('fileName', fileName);
	  const result = await uploadImage(formData);
	  onSuccesUpload(result.imagePath);
	} catch (error) {
	  console.error('Error uploading file: ', error);
	} finally {
	  setIsUploading(false);
	}
  }, [categoryName, onSuccesUpload, setIsUploading, uploadImage, useName]);
  
  const handleClick = useCallback(() => {
	hiddenFileInput.current.click();
  }, [hiddenFileInput]);

  return (
    <Button
      className={fileUploadClassNames}
      data-testid={testId}
      id={id}
      disabled={disabled}
      onClick={handleClick}
    >
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
            onChange={handleFileInputChange}
          />
        </>
      )}
    </Button>
  );
};

FileUpload.propTypes = propTypes;
FileUpload.defaultProps = defaultProps;

export default FileUpload;
