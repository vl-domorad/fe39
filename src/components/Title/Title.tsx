import React, { FC } from "react";
import styles from "../Title/Title.module.scss";

type TitleProps = {
  title: string;
};

const Title: FC<TitleProps> = ({ title }) => {
  return <h1 className={styles.title}>{title}</h1>;
};

export default Title;
