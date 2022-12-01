import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import styles from './About.module.scss';

const propTypes = {
	className: PropTypes.string,
	testId: PropTypes.string,
	id: PropTypes.string,
};

const defaultProps = {
	className: '',
	testId: '',
	id: undefined,
};

const About = ({ className, testId, id }) => {
	const aboutClassNames = classnames(styles.About, className);

	return (
		<div className={aboutClassNames} id={id}>
			<h1>ABOUT</h1>
			<span>Text About </span>
		</div>
	);
};

About.propTypes = propTypes;
About.defaultProps = defaultProps;

export default About;
