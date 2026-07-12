import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "../../../../../shared/components/global/Button";
import type { UserDashboardTable } from "./tableData";

export const UserActions = (row: UserDashboardTable) => {
  const handleBan = (id: number) => {
    console.log("Banning user with ID:", id);
  };

  return (
    <Button btnClass="red" handleClickFunction={() => handleBan(row.id)}>
      <FontAwesomeIcon icon={"ban"} />{" "}
    </Button>
  );
};
