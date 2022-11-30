import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import styles from './Home.module.scss';

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

const Home=({ className, testId, id, texts: textsProp }) => {

  const homeClassNames=classnames(styles.Home, className);

  return (
    <div
      className={ homeClassNames }
      testid={ testId }
      id={ id }
    >
      Text Component Example
    </div>
  );
};

Home.propTypes=propTypes;
Home.defaultProps=defaultProps;

export default Home;
