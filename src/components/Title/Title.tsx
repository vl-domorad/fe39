import React, { FC } from "react";
import classNames from "classnames";

import styles from "../Title/Title.module.scss";
import { Theme, useThemeContext } from "../../context/Theme/Context";

type TitleProps = {
  title: string;
};

const Title: FC<TitleProps> = ({ title }) => {
  const { theme } = useThemeContext();

  return (
    <div
      className={classNames(styles.title, {
        [styles.darkTitle]: theme === Theme.Dark,
      })}
    >
      {title}
    </div>
  );
};

export default Title;
