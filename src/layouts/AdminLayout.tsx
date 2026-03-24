import { Outlet } from "react-router";
import Header from "../shared/components/global/Header";
import DashboardSidebar from "../features/Dashboard/DashboardSidebar";

function AdminLayout() {
  return (
    <div>
      <Header />
      <DashboardSidebar />
      <main className="admin-main">
        <div className="wrapper">
          <Outlet />
        </div>
      </main>
      {/* <Footer /> */}
    </div>
  );
}

export default AdminLayout;
