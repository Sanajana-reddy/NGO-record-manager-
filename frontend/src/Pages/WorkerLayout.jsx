import { Outlet } from "react-router-dom";
import WorkerNavbar from "../Components/WorkerNavbar";
import WorkerSidebar from "../Components/WorkerSidebar";

const WorkerLayout = () => {
  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        background: "#f8f9fa",
      }}
    >
      <WorkerSidebar />
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          minWidth: 0,
        }}
      >
        <WorkerNavbar />
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

export default WorkerLayout;
