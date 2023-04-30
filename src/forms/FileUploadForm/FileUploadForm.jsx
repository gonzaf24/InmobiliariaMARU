import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import styles from './FileUploadForm.module.scss';
import { FileSorteableList, VideoUpload } from '../../components';

const propTypes = {
	className: PropTypes.string,
	testId: PropTypes.string,
	id: PropTypes.string,
	files: PropTypes.arrayOf(PropTypes.string),
	onFileChange: PropTypes.func,
	uploadType: PropTypes.shape({
		id: PropTypes.number,
		name: PropTypes.string,
		useName: PropTypes.bool,
		categoryName: PropTypes.string,
	}),
};

const defaultProps = {
	className: '',
	testId: undefined,
	id: undefined,
	files: [],
	onFileChange: () => {},
	uploadType: {
		id: 3,
		name: 'DEFAULT',
		useName: true,
		categoryName: '',
	},
};

export const UPLOAD_TYPE = {
	VIDEO: {
		id: 0,
		name: 'VIDEOS',
		useName: false,
		categoryName: 'VIDEO',
	},
	IMAGE: {
		id: 1,
		name: 'IMAGES',
		useName: false,
		categoryName: 'IMAGE',
	},
	DOCUMENT: {
		id: 2,
		name: 'DOCUMENTS',
		useName: true,
		categoryName: 'DOCUMENT',
	},
};

const FILE_UPLOAD_COMPONENTS = {
	[UPLOAD_TYPE.VIDEO.id]: VideoUpload,
	[UPLOAD_TYPE.IMAGE.id]: FileSorteableList,
	[UPLOAD_TYPE.DOCUMENT.id]: FileSorteableList,
};

const FileUploadForm = ({ className, testId, id, files, onFileChange, uploadType }) => {
	const FileUploadComponent = FILE_UPLOAD_COMPONENTS[uploadType.id];
	const fileUploadFormClassNames = classnames(styles.FileUploadForm, className);

	return (
		<div className={fileUploadFormClassNames} data-testid={testId} id={id}>
			<FileUploadComponent
				files={files}
				setFiles={onFileChange}
				name={uploadType.name}
				useName={uploadType.useName}
				categoryName={uploadType.categoryName}
			/>
		</div>
	);
};

FileUploadForm.propTypes = propTypes;
FileUploadForm.defaultProps = defaultProps;

export default FileUploadForm;
