import React, {useState} from "react";

import Button from "./components/Button";
import UserName from "./components/UserName/UserName";
import {ButtonType} from "./components/Button/Button";
import Tabs from "./components/Tabs";
import {CloseIcon, OpenedMenu} from "./assets/icons";
import styles from "./App.module.scss";
import Card from "./components/Card";
import {CardSize} from "./components/Card/types";

const MOCK_CARD = {
    id: 0,
    image: 'https://thumbs.dreamstime.com/b/environment-earth-day-hands-trees-growing-seedlings-bokeh-green-background-female-hand-holding-tree-nature-field-gra-130247647.jpg',
    text: 'Astronauts Kayla Barron and Raja Chari floated out of the International Space Station airlock for a spacewalk Tuesday, installing brackets and struts to support new solar arrays to upgrade the research lab’s power system on the same day that crewmate Mark Vande Hei marked his 341st day in orbit, a U.S. record for a single spaceflight.',
    date: '12-10-2023',
    lesson_num: 12,
    title: 'Astronauts prep for new solar arrays on nearly seven-hour spacewalk ...',
    description: 'Описание поста',
    author: 10,
};

const App = () => {
  const [username, setUsername] = useState("");

  const [isOpened, setOpened] = useState(false);

  const onClick = () => {
    setOpened(!isOpened);
  };

  const onChange = (value: string) => {
    setUsername(value);
  };

  return (
    <div className={styles.container}>
      {/*<Button title={"Primary"} type={ButtonType.Primary} onClick={() => {}} />*/}
      {/*<Button*/}
      {/*  disabled*/}
      {/*  title="Secondary"*/}
      {/*  type={ButtonType.Secondary}*/}
      {/*  onClick={() => {}}*/}
      {/*/>*/}
      {/*<Button title={"Error"} type={ButtonType.Error} onClick={() => {}} />*/}
      {/*<UserName username={username} />*/}
      {/*<input onChange={(event) => onChange(event.target.value)} />*/}

      {/*<Tabs />*/}
      {/*<div>*/}
      {/*  <Button*/}
      {/*    className={styles.burgerButton}*/}
      {/*    title={!isOpened ? <OpenedMenu /> : <CloseIcon />}*/}
      {/*    onClick={onClick}*/}
      {/*    type={ButtonType.Primary}*/}
      {/*  />*/}
      {/*</div>*/}
      <Card card={MOCK_CARD} size={CardSize.Large} />
      <Card card={MOCK_CARD} size={CardSize.Medium} />
      <Card card={MOCK_CARD} size={CardSize.Small} />
    </div>
  );
};

export default App;
