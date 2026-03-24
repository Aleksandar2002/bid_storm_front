import React, { useState } from "react";
import {
  get,
  useFormContext,
  type FieldErrors,
  type FieldValues,
  type Path,
  type UseFormRegister,
} from "react-hook-form";

type TextAreaProps<T extends FieldValues> = {
  name: Path<T>;
  label: string;
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
  rows?: number;
};

const TextArea = <T extends FieldValues>({
  name,
  label,
  register,
  errors,
  rows,
}: TextAreaProps<T>) => {
  const error = get(errors, name);
  const { watch } = useFormContext<T>();
  const val = watch(name);
  const [isCurrentlyFocused, setIsCurrentlyFocused] = useState(false);
  const shouldFloat =
    isCurrentlyFocused || (val !== "" && val !== null && val !== undefined);

  const { onBlur: registerOnBlur, ...registerRest } = register(name);
  return (
    <>
      <div
        className={`form-field ${shouldFloat ? "focused" : ""} ${error ? "invalid-input-field" : ""}`}
      >
        <label htmlFor={String(name)}>{label}: </label>
        <textarea
          rows={rows ? rows : 3}
          {...registerRest}
          name={String(name)}
          id={String(name)}
          onFocus={() => setIsCurrentlyFocused(true)}
          onBlur={(e) => {
            registerOnBlur(e);
            setIsCurrentlyFocused(false);
          }}
        />
      </div>
      {error && (
        <div className="error-message">
          {Array.isArray(error) ? error[0]?.message : (error.message as string)}
        </div>
      )}
    </>
  );
};

export default TextArea;
