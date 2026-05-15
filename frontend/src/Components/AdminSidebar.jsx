import { NavLink } from "react-router-dom";

const AdminSidebar = () => {
  const linkStyle = ({ isActive }) => ({
    color: isActive ? "#1971c2" : "#212529",
    fontWeight: isActive ? 700 : 500,
    textDecoration: "none",
    padding: "10px 12px",
    borderRadius: "6px",
    background: isActive ? "#e7f5ff" : "transparent",
  });

  return (
    <aside
      style={{
        width: "250px",
        minHeight: "100vh",
        background: "#ffffff",
        borderRight: "1px solid #dee2e6",
        padding: "20px",
        flexShrink: 0,
      }}
    >
      <h2 style={{ margin: 0 }}>NGO Admin</h2>

      <nav
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "8px",
          marginTop: "30px",
        }}
      >
        <NavLink to="/admin-dashboard" end style={linkStyle}>
          Overview
        </NavLink>

        <NavLink to="/admin-dashboard/reports" style={linkStyle}>
          Reports
        </NavLink>

        <NavLink to="/admin-dashboard/analytics" style={linkStyle}>
          Analytics
        </NavLink>

        <NavLink to="/admin-dashboard/workers" style={linkStyle}>
          Field Workers
        </NavLink>

        <NavLink to="/admin-dashboard/ai-summary" style={linkStyle}>
          AI Summary
        </NavLink>

      </nav>
    </aside>
  );
};

export default AdminSidebar;
