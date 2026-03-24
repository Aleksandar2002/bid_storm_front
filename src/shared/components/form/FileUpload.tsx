/* eslint-disable @typescript-eslint/no-explicit-any */
import type React from "react";
import {
  get,
  useFormContext,
  type FieldErrors,
  type FieldValues,
  type Path,
  type UseFormSetValue,
} from "react-hook-form";
import { uploadFile } from "../../../app/services/filesService";
import ImageGrid from "../media/ImageGrid";
import type { Image } from "../../../types/Image";

type TextFieldProps<T extends FieldValues> = {
  name: Path<T>;
  label: string;
  errors: FieldErrors<T>;
  multiple?: boolean;
  accept?: string;
  setValue: UseFormSetValue<T>;
};

const FileUpload = <T extends FieldValues>({
  label,
  name,
  errors,
  accept,
  multiple = true,
  setValue,
}: TextFieldProps<T>) => {
  const error = get(errors, name);

  const { watch } = useFormContext();
  const fileNames: string[] = watch(name) || [];

  const images: Image[] = fileNames.map((src) => ({
    src,
    alt: src,
  }));

  const handleOnChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length) {
      const uploadedNames = await uploadFile(files);

      // Ako je multiple, dodajemo na postojeće, ako nije, menjamo
      // const newValue = multiple
      //   ? [...fileNames, ...uploadedNames]
      //   : uploadedNames;
      const newValue = uploadedNames;

      setValue(name, newValue as any, { shouldValidate: true });
    }
    e.target.value = "";
  };
  const handleImageRemove = (newImage: string) => {
    const updatedNames = fileNames.filter((src) => src !== newImage);
    setValue(name, updatedNames as any, { shouldValidate: true });
  };

  return (
    <>
      <div className={" form-field" + (error ? " invalid-input-field" : "")}>
        <label className="fixed-label" htmlFor={String(name)}>
          {label}:{" "}
        </label>
        <input
          type="file"
          name={String(name)}
          id={String(name)}
          multiple={multiple}
          accept={accept}
          onChange={handleOnChange}
        />
      </div>
      <ImageGrid
        images={images}
        removable={true}
        onImageRemove={handleImageRemove}
        isTempFiles={true}
      />
      {error && (
        <div className="error-message">
          {Array.isArray(error) ? error[0]?.message : (error.message as string)}
        </div>
      )}
    </>
  );
};

export default FileUpload;
