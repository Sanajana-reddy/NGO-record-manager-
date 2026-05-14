import { useNavigate } from "react-router-dom";
const Dashboard = () => {
    const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div style={{ padding: "30px" }}>
      <h1>NGO Dashboard</h1>

      <h2>Welcome, {user?.name}</h2>

      <p>Email: {user?.email}</p>

      <p>Role: {user?.role}</p>
      <button onClick={() => navigate("/submit-report")}>
    Submit Report
        </button>
        <button onClick={() => navigate("/my-reports")}>
    My Reports
        </button>

        
    </div>
  );
};

export default Dashboard;