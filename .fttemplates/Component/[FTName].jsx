import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import styles from './[FTName].module.scss';
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

const texts: {
  Title: '[FTName].Title',
},

const [FTName]=({ className, testId, id }) => {

  const <FTName |camelcase>ClassNames = classnames(styles.[FTName], className);
  const { t } = useTranslation();

  return (
    <div
      className={ <FTName |camelcase>ClassNames }
      testid={ testId }
      id={ id }
    >
      Text Component Example
      {t(texts.Title)}
    </div>
  );
};

[FTName].propTypes=propTypes;
[FTName].defaultProps=defaultProps;

export default [FTName];
