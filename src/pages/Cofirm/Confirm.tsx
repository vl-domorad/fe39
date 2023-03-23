import React from "react";
import { useDispatch } from "react-redux";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import classNames from "classnames";

import Title from "src/components/Title";
import Button from "src/components/Button";
import { ButtonType } from "src/utils/@globalTypes";
import { activateUser } from "src/redux/reducers/authSlice";
import { Theme, useThemeContext } from "src/context/Theme/Context";
import { RoutesList } from "../Router";
import styles from "./Confirm.module.scss";

const Confirm = () => {
  const { theme } = useThemeContext();
  const isDark = theme === Theme.Dark;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { uid, token } = useParams();
  const onConfirmButtonClick = () => {
    if (uid && token) {
      dispatch(
        activateUser({
          data: { uid, token },
          callback: () => navigate(RoutesList.Success),
        })
      );
    }
  };

  return (
    <div>
      <div
        className={classNames(styles.container, {
          [styles.containerDark]: isDark,
        })}
      >
        <NavLink
          to={RoutesList.Home}
          className={classNames(styles.backHome, {
            [styles.backHomeDark]: isDark,
          })}
        >
          Back to home
        </NavLink>
        <div className={classNames(styles.title)}>
          <Title title={"Registration Confirmation"} />
        </div>
        <div className={styles.wrapper}>
          <div
            className={classNames(styles.emailText, {
              [styles.emailTextDark]: isDark,
            })}
          >
            {" "}
            Please activate your account with the activation link in the email.
            Please, check your email
            <div className={styles.button}>
              <Button
                title={"Confirm"}
                onClick={onConfirmButtonClick}
                type={ButtonType.Primary}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Confirm;
