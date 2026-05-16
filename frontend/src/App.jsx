import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";

import Login from "./Pages/Login";
import Dashboard from "./Pages/Dashboard";
import SubmitReport from "./Pages/SubmitReport";
import MyReports from "./Pages/MyReports";
import WorkerBeneficiaries from "./Pages/WorkerBeneficiaries";
import WorkerLayout from "./Pages/WorkerLayout";
import WorkerProfile from "./Pages/WorkerProfile";
import AdminLayout from "./Pages/admin/AdminLayout";
import AdminOverview from "./Pages/admin/AdminOverview";
import AllReports from "./Pages/admin/AllReports";
import Analytics from "./Pages/admin/Analytics";
import AISummary from "./Pages/admin/AISummary";
import FieldWorkers from "./Pages/admin/FieldWorkers";
import Beneficiaries from "./Pages/admin/Beneficiaries";
import ProtectedAdminRoute from "./Components/ProtectedAdminRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<WorkerLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="profile" element={<WorkerProfile />} />
          <Route path="submit-report" element={<SubmitReport />} />
          <Route path="my-reports" element={<MyReports />} />
          <Route path="beneficiaries" element={<WorkerBeneficiaries />} />
          <Route path="assigned-beneficiaries" element={<WorkerBeneficiaries />} />
        </Route>
        <Route path="/submit-report" element={<Navigate to="/dashboard/submit-report" replace />} />
        <Route path="/my-reports" element={<Navigate to="/dashboard/my-reports" replace />} />

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
          <Route path="workers" element={<FieldWorkers />} />
          <Route path="beneficiaries" element={<Beneficiaries />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
