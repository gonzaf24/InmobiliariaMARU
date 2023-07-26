import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import { BsFilter } from 'react-icons/bs';
import { Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { MODAL_TRANSITION_EFFECT } from '../../../../utils';
import { FiltersForm, Modal, useOpenToggle } from '../../../common';

import styles from './FilterModal.module.scss';

const propTypes = {
	className: PropTypes.string,
	testId: PropTypes.string,
	id: PropTypes.string,
	onFilter: PropTypes.func,
};

const defaultProps = {
	className: '',
	testId: undefined,
	id: undefined,
	onFilter: () => {},
};

const texts = {
	Title: 'Constants.Filters',
};

const FilterModal = ({ className, testId, id, onFilter }) => {
	const { t } = useTranslation();
	const { isOpen, open, close } = useOpenToggle(false);

	const filterModalClassNames = classnames(styles.FilterModal, className);

	return (
		<div className={filterModalClassNames} data-testid={testId} id={id}>
			<Button className={styles.Button} variant='primary' onClick={open}>
				<BsFilter />
			</Button>
			<Modal
				dataTestId={testId}
				className={styles.Modal}
				id={id}
				header={t(texts.Title)}
				isOpen={isOpen}
				onHide={close}
				onClose={close}
				backdrop='static'
				effect={MODAL_TRANSITION_EFFECT.down}
				footer={
					<Button className={styles.Button} variant='primary' onClick={close}>
						{t('Constants.Apply')}
					</Button>
				}
			>
				<FiltersForm onFilter={onFilter} />
			</Modal>
		</div>
	);
};

FilterModal.propTypes = propTypes;
FilterModal.defaultProps = defaultProps;

export default FilterModal;
