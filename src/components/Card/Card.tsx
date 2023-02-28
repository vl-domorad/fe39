import React, { FC } from "react";
import classNames from "classnames";

import { CardProps, CardSize } from "./types";
import styles from "./Card.module.scss";
import {
  BookmarkIcon,
  DislikeIcon,
  LikeIcon,
  MoreIcon,
} from "../../assets/icons";
import { Theme, useThemeContext } from "../../context/Theme/Context";

const Card: FC<CardProps> = ({ card, size }) => {
  const { title, text, date, image } = card;

  const { theme } = useThemeContext();

  const isMedium = size === CardSize.Medium;
  const isSmall = size === CardSize.Small;
  const isDark = theme === Theme.Dark;

  return (
    <div
      className={classNames(styles.container, {
        [styles.mediumContainer]: isMedium,
        [styles.smallContainer]: isSmall,
        [styles.darkContainer]: isDark,
      })}
    >
      <div
        className={classNames(styles.infoContainer, {
          [styles.mediumInfoContainer]: isMedium,
          [styles.smallInfoContainer]: isSmall,
        })}
      >
        <div className={styles.mainInfoContainer}>
          <div className={styles.titleContainer}>
            <div className={styles.date}>{date}</div>
            <div
              className={classNames(styles.title, {
                [styles.mediumTitle]: isMedium || isSmall,
                [styles.darkTitle]: isDark,
              })}
            >
              {title}
            </div>
          </div>
          {size === CardSize.Large && <div className={styles.text}>{text}</div>}
        </div>
        <img
          src={image}
          className={classNames(styles.image, {
            [styles.mediumImage]: isMedium,
            [styles.smallImage]: isSmall,
          })}
        />
      </div>
      <div className={styles.footer}>
        <div
          className={classNames(styles.iconContainer, {
            [styles.darkIconContainer]: isDark,
          })}
        >
          <div>
            <LikeIcon />
          </div>
          <div>
            <DislikeIcon />
          </div>
        </div>
        <div
          className={classNames(styles.iconContainer, {
            [styles.darkIconContainer]: isDark,
          })}
        >
          <div>
            <BookmarkIcon />
          </div>
          <div>
            <MoreIcon />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
