import React, { FC } from "react";

export type UserNameProps = {
  username: string;
};

const UserName: FC<UserNameProps> = (props) => {
  const { username } = props;

  return username ? <div>User Name Value: {username}</div> : null;
};

export default UserName;
