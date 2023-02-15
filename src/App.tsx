import React, { useState } from "react";

import Button from "./components/Button";
import UserName from "./components/UserName/UserName";
import { ButtonType } from "./components/Button/Button";
import Tabs from "./components/Tabs";
import { CloseIcon, OpenedMenu } from "./assets/icons";

const App = () => {
  const [username, setUsername] = useState("");

  const onChange = (value: string) => {
    setUsername(value);
  };

  return (
    <div>
      <Button title={"Primary"} type={ButtonType.Primary} onClick={() => {}} />
      <Button
        disabled
        title="Secondary"
        type={ButtonType.Secondary}
        onClick={() => {}}
      />
      <Button title={"Error"} type={ButtonType.Error} onClick={() => {}} />
      <UserName username={username} />
      <input onChange={(event) => onChange(event.target.value)} />

      <Tabs />
      <div style={{ background: "black" }}>
        <CloseIcon />
        <OpenedMenu />
      </div>
    </div>
  );
};

export default App;
