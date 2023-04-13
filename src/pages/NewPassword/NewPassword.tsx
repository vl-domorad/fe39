import React, { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import styles from "./NewPassword.module.scss";
import Input from "src/components/Input";
import Button from "src/components/Button";
import { ButtonType } from "src/utils/@globalTypes";
import { newPassword } from "src/redux/reducers/authSlice";
import { useDispatch } from "react-redux";
import { RoutesList } from "src/pages/Router";

const NewPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const { uid, token } = useParams();

  console.log(uid, token);

  const onChangePassword = (value: string) => {
    setPassword(value);
  };
  const onChangeConfirmPassword = (value: string) => {
    setConfirmPassword(value);
  };

  useEffect(() => {
    if (password !== confirmPassword) {
      setPasswordError("Passwords must match");
    } else if (password.length === 0 || confirmPassword.length === 0) {
      setPasswordError("Password is required field");
    } else {
      setPasswordError("");
    }
  }, [confirmPassword, password]);

  const isValid = useMemo(() => {
    return passwordError.length === 0;
  }, [passwordError]);

  const onSubmit = () => {
    if (uid && token) {
      dispatch(
        newPassword({
          data: { uid, token, new_password: password },
          callback: () => navigate(RoutesList.SignIn),
        })
      );
    }
  };

  return (
    <div className={styles.inputContainer}>
      <Input
        value={password}
        onChange={onChangePassword}
        type={"password"}
        title="Password"
        placeholder="Your password"
        errorText={passwordError}
      />
      <Input
        value={confirmPassword}
        onChange={onChangeConfirmPassword}
        type={"password"}
        title="Confirm password"
        placeholder="Confirm your password"
        errorText={passwordError}
      />

      <div className={styles.button}>
        <Button
          title={"Set password "}
          disabled={!isValid}
          onClick={onSubmit}
          type={ButtonType.Primary}
        />
      </div>
    </div>
  );
};

export default NewPassword;
