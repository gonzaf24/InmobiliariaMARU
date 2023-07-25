import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import { useTranslation } from 'react-i18next';

import Modal from '../Modal';
import { MODAL_TRANSITION_EFFECT } from '../../../utils/constants';
import { EditHouseForm } from '../../../../admin';

import styles from './EditHouseModal.module.scss';

const propTypes = {
	className: PropTypes.string,
	testId: PropTypes.string,
	id: PropTypes.string,
	isOpen: PropTypes.bool,
	onClose: PropTypes.func,
	house: PropTypes.object,
};

const defaultProps = {
	className: '',
	testId: undefined,
	id: undefined,
	isOpen: false,
	onClose: () => {},
	house: {},
};

const texts = {
	Title: 'EditHouseModal.Title',
};

const EditHouseModal = ({ className, testId, id, isOpen, onClose, house }) => {
	const { t } = useTranslation();
	console.log('Edit house', house);

	const EditHouseModalClassNames = classnames(styles.EditHouseModal, className);

	return (
		<Modal
			dataTestId={testId}
			className={EditHouseModalClassNames}
			id={id}
			size='xl'
			header={t(texts.Title)}
			isOpen={isOpen}
			onHide={onClose}
			onClose={onClose}
			backdrop='static'
			backdropClassName={styles.Backdrop}
			effect={MODAL_TRANSITION_EFFECT.up}
		>
			<EditHouseForm house={house} onClose={onClose} />
		</Modal>
	);
};

EditHouseModal.propTypes = propTypes;
EditHouseModal.defaultProps = defaultProps;

export default EditHouseModal;
