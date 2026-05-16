import { NavLink } from "react-router-dom";

const WorkerSidebar = () => {
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
      <h2 style={{ margin: 0 }}>Worker Portal</h2>

      <nav
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "8px",
          marginTop: "30px",
        }}
      >
        <NavLink to="/dashboard" end style={linkStyle}>
          Dashboard
        </NavLink>

        <NavLink to="/dashboard/profile" style={linkStyle}>
          Profile
        </NavLink>

        <NavLink to="/dashboard/submit-report" style={linkStyle}>
          Submit Report
        </NavLink>

        <NavLink to="/dashboard/my-reports" style={linkStyle}>
          View My Reports
        </NavLink>

        <NavLink to="/dashboard/beneficiaries" style={linkStyle}>
          Add Beneficiaries
        </NavLink>
      </nav>
    </aside>
  );
};

export default WorkerSidebar;
