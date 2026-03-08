/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  get,
  type FieldErrors,
  type FieldValues,
  type Path,
  type UseFormRegister,
} from "react-hook-form";
import type { IDataSource, ISelectOption } from "./IFormFIeld";
import api from "../../../api/axios";
import { useEffect, useState } from "react";

type TextFieldProps<T extends FieldValues> = {
  name: Path<T>;
  label: string;
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
  options?: Array<ISelectOption>;
  dataSource: IDataSource;
};

const Select = <T extends FieldValues>({
  name,
  label,
  register,
  errors,
  options,
  dataSource,
}: TextFieldProps<T>) => {
  const error = get(errors, name);
  const [optionsState, setOptions] = useState(options ?? []);

  useEffect(() => {
    const fetchData = async () => {
      if (dataSource.url) {
        const resp = await api.get(dataSource.url);
        const data = resp.data;
        if (dataSource.propertyTitleName || dataSource.propertyValueName) {
          const titleProp = dataSource.propertyTitleName ?? "title";
          const valueProp = dataSource.propertyValueName ?? "value";
          console.log(valueProp);

          setOptions(
            data.map((x: any) => ({
              title: x[titleProp],
              value: x[valueProp],
            })),
          );
        } else {
          setOptions(data as ISelectOption[]);
        }
      }
    };
    fetchData();
  }, [
    dataSource.url,
    dataSource.propertyTitleName,
    dataSource.propertyValueName,
  ]);

  return (
    <div className="form-field">
      {optionsState && optionsState.length > 0 && (
        <select
          {...register(name, {
            setValueAs: (v) => Number(v),
          })}
          name={String(name)}
          id={String(name)}
        >
          <option value="0">{label}</option>
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
        <span className="error-message">{error.message as string}</span>
      )}
    </div>
  );
};

export default Select;
