import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import styles from './About.module.scss';

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

const About=({ className, testId, id, texts: textsProp }) => {

  const aboutClassNames = classnames(styles.About, className);

  return (
    <div
      className={ aboutClassNames }
      testid={ testId }
      id={ id }
    >
      <span>Text  About </span>
    </div>
  );
};

About.propTypes=propTypes;
About.defaultProps=defaultProps;

export default About;
