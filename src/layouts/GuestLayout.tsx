import React from "react";
import { Outlet } from "react-router";

function GuestLayout() {
  return (
    <div className="guest-div">
      <Outlet />
    </div>
  );
}

export default GuestLayout;
