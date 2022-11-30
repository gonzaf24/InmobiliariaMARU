import React from 'react';
import PropTypes from 'prop-types';

import './[FTName].module.scss';

const propTypes = {
  className: PropTypes.string,
  id: PropTypes.string,
};

const defaultProps = {
  className: '',
  id: undefined,
};

const [FTName] = ({ className, id }) => {
  const classComponent = [[FTName], className].join(' ').trim();

  return (
    <div
      className={ classComponent }
      id={ id }
    >
      [FTName] component
    </div>
  );
};

[FTName].propTypes = propTypes;
[FTName].defaultProps = defaultProps;

export default [FTName];
