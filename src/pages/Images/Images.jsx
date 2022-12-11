import React, { useState } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import styles from './Images.module.scss';
import { useTranslation } from 'react-i18next';
import FileUpload from '../../components/FileUpload';
import FileDelete from '../../components/FileDelete/FileDelete';

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

const texts = {
	Title: 'Images.Title',
};

const Images = ({ className, testId, id }) => {
	const imagesClassNames = classnames(styles.Images, className);
	const { t } = useTranslation();
	const [fileUploaded, setFileUploaded] = useState();

	const onSuccesUpload = srcImage => {
		setFileUploaded(srcImage);
	};

	const onSuccesDeleted = () => {
		setFileUploaded();
	};

	return (
		<div className={imagesClassNames} data-testid={testId} id={id}>
			{t(texts.Title)}
			<FileUpload onSuccesUpload={onSuccesUpload} categoryName='DEFAULT-APP' />
			{fileUploaded && (
				<div className={styles.ImagesWrapper}>
					<img src={fileUploaded} className={styles.Image} />
					<FileDelete srcImage={fileUploaded} onSuccesDeleted={onSuccesDeleted} />
					<img src={fileUploaded} className={styles.Image} />
				</div>
			)}
		</div>
	);
};

Images.propTypes = propTypes;
Images.defaultProps = defaultProps;

export default Images;
