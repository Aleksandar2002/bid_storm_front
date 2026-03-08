export interface IFormField<T> {
  id?: string;
  name: keyof T;
  label: string;
  value?: unknown;
  type: string;
  options?: Array<ISelectOption>;
  dataSource?: IDataSource;
  textFieldType?: string;
  cols?: number;
  rowOffsetRight?: number;
  rowOffsetLeft?: number;
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
