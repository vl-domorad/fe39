import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import classNames from "classnames";
import { useDispatch } from "react-redux";

import styles from "./SignIn.module.scss";
import Title from "../../components/Title";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { Theme, useThemeContext } from "src/context/Theme/Context";
import { RoutesList } from "../Router";
import { ButtonType } from "src/utils/@globalTypes";
import { signInUser } from "src/redux/reducers/authSlice";

const SingIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

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

  const onSignInClick = () => {
    dispatch(
      signInUser({
        data: { email, password },
        callback: () => navigate(RoutesList.Home),
      })
    );
  };

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
              onClick={onSignInClick}
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
