import { useContext } from "react";
import HubsContext from "./hubsContext";

export const useHubs = () => useContext(HubsContext);
