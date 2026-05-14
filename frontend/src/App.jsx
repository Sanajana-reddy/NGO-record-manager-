import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import SubmitReport from "./pages/SubmitReport";
import MyReports from "./pages/MyReports";

function App() {
  return (
    <BrowserRouter>

      <Routes>

        <Route path="/" element={<Login />} />

        <Route
          path="/dashboard"
          element={<Dashboard />}
        />
        <Route path="/submit-report" element={<SubmitReport />}/>
        <Route path="/my-reports" element={<MyReports />} />

      </Routes>

    </BrowserRouter>
  );
}

export default App;