import React, { ChangeEvent, FC, KeyboardEvent } from "react";
import classNames from "classnames";
import styles from "./Input.module.scss";

type InputProps = {
  value: string;
  onChange: (value: string) => void;
  onKeyDown?: (event: KeyboardEvent<HTMLInputElement>) => void;
  title?: string;
  placeholder: string;
  disabled?: boolean;
  errorText?: string;
  type?: string;
  inputClassName?: string;
  onBlur?: () => void
};
const Input: FC<InputProps> = ({
  value,
  onChange,
  title,
  type,
  placeholder,
  disabled,
  errorText,
  inputClassName,
  onKeyDown,
  onBlur,
}) => {
  const onChangeText = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <div className={styles.container}>
      {title && <div className={styles.title}>{title}</div>}
      <input
        value={value}
        className={classNames(styles.input, inputClassName, {
          [styles.disabled]: disabled,
          [styles.valid]: errorText,
        })}
        placeholder={placeholder}
        onKeyDown={onKeyDown}
        onChange={onChangeText}
        onBlur={onBlur}
        disabled={disabled}
        type={type}
      />
      {errorText && <div className={styles.validText}>{errorText}</div>}
    </div>
  );
};

export default Input;
