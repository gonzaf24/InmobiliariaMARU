import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import styles from './Rent.module.scss';
import { useTranslation } from 'react-i18next';

const propTypes={
  className: PropTypes.string,
  testId: PropTypes.string,
  id: PropTypes.string,
};

const defaultProps={
  className: '',
  testId: undefined,
  id: undefined,
};

const texts= {
  Title: 'Rent.Title',
};

const Rent=({ className, testId, id }) => {

  const rentClassNames = classnames(styles.Rent, className);
  const { t } = useTranslation();

  return (
    <div
      className={ rentClassNames }
      data-testid={ testId }
      id={ id }
    >
      Rent component
      {t(texts.Title)}
    </div>
  );
};

Rent.propTypes=propTypes;
Rent.defaultProps=defaultProps;

export default Rent;
