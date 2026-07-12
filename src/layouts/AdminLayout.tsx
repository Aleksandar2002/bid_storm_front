import { Outlet } from "react-router";
import Header from "../shared/components/global/Header";
// import Footer from "../shared/components/global/Footer";
import DashboardSidebar from "../features/Dashboard/DashboardSidebar";
import SharedGlobalComponents from "./SharedGlobalComponents";
import NotificationContext from "../features/Notifications/NotificationContext";

function AdminLayout() {
  return (
    <div className="admin-layout">
      <Header />
      <DashboardSidebar />
      <main className="admin-main">
        <div className="wrapper">
          <Outlet />
        </div>
      </main>
      {/* <Footer /> */}
      <NotificationContext />
      <SharedGlobalComponents />
    </div>
  );
}

export default AdminLayout;
