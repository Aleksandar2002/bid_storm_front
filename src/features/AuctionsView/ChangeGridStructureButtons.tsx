import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "../../shared/components/global/Button";

type ChangeGridStructureButtonsProps = {
  value: number;
  onChange: (val: number) => void;
};

const ChangeGridStructureButtons = ({
  onChange,
  value,
}: ChangeGridStructureButtonsProps) => {
  return (
    <div className="mr-2">
      <Button
        btnClass={"mr-2 " + (value == 2 ? "back-secondary" : "")}
        handleClickFunction={() => onChange(2)}
      >
        <FontAwesomeIcon icon={"grip"} />
      </Button>
      <Button
        btnClass={value == 1 ? "back-secondary" : ""}
        handleClickFunction={() => onChange(1)}
      >
        <FontAwesomeIcon icon={"bars"} />
      </Button>
    </div>
  );
};

export default ChangeGridStructureButtons;
