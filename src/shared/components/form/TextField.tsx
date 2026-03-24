/* eslint-disable @typescript-eslint/no-explicit-any */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { get, useFormContext, type Path } from "react-hook-form";

import type {
  FieldErrors,
  FieldValues,
  UseFormRegister,
} from "react-hook-form";
import Button from "../global/Button";

type TextFieldProps<T extends FieldValues> = {
  type?: string;
  name: Path<T>;
  label: string;
  register?: UseFormRegister<T>;
  errors?: FieldErrors<T>;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const TextField = <T extends FieldValues>({
  type = "text",
  name,
  label,
  register,
  errors,
  value,
  onChange,
}: TextFieldProps<T>) => {
  const error = get(errors, name);
  const formContext = useFormContext<T>();
  const watchVal = formContext?.watch
    ? formContext.watch(name as Path<T>)
    : undefined;

  const currentVal = watchVal ?? value ?? "";

  const [inputType, setType] = useState(type);

  const [isCurrentlyFocused, setIsCurrentlyFocused] = useState(false);
  const shouldFloat =
    isCurrentlyFocused ||
    (currentVal !== "" && currentVal !== null && currentVal !== undefined);

  const handleShowPassword = (e: any) => {
    e.preventDefault();
    if (inputType == "password") {
      setType("text");
      return;
    }
    setType("password");
  };
  const registeredProps = register ? register(name as Path<T>) : {};
  const {
    onBlur: registerOnBlur,
    onChange: registerOnChange,
    ...registerRest
  } = registeredProps as any;
  return (
    <>
      <div
        className={`form-field ${shouldFloat ? "focused" : ""} ${error ? "invalid-input-field" : ""}`}
      >
        <label htmlFor={String(name)}>{label}: </label>
        <input
          {...registerRest}
          type={inputType}
          name={String(name)}
          id={String(name)}
          value={value}
          onFocus={() => setIsCurrentlyFocused(true)}
          onBlur={(e) => {
            if (registerOnBlur) registerOnBlur(e);
            setIsCurrentlyFocused(false);
          }}
          onChange={(e) => {
            if (registerOnChange) registerOnChange(e);
            if (onChange) onChange(e);
          }}
        />
        {type == "password" && (
          <Button
            btnClass="show-password"
            handleClickFunction={handleShowPassword}
          >
            {inputType == "password" && <FontAwesomeIcon icon={"eye"} />}
            {inputType == "text" && <FontAwesomeIcon icon={"eye-slash"} />}
          </Button>
        )}
      </div>
      {error && (
        <div className="error-message">
          {Array.isArray(error) ? error[0]?.message : (error.message as string)}
        </div>
      )}
    </>
  );
};

export default TextField;
