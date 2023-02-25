import React  from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { MdDeleteForever } from 'react-icons/md';
import { useTranslation } from 'react-i18next';
import ActionModal from '../ActionModal';
import useOpenToggle from '../../hooks/useOpenToggle';
import { formatFileNameToShow } from '../../utils/formatters';
import styles from './FileDelete.module.scss';
import Loader from '../Loader';
import useImage from '../../hooks/useImage';
import useToastContext from '../../context/toastContext';

const propTypes = {
	className: PropTypes.string,
	testId: PropTypes.string,
	id: PropTypes.string,
	src: PropTypes.string,
	onSuccesDeleted: PropTypes.func,
};

const defaultProps = {
	className: '',
	testId: undefined,
	id: undefined,
	src: '',
	onSuccesDeleted: undefined,
};

const texts = {
	SuccessDeleted: 'FileDelete.SuccessDeleted',
	DeleteHeader: 'FileDelete.DeleteHeader',
	DeleteMessage: 'DeleteMessage',
	ErrorMessage: 'FileDelete.ErrorMessage',
};

const FileDelete = ({ className, testId, id, src, onSuccesDeleted }) => {
	const fileDeleteClassNames = classnames(styles.FileDelete, className);
	const { t } = useTranslation();
	const { isLoading , deleteImage } = useImage();
	const { addSuccessToast, addErrorToast } = useToastContext();

	const {
		isOpen: isOpenConfirmDeleteImage,
		open: openConfirmDeleteImage,
		close: closeConfirmDeleteImage,
	} = useOpenToggle(false);

	const onDeleteImage = async () => {
		try {
			const result = await deleteImage(formatFileNameToShow(src));
			if (result === true) {
				onSuccesDeleted(src);
				addSuccessToast(t(texts.SuccessDeleted));
				closeConfirmDeleteImage();
			} else {
				addErrorToast(t(texts.ErrorMessage));
			}
		} catch (error) {
			addErrorToast("Error al eliminar la imagen");
		}
	};

	return (
		<div className={fileDeleteClassNames} data-testid={testId} id={id}>
			{isLoading && <Loader className={styles.Loader} /> }
			{!isLoading && 	<MdDeleteForever className={styles.DeleteButton} onClick={openConfirmDeleteImage} />}
			<ActionModal
				id={id}
				isOpen={isOpenConfirmDeleteImage}
				onHide={closeConfirmDeleteImage}
				onClose={closeConfirmDeleteImage}
				onReject={closeConfirmDeleteImage}
				onAccept={onDeleteImage}
				header={t(texts.DeleteHeader)}
				isLoading={isLoading}
			>
				<span>{t(texts.DeleteMessage)}</span>
			</ActionModal>
		</div>
	);
};

FileDelete.propTypes = propTypes;
FileDelete.defaultProps = defaultProps;

export default FileDelete;
