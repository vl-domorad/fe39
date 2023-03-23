import React, { useMemo, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";

import Button from "../../../components/Button";
import { CloseIcon, OpenedMenu, UserIcon } from "src/assets/icons";
import UserName from "../../../components/UserName";
import ThemeSwitcher from "../../../components/ThemeSwitcher";
import { RoutesList } from "../../Router";
import styles from "./Header.module.scss";
import classNames from "classnames";
import { ButtonType } from "src/utils/@globalTypes";
import { useDispatch, useSelector } from "react-redux";
import { AuthSelectors, logoutUser } from "src/redux/reducers/authSlice";

const Header = () => {
  const [isOpened, setOpened] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const isLoggedIn = useSelector(AuthSelectors.getLoggedIn);
  const dispatch = useDispatch();

  const onClickMenuButton = () => {
    setOpened(!isOpened);
  };

  const onAuthButtonClick = () => {
    navigate(RoutesList.SignIn);
  };

  const onLogoutClick = () => {
    dispatch(logoutUser());
  };

  const navButtonsList = useMemo(
    () => [
      {
        title: "Home",
        key: RoutesList.Home,
      },
      ...(!isLoggedIn
        ? []
        : [
            {
              title: "Add Post",
              key: RoutesList.AddPost,
            },
          ]),
    ],
    [isLoggedIn]
  );

  return (
    <>
      <div className={styles.container}>
        <Button
          title={isOpened ? <CloseIcon /> : <OpenedMenu />}
          onClick={onClickMenuButton}
          type={ButtonType.Primary}
          className={styles.button}
        />
        {isLoggedIn ? (
          <UserName username={"Artem Malkin"} />
        ) : (
          <Button
            title={<UserIcon />}
            onClick={onAuthButtonClick}
            type={ButtonType.Primary}
            className={styles.button}
          />
        )}
      </div>
      {isOpened && (
        <div className={styles.menuContainer}>
          <div className={styles.actionsContainer}>
            {isLoggedIn && <UserName username={"Artem Malkin"} />}
            {navButtonsList.map(({ key, title }) => {
              return (
                <NavLink
                  to={key}
                  key={key}
                  className={classNames(styles.navButton, {
                    [styles.activeNavButton]: location.pathname === key,
                  })}
                >
                  {title}
                </NavLink>
              );
            })}
          </div>
          <div>
            <ThemeSwitcher />
            <Button
              title={isLoggedIn ? "Log out" : "Sign In"}
              onClick={isLoggedIn ? onLogoutClick : onAuthButtonClick}
              type={ButtonType.Secondary}
              className={styles.authButton}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
