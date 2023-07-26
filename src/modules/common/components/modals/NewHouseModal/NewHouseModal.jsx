import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import { useTranslation } from 'react-i18next';
import { Modal } from '../../../components';
import { NewHouseForm } from '../../../../admin';
import { MODAL_TRANSITION_EFFECT } from '../../../../../utils';

import styles from './NewHouseModal.module.scss';

const propTypes = {
	className: PropTypes.string,
	testId: PropTypes.string,
	id: PropTypes.string,
	isOpen: PropTypes.bool,
	onClose: PropTypes.func,
};

const defaultProps = {
	className: '',
	testId: undefined,
	id: undefined,
	isOpen: false,
	onClose: () => {},
};

const texts = {
	Title: 'NewHouseModal.Title',
};

const NewHouseModal = ({ className, testId, id, isOpen, onClose }) => {
	const { t } = useTranslation();

	const newHouseModalClassNames = classnames(styles.NewHouseModal, className);

	return (
		<Modal
			dataTestId={testId}
			className={newHouseModalClassNames}
			id={id}
			size='xl'
			header={t(texts.Title)}
			isOpen={isOpen}
			onHide={onClose}
			onClose={onClose}
			backdrop='static'
			effect={MODAL_TRANSITION_EFFECT.up}
		>
			<NewHouseForm onClose={onClose} />
		</Modal>
	);
};

NewHouseModal.propTypes = propTypes;
NewHouseModal.defaultProps = defaultProps;

export default NewHouseModal;
