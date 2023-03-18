import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import styles from './Sale.module.scss';
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
  Title: 'Sale.Title',
};

const Sale=({ className, testId, id }) => {

  const saleClassNames = classnames(styles.Sale, className);
  const { t } = useTranslation();

  return (
    <div
      className={ saleClassNames }
      data-testid={ testId }
      id={ id }
    >
      Sale component
      {t(texts.Title)}
    </div>
  );
};

Sale.propTypes=propTypes;
Sale.defaultProps=defaultProps;

export default Sale;
