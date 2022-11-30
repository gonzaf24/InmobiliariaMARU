import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import styles from './[FTName].module.scss';

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

const [FTName]=({ className, testId, id, texts: textsProp }) => {

  const <FTName |camelcase>ClassNames = classnames(styles.[FTName], className);

  return (
    <div
      className={ <FTName |camelcase>ClassNames }
      testid={ testId }
      id={ id }
    >
      Text Component Example
    </div>
  );
};

[FTName].propTypes=propTypes;
[FTName].defaultProps=defaultProps;

export default [FTName];