import {
  get,
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
  dateTimeType: "date" | "datetime-local" | "";
};

// ZA OVO IMA REACT DATE PICKER
const DatePicker = <T extends FieldValues>({
  name,
  label,
  register,
  errors,
  dateTimeType,
}: DatePickerProps<T>) => {
  const error = get(errors, name);

  return (
    <>
      <div className={"form-field" + (error ? " invalid-input-field" : "")}>
        <label htmlFor={String(name)} className="fixed-label ">
          {label}:{" "}
        </label>
        <input
          type={dateTimeType ?? "date"}
          {...register(name)}
          name={String(name)}
          id={String(name)}
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

export default DatePicker;
