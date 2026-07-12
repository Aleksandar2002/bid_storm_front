import React from "react";
import type { SortingType } from "../../../features/AuctionsView/data/sortingOptions";
import Select from "../form/Select";
import type { ISelectOption } from "../form/IFormFIeld";

type SortingSelectProps = {
  options: ISelectOption[];
  onChange: (val: string) => void;
  defaultValue: string;
};

const SortingSelect = ({
  options,
  onChange,
  defaultValue,
}: SortingSelectProps) => {
  return (
    <div className="flexbox">
      <Select<SortingType>
        label="Sorting type"
        value={String(defaultValue)}
        name={"sortingType"}
        onChange={(val) => onChange(String(val))}
        options={options}
        hasDefaultOption={false}
        selectClass="structure-select"
        shouldReturnNumber={false}
      />
    </div>
  );
};

export default SortingSelect;
