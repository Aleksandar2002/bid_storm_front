import React, { type ReactNode } from "react";

type ButtonProps = {
  btnClass?: string;
  text?: string;
  type?: "button" | "submit" | "reset";
  handleClickFunction?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  children?: ReactNode;
  disabled?: boolean;
};

const Button = ({
  btnClass,
  text,
  handleClickFunction,
  type,
  children,
  disabled,
}: ButtonProps) => {
  return (
    <>
      <button
        className={btnClass}
        disabled={disabled}
        type={type ?? "button"}
        onClick={handleClickFunction}
      >
        {children ?? text}
      </button>
    </>
  );
};

export default Button;
