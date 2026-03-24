/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  get,
  type FieldErrors,
  type FieldValues,
  type Path,
} from "react-hook-form";
import type { IDataSource, ISelectOption } from "./IFormFIeld";
import api from "../../../api/axios";
import { useEffect, useState } from "react";

type SelectProps<T extends FieldValues> = {
  name: Path<T>;
  label?: string;
  // register: UseFormRegister<T>;
  errors?: FieldErrors<T>;
  options?: Array<ISelectOption>;
  dataSource?: IDataSource;
  value: string | number;
  onChange: (newVal: string | number) => void;
  shouldReturnNumber?: boolean;
  hasDefaultOption?: boolean;
  selectClass?: string;
  shouldSort?: boolean;
};

const Select = <T extends FieldValues>({
  name,
  label,
  // register,
  errors,
  options,
  dataSource,
  value,
  onChange,
  shouldReturnNumber = true,
  hasDefaultOption = true,
  selectClass,
  shouldSort = true,
}: SelectProps<T>) => {
  const error = get(errors, name);
  const [optionsState, setOptions] = useState(options ?? []);

  const sort = (options: ISelectOption[]): ISelectOption[] => {
    if (shouldSort) {
      options = options.sort((a: any, b: any) =>
        (a.title as string).localeCompare(b.title as string),
      );
    }
    return options;
  };

  useEffect(() => {
    const fetchData = async () => {
      if (dataSource && dataSource.url) {
        const resp = await api.get(dataSource.url);
        const data = resp.data;
        if (dataSource.propertyTitleName || dataSource.propertyValueName) {
          const titleProp = dataSource.propertyTitleName ?? "title";
          const valueProp = dataSource.propertyValueName ?? "value";

          let options: ISelectOption[] = data.map((x: any) => ({
            title: x[titleProp],
            value: x[valueProp],
          }));

          options = sort(options);
          setOptions(options);
        } else {
          const sortedData = sort(data as ISelectOption[]);
          setOptions(sortedData);
        }
      }
    };
    fetchData();
  }, [
    dataSource?.url,
    dataSource?.propertyTitleName,
    dataSource?.propertyValueName,
  ]);

  const handleOnChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    if (shouldReturnNumber && val !== "") {
      onChange(Number(val));
    } else {
      onChange(val);
    }
  };

  return (
    <div className="form-field">
      {label && (
        <label htmlFor={String(name)} className="fixed-label ">
          {label}
        </label>
      )}
      {optionsState && (
        <select
          key={
            (dataSource?.url ? dataSource.url : String(name)) +
            optionsState.length
          }
          className={selectClass ? selectClass : ""}
          // {...register(name, { valueAsNumber: true })}
          name={String(name)}
          id={String(name)}
          onChange={handleOnChange}
          value={value}
        >
          {hasDefaultOption && <option value="">{"Choose an option"}</option>}
          {optionsState.map((x) => {
            return (
              <option key={x.value as any} value={x.value as any}>
                {x.title}
              </option>
            );
          })}
        </select>
      )}
      {error && (
        <div className="error-message">
          {Array.isArray(error) ? error[0]?.message : (error.message as string)}
        </div>
      )}
    </div>
  );
};

export default Select;
