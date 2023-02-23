import React, { FC } from "react";

import Card, { CardType } from "../Card";
import { CardSize } from "../Card/types";
import styles from "./CardsList.module.scss";

type CardsListProps = {
  cardsList: CardType[];
};
const CardsList: FC<CardsListProps> = ({ cardsList }) => {
  return cardsList.length > 0 ? (
    <div className={styles.container}>
      <div>
        <Card card={cardsList[0]} size={CardSize.Large} />
        <div className={styles.mediumContainer}>
          {cardsList.map((item, index) => {
            if (index > 0 && index < 5) {
              return <Card key={item.id} card={item} size={CardSize.Medium} />;
            }
          })}
        </div>
      </div>
      <div className={styles.rightSideContainer}>
        {cardsList.map((item, index) => {
          if (index > 5) {
            return <Card key={item.id} card={item} size={CardSize.Small} />;
          }
        })}
      </div>
    </div>
  ) : null;
};

export default CardsList;
