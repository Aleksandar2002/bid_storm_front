import React from "react";
import { Outlet } from "react-router";
import Header from "../shared/components/Header";
import Footer from "../shared/components/Footer";

function UserLayout() {
  return (
    <div>
      <Header />
      <main>
        <div className="wrapper">
          <Outlet />
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default UserLayout;
