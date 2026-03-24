import React from "react";
import { Outlet } from "react-router";
import SharedGlobalComponents from "./SharedGlobalComponents";
import UnauthorizedHeader from "../shared/components/global/UnauthorizedHeader";

function GuestLayout() {
  return (
    <div>
      <div className="absolute w-full">
        <UnauthorizedHeader />
      </div>
      <div className="guest-div">
        <Outlet />
        <SharedGlobalComponents />
      </div>
    </div>
  );
}

export default GuestLayout;
