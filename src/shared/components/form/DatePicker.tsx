import { useState } from "react";
import {
  get,
  useFormContext,
  type FieldErrors,
  type FieldValues,
  type Path,
  type UseFormRegister,
} from "react-hook-form";

type DatePickerProps<T extends FieldValues> = {
  name: Path<T>;
  label: string;
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
};

// ZA OVO IMA REACT DATE PICKER
const DatePicker = <T extends FieldValues>({
  name,
  label,
  register,
  errors,
}: DatePickerProps<T>) => {
  const error = get(errors, name);
  const { watch } = useFormContext<T>();
  const val = watch(name);
  const [focused, setFocused] = useState(!!val);

  return (
    <>
      <div className={(focused ? "focused" : "") + " form-field"}>
        <label htmlFor={String(name)}>{label}: </label>
        <input
          type="date"
          {...register(name)}
          name={String(name)}
          id={String(name)}
          onFocus={() => setFocused(true)}
          onBlur={(e) => {
            if (!e.currentTarget.value) setFocused(false);
          }}
        />
      </div>
      {error && <div className="error-message">{error.message as string}</div>}
    </>
  );
};

export default DatePicker;
