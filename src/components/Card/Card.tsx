import React, { FC } from "react";
import classNames from "classnames";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { CardProps } from "./types";
import styles from "./Card.module.scss";
import {
  BookmarkIcon,
  DislikeIcon,
  FilledBookmarkIcon,
  LikeIcon,
  MoreIcon,
} from "src/assets/icons";
import { Theme, useThemeContext } from "src/context/Theme/Context";
import {
  LikeStatus,
  PostSelectors,
  setStatus,
} from "src/redux/reducers/postSlice";
import { CardSize } from "src/utils/@globalTypes";

const Card: FC<CardProps> = ({ card, size }) => {
  const { title, text, date, image, id } = card;

  const { theme } = useThemeContext();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isMedium = size === CardSize.Medium;
  const isSmall = size === CardSize.Small;
  const isSearch = size === CardSize.Search;
  const isDark = theme === Theme.Dark;

  const onStatusClick = (status: LikeStatus) => () => {
    dispatch(setStatus({ status, card }));
  };

  const likedPosts = useSelector(PostSelectors.getLikedPosts);
  const dislikedPosts = useSelector(PostSelectors.getDislikedPosts);

  const likedIndex = likedPosts.findIndex((post) => post.id === card.id);
  const dislikedIndex = dislikedPosts.findIndex((post) => post.id === card.id);

  const onTitleClick = () => {
    navigate(`/blog/${id}`);
  };

  return (
    <div
      className={classNames(styles.container, {
        [styles.mediumContainer]: isMedium,
        [styles.smallContainer]: isSmall,
        [styles.searchContainer]: isSearch,
        [styles.darkContainer]: isDark,
      })}
    >
      <div
        className={classNames(styles.infoContainer, {
          [styles.mediumInfoContainer]: isMedium,
          [styles.smallInfoContainer]: isSmall,
          [styles.searchInfoContainer]: isSearch,
        })}
      >
        <div className={styles.mainInfoContainer}>
          <div className={styles.titleContainer}>
            <div className={styles.date}>{date}</div>
            <div
              className={classNames(styles.title, {
                [styles.mediumTitle]: isMedium || isSmall || isSearch,
                [styles.darkTitle]: isDark,
              })}
              onClick={onTitleClick}
            >
              {title}
            </div>
          </div>
          {size === CardSize.Large && <div className={styles.text}>{text}</div>}
        </div>
        <img
          alt=""
          src={image}
          className={classNames(styles.image, {
            [styles.mediumImage]: isMedium,
            [styles.smallImage]: isSmall || isSearch,
          })}
        />
      </div>
      <div className={styles.footer}>
        <div
          className={classNames(styles.iconContainer, {
            [styles.darkIconContainer]: isDark,
          })}
        >
          <div onClick={onStatusClick(LikeStatus.Like)}>
            <LikeIcon />
            {likedIndex > -1 && 1}
          </div>
          <div onClick={onStatusClick(LikeStatus.Dislike)}>
            <DislikeIcon />
            {dislikedIndex > -1 && 1}
          </div>
        </div>
        <div
          className={classNames(styles.iconContainer, {
            [styles.darkIconContainer]: isDark,
          })}
        >
          <div className={styles.saveIcon}>
            {false ? <FilledBookmarkIcon /> : <BookmarkIcon />}
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
