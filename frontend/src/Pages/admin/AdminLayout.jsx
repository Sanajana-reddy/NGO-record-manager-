import { Outlet } from "react-router-dom";
import AdminSidebar from "../../Components/AdminSidebar";
import AdminNavbar from "../../Components/AdminNavbar";

const AdminLayout = () => {
  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        background: "#f8f9fa",
      }}
    >
      <AdminSidebar />
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          minWidth: 0,
        }}
      >
        <AdminNavbar />
        <div
          style={{
            padding: "20px",
            flex: 1,
          }}
        >
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
