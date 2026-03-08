/* eslint-disable @typescript-eslint/no-explicit-any */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { get, useFormContext, type Path } from "react-hook-form";

import type {
  FieldErrors,
  FieldValues,
  UseFormRegister,
} from "react-hook-form";

type TextFieldProps<T extends FieldValues> = {
  type: string;
  name: Path<T>;
  label: string;
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
};

const TextField = <T extends FieldValues>({
  type,
  name,
  label,
  register,
  errors,
}: TextFieldProps<T>) => {
  const error = get(errors, name);
  const { watch } = useFormContext<T>();
  const val = watch(name);
  const [focused, setFocused] = useState(!!val);
  const [inputType, setType] = useState(type);

  const handleShowPassword = (e: any) => {
    e.preventDefault();
    if (inputType == "password") {
      setType("text");
      return;
    }
    setType("password");
  };

  return (
    <>
      <div className={(focused ? "focused" : "") + " form-field"}>
        <label htmlFor={String(name)}>{label}: </label>
        <input
          {...register(name)}
          type={inputType}
          name={String(name)}
          id={String(name)}
          onFocus={() => setFocused(true)}
          onBlur={(e) => {
            if (!e.currentTarget.value) setFocused(false);
          }}
        />
        {type == "password" && (
          <button className="show-password" onClick={handleShowPassword}>
            {inputType == "password" && <FontAwesomeIcon icon={"eye"} />}
            {inputType == "text" && <FontAwesomeIcon icon={"eye-slash"} />}
          </button>
        )}
      </div>
      {error && <div className="error-message">{error.message as string}</div>}
    </>
  );
};

export default TextField;
