import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./Pages/Login";
import Dashboard from "./Pages/Dashboard";
import SubmitReport from "./Pages/SubmitReport";
import MyReports from "./Pages/MyReports";

import AdminLayout from "./Pages/admin/AdminLayout";
import AdminOverview from "./Pages/admin/AdminOverview";
import AllReports from "./Pages/admin/AllReports";
import Analytics from "./Pages/admin/Analytics";
import AISummary from "./Pages/admin/AISummary";

import ProtectedAdminRoute from "./Components/ProtectedAdminRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/submit-report" element={<SubmitReport />} />
        <Route path="/my-reports" element={<MyReports />} />

        <Route
          path="/admin-dashboard"
          element={
            <ProtectedAdminRoute>
              <AdminLayout />
            </ProtectedAdminRoute>
          }
        >
          <Route index element={<AdminOverview />} />
          <Route path="reports" element={<AllReports />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="ai-summary" element={<AISummary />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
