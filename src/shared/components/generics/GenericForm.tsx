/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  useForm,
  type Path,
  type FieldValues,
  FormProvider,
} from "react-hook-form"; // Dodaj FieldValues
import type { IDataSource, IFormField } from "../form/IFormFIeld";
import z from "zod";
import TextField from "../form/TextField";
import { zodResolver } from "@hookform/resolvers/zod";
import Select from "../form/Select";
import { useRef } from "react";
import DatePicker from "../form/DatePicker";

// Promeni T da bude striktno AnyZodObject
type FormProps<T extends z.ZodObject<any>> = {
  title: string;
  validation: T;
  fields: Array<IFormField<z.infer<T>>>;
  onSubmitAction: (data: z.infer<T>) => void;
  defaultValues?: Partial<z.infer<T>>;
  children?: React.ReactNode;
};

const GenericForm = <T extends z.ZodObject<any>>({
  title,
  validation,
  fields,
  onSubmitAction,
  defaultValues,
  children,
}: FormProps<T>) => {
  // KLJUČ: Eksplicitno reci da je FormData tipa FieldValues
  type FormData = z.infer<T> & FieldValues;

  const formRef = useRef<HTMLFormElement>(null);

  const methods = useForm<FormData>({
    resolver: zodResolver(validation) as any, // "as any" ovde rešava interni nesklad verzija zod/resolver-a
    defaultValues: defaultValues as any,
  });

  const onSubmit = (data: FormData) => {
    onSubmitAction(data);
  };

  const onErrors = (errors: any) => {
    console.log(errors);

    console.log(methods.getValues());
  };

  const formFields = fields.map((field) => {
    // Koristimo Path<FormData> za tipizaciju imena
    const fieldName = field.name as unknown as Path<FormData>;
    let formField = (
      <TextField<FormData>
        key={String(field.name)}
        type={field.textFieldType ?? "text"}
        label={field.label}
        name={fieldName}
        register={methods.register}
        errors={methods.formState.errors}
      />
    );

    switch (field.type) {
      case "select":
        formField = (
          <Select<FormData>
            key={String(field.name)}
            label={field.label}
            name={fieldName}
            register={methods.register}
            errors={methods.formState.errors}
            dataSource={
              {
                url: field.dataSource?.url,
                propertyTitleName: field.dataSource?.propertyTitleName,
                propertyValueName: field.dataSource?.propertyValueName,
              } as IDataSource
            }
            options={field.options}
          />
        );
        break;
      case "datePicker":
        formField = (
          <DatePicker<FormData>
            key={String(field.name)}
            label={field.label}
            name={fieldName}
            register={methods.register}
            errors={methods.formState.errors}
          />
        );
        break;
    }

    return (
      <div
        key={"div" + String(field.name)}
        className="field-generic-wrapper"
        style={
          {
            "--cols": field.cols ?? 50,
            "--offset-left": field.rowOffsetLeft ?? 0,
            "--offset-right": field.rowOffsetRight ?? 0,
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
              console.log(node.value);
              child.classList.remove("focused");
            }
          });
        }
      });
    }
    methods.reset();
  };

  return (
    <FormProvider {...methods}>
      <div className="bs-form-div">
        <h2>{title}</h2>
        <form
          ref={formRef}
          className="bs-form"
          onSubmit={methods.handleSubmit(onSubmit, onErrors)}
        >
          {formFields}
          <input className="submit-btn" type="submit" />
          <input
            className="submit-btn"
            value={"Reset"}
            type="button"
            onClick={handleReset}
          />
        </form>
        <div className="extra-content">{children}</div>
      </div>
    </FormProvider>
  );
};

export default GenericForm;
