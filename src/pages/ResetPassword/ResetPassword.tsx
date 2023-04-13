import React, { useState } from "react";
import classNames from "classnames";

import styles from "./ResetPassword.module.scss";
import Button from "src/components/Button";
import { ButtonType } from "src/utils/@globalTypes";
import { Theme, useThemeContext } from "src/context/Theme/Context";
import Input from "src/components/Input";
import { useDispatch } from "react-redux";
import { RoutesList } from "src/pages/Router";
import { useNavigate } from "react-router-dom";
import { resetPassword } from "src/redux/reducers/authSlice";

const ResetPassword = () => {
  const { theme } = useThemeContext();
  const isDark = theme === Theme.Dark;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");

  const onChangeEmail = (value: string) => {
    setEmail(value);
  };

  const onSubmit = () => {
    dispatch(
      resetPassword({
        data: { email },
        callback: () => navigate(RoutesList.SignIn),
      })
    );
  };

  return (
    <div
      className={classNames(styles.Text, {
        [styles.TextDark]: isDark,
      })}
    >
      <div className={styles.inputContainer}>
        <Input
          value={email}
          onChange={onChangeEmail}
          type={"text"}
          title="Email"
          placeholder="Your email"
        />
      </div>
      <div className={styles.button}>
        <Button title={"Reset"} onClick={onSubmit} type={ButtonType.Primary} />
      </div>
    </div>
  );
};

export default ResetPassword;
