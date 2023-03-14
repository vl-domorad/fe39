import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import classNames from "classnames";

import styles from "./SignIn.module.scss";
import Title from "../../components/Title";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { Theme, useThemeContext } from "../../context/Theme/Context";
import { RoutesList } from "../Router";
import { ButtonType } from "../../utils/@globalTypes";

const SingIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onChangeEmail = (value: string) => {
    setEmail(value);
  };
  const onChangePassword = (value: string) => {
    setPassword(value);
  };

  const { theme } = useThemeContext();
  const isDark = theme === Theme.Dark;

  return (
    <div>
      <div
        className={classNames(styles.backHome, {
          [styles.backHomeDark]: isDark,
        })}
      >
        Back to home
      </div>
      <div className={classNames(styles.title)}>
        <Title title={"Sing In"} />
      </div>
      <div className={styles.wrapper}>
        <div
          className={classNames(styles.inputContainer, {
            [styles.inputContainerDark]: isDark,
          })}
        >
          <Input
            value={email}
            onChange={onChangeEmail}
            type={"text"}
            title="Email"
            placeholder="Your email"
          />
          <Input
            value={password}
            onChange={onChangePassword}
            type={"password"}
            title="Password"
            placeholder="Your password"
          />
          <div
            className={classNames(styles.forgotPassword, {
              [styles.darkThemeForgotPassword]: isDark,
            })}
          >
            Forgot password?
          </div>
          <div className={styles.button}>
            <Button
              title={"Sign In"}
              onClick={() => {}}
              type={ButtonType.Primary}
            />
          </div>
          <div
            className={classNames(styles.singUp, {
              [styles.darkSingUp]: isDark,
            })}
          >
            Don’t have an account?{" "}
            <NavLink to={RoutesList.SignUp} className={styles.navButton}>
              Sign Up
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingIn;
