import React from "react";
import classnames from "classnames";
import PropTypes from "prop-types";
import Button from 'react-bootstrap/Button';

import styles from "./Home.module.scss";
import { useTranslation } from "react-i18next";

const propTypes = {
  className: PropTypes.string,
  testId: PropTypes.string,
  id: PropTypes.string,
};

const defaultProps = {
  className: "",
  testId: undefined,
  id: undefined,
};

const texts = {
  TestText: "Home.TestText",
  ChangeLanguage: "Home.ChangeLanguage",
}

const Home = ({ className, testId, id, texts: textsProp }) => {
  const homeClassNames = classnames(styles.Home, className);
  const { t, i18n } = useTranslation();

  const changeLanguage = () => {
    const lang = i18n.language === "en" ? "es" : "en";
    i18n.changeLanguage(lang);
  };

  return (
    <div className={homeClassNames} testid={testId} id={id}>
      <br/><br/><br/>
      <span>{t(texts.TestText)}</span>
      <br/><br/><br/>
      <Button variant="outline-success" onClick={changeLanguage}>{t(texts.ChangeLanguage)}</Button>
      <br/><br/><br/>
      <span>{`Lenguaje:  ${i18n.language}`}</span>
    </div>
  );
};

Home.propTypes = propTypes;
Home.defaultProps = defaultProps;

export default Home;
