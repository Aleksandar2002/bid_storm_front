/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Controller,
  get,
  type Control,
  type FieldErrors,
  type FieldValues,
  type Path,
} from "react-hook-form";
import type { IDataSource, ISelectOption } from "./IFormFIeld";
import api from "../../../api/axios";
import { useEffect, useState } from "react";

type TextFieldProps<T extends FieldValues> = {
  name: Path<T>;
  label: string;
  control: Control<T>;
  errors: FieldErrors<T>;
  options?: Array<ISelectOption>;
  dataSource: IDataSource;
};

const MultipleSelect = <T extends FieldValues>({
  name,
  label,
  control,
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
      <label htmlFor={String(name)} className="fixed-label ">
        {label}
      </label>
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, value, ref } }) => (
          <select
            ref={ref}
            multiple
            value={Array.isArray(value) ? value : []}
            onChange={(e) => {
              const selectedValues = Array.from(e.target.selectedOptions).map(
                (o) => Number(o.value),
              );
              onChange(selectedValues);
            }}
            id={String(name)}
          >
            {optionsState.map((x) => (
              <option key={x.value as any} value={x.value as any}>
                {x.title}
              </option>
            ))}
          </select>
        )}
      />
      {error && (
        <div className="error-message">
          {Array.isArray(error) ? error[0]?.message : (error.message as string)}
        </div>
      )}
    </div>
  );
};

export default MultipleSelect;
