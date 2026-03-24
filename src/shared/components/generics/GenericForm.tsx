/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  useForm,
  type Path,
  type FieldValues,
  FormProvider,
  Controller,
} from "react-hook-form";
import type { IDataSource, IFormField } from "../form/IFormFIeld";
import z from "zod";
import TextField from "../form/TextField";
import { zodResolver } from "@hookform/resolvers/zod";
import Select from "../form/Select";
import { useRef, useState } from "react";
import DatePicker from "../form/DatePicker";
import TextArea from "../form/TextArea";
import FileUpload from "../form/FileUpload";
import Button from "../global/Button";
import MultipleSelect from "../form/MultipleSelect";
import api from "../../../api/axios";
import { useDialog } from "../../../app/stores/dialogStore";
import { useToast } from "../../../app/stores/toastMessageStore";
import type { ValidationErrorType } from "../../../types/ValidationType";

type FormEndpoints = {
  search?: string;
  paging?: boolean;
  add?: string;
  update?: string;
  delete?: string;
};
type FormProps<T extends z.ZodObject<any>> = {
  title?: string;
  submitBtnText?: string;
  validation: T;
  fields: Array<IFormField<z.infer<T>>>;
  onSubmitAction?: (data: z.infer<T>) => void;
  onReset?: (data: z.infer<T>) => void;
  defaultValues?: Partial<z.infer<T>>;
  children?: React.ReactNode;
  endpoints?: FormEndpoints;
  shouldConfirmSubmit?: boolean;
  onSuccess?: (resp: any) => void;
  onError?: (error: any) => void;
  isIndependent?: boolean;
  shouldResetAfterSubmit?: boolean;
  isFullBtnsWidth?: boolean;
};

const GenericForm = <T extends z.ZodObject<any>>({
  title,
  submitBtnText,
  validation,
  fields,
  onSubmitAction,
  onReset,
  defaultValues,
  children,
  endpoints,
  shouldConfirmSubmit,
  onSuccess,
  onError,
  isIndependent = true,
  shouldResetAfterSubmit = true,
  isFullBtnsWidth = false,
}: FormProps<T>) => {
  // KLJUČ: Eksplicitno reci da je FormData tipa FieldValues
  type FormData = z.infer<T> & FieldValues;

  const [serverErrors, setServerErrors] = useState<string[]>();

  const formRef = useRef<HTMLFormElement>(null);

  const methods = useForm<FormData>({
    resolver: zodResolver(validation) as any, // "as any" ovde rešava interni nesklad verzija zod/resolver-a
    defaultValues: defaultValues as any,
  });

  const { showConfirmation } = useDialog();
  const { setErrorToast, hideToast } = useToast();

  const onSubmit = async (data: FormData) => {
    hideToast();
    if (shouldConfirmSubmit) {
      await showConfirmation(
        "Form submiting",
        "Are you sure you want to submit the form?",
        async () => {
          await submit(data);
        },
      );
    } else {
      await submit(data);
    }
  };

  const submit = async (data: FormData) => {
    console.log(data);

    setServerErrors(undefined);
    try {
      if (endpoints) {
        let resp;
        if (endpoints.search) {
          if (endpoints.search) {
            const filteredEntries = Object.entries(data).filter(([, value]) => {
              return (
                value !== "" &&
                value !== null &&
                value !== undefined &&
                value !== 0
              );
            });

            const cleanParams = Object.fromEntries(filteredEntries);
            resp = await api.get(endpoints.search, { params: cleanParams });
          }
        }
        if (endpoints.add) {
          resp = await api.post(endpoints.add, data);
        }
        if (endpoints.delete) {
          resp = await api.delete(endpoints.delete, data);
        }
        // OVO NIJE POTPUNO ISPRAVNO
        if (endpoints.update) {
          resp = await api.put(endpoints.update, data);
        }
        if (shouldResetAfterSubmit) methods.reset();
        if (onSuccess) onSuccess(resp);
      }
      if (onSubmitAction) onSubmitAction(data);
    } catch (err: any) {
      console.log(err);
      setErrorToast("Something went wrong, check your data");
      if (err?.response?.status == 422) {
        setServerErrors(
          err.response.data.map((errObj: ValidationErrorType) => errObj.error),
        );
      }
      if (onError) onError(err);
    }
  };

  const onErrors = (errors: any) => {
    console.log("ERRORS");
    console.log(errors);
    const currentValues = methods.getValues();
    console.log(currentValues);

    setServerErrors(undefined);
    setErrorToast("There are some invalid inputs");
  };

  const formFields = fields.map((propField) => {
    // Koristimo Path<FormData> za tipizaciju imena
    const fieldName = propField.name as unknown as Path<FormData>;
    let formField = (
      <TextField<FormData>
        key={String(propField.name)}
        type={propField.textFieldType ?? "text"}
        label={propField.label}
        name={fieldName}
        register={methods.register}
        errors={methods.formState.errors}
      />
    );

    switch (propField.type) {
      case "select":
        formField = (
          <Controller
            name={fieldName}
            control={methods.control}
            render={({ field }) => (
              <Select<FormData>
                {...field}
                key={String(propField.name)}
                label={propField.label}
                name={fieldName}
                errors={methods.formState.errors}
                shouldSort={propField.shouldSortSelectOptions}
                dataSource={
                  {
                    url: propField.dataSource?.url,
                    propertyTitleName: propField.dataSource?.propertyTitleName,
                    propertyValueName: propField.dataSource?.propertyValueName,
                  } as IDataSource
                }
                options={propField.options}
              />
            )}
          />
        );
        break;
      case "multiSelect":
        formField = (
          <MultipleSelect<FormData>
            key={String(propField.name)}
            label={propField.label}
            name={fieldName}
            control={methods.control}
            errors={methods.formState.errors}
            dataSource={
              {
                url: propField.dataSource?.url,
                propertyTitleName: propField.dataSource?.propertyTitleName,
                propertyValueName: propField.dataSource?.propertyValueName,
              } as IDataSource
            }
            options={propField.options}
          />
        );
        break;
      case "datePicker":
        formField = (
          <DatePicker<FormData>
            key={String(propField.name)}
            label={propField.label}
            name={fieldName}
            register={methods.register}
            errors={methods.formState.errors}
            dateTimeType={propField.dateType ?? "date"}
          />
        );
        break;
      case "textArea":
        formField = (
          <TextArea<FormData>
            key={String(propField.name)}
            label={propField.label}
            name={fieldName}
            register={methods.register}
            errors={methods.formState.errors}
            rows={propField.rows}
          />
        );
        break;
      case "file":
        formField = (
          <FileUpload<FormData>
            key={String(propField.name)}
            label={propField.label}
            name={fieldName}
            errors={methods.formState.errors}
            multiple={propField.multiple}
            accept={propField.accept}
            setValue={methods.setValue}
          />
        );
        break;
    }

    return (
      <div
        key={"div" + String(propField.name)}
        className="field-generic-wrapper"
        style={
          {
            "--cols": propField.cols ?? 50,
            "--offset-left": propField.rowOffsetLeft ?? 0,
            "--offset-right": propField.rowOffsetRight ?? 0,
          } as React.CSSProperties
        }
      >
        {formField}
      </div>
    );
  });

  const handleReset = () => {
    if (formRef.current) {
      Array.from(formRef.current.children).forEach((x) => {
        const child = x.childNodes[0] as HTMLElement;
        if (child) {
          Array.from(child.childNodes).forEach((node) => {
            if (node instanceof HTMLInputElement && !node.value) {
              child.classList.remove("focused");
            }
          });
        }
      });
    }
    if (onReset) onReset(methods.getValues());
    methods.reset();
  };

  return (
    <FormProvider {...methods}>
      <div className={"bs-form-div " + (isIndependent ? " individual" : "")}>
        {title && <h2>{title}</h2>}
        <form
          ref={formRef}
          className={"bs-form"}
          onSubmit={methods.handleSubmit(onSubmit, onErrors)}
        >
          {formFields}
          <div
            className={
              "buttons " +
              (isIndependent || isFullBtnsWidth ? "w-full" : "dependent-btns")
            }
          >
            <Button
              btnClass="form-btn submit-btn secondary"
              type="submit"
              text={submitBtnText ?? "Submit"}
            />
            <Button
              btnClass="form-btn light"
              text={"Reset"}
              type="button"
              handleClickFunction={handleReset}
            />
          </div>
        </form>
        <div className="extra-content">{children}</div>
        {serverErrors && (
          <div className="error-message">
            {serverErrors.map((err, ind: number) => (
              <div key={ind}>{err}</div>
            ))}
          </div>
        )}
      </div>
    </FormProvider>
  );
};

export default GenericForm;
