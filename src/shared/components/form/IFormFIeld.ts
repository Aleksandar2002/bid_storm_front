export interface IFormField<T> {
  id?: string;
  name: keyof T;
  label: string;
  value?: unknown;
  type: string;
  textFieldType?: string;
  dateType?: "date" | "datetime-local" | "";
  options?: Array<ISelectOption>;
  dataSource?: IDataSource;
  cols?: number;
  rowOffsetRight?: number;
  rowOffsetLeft?: number;
  multiple?: boolean;
  rows?: number;
  accept?: string;
  shouldSortSelectOptions?: boolean;
}

export interface ISelectOption {
  title: string;
  value: unknown;
}

export interface IDataSource {
  url: string;
  propertyValueName?: string;
  propertyTitleName?: string;
}
