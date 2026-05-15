import { useEffect, useState } from "react";
import API from "../Services/api";

const MyReports = () => {

  const [reports, setReports] = useState([]);

  const fetchReports = async () => {

    try {

      const res = await API.get("/api/reports");

      setReports(res.data);

    } catch (error) {

      console.log(error);

    }
  };

  useEffect(() => {
    // Data is loaded from the backend once when this route mounts.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchReports();
  }, []);

  return (
    <div style={{ padding: "30px" }}>

      <h1>My Reports</h1>

      {
        reports.map((report) => (

          <div
            key={report._id}
            style={{
              border: "1px solid gray",
              padding: "15px",
              marginBottom: "15px",
            }}
          >

            <h3>{report.activityType}</h3>

            <p>Region: {report.region}</p>

            <p>
              Beneficiaries:
              {report.beneficiariesCount}
            </p>

            <p>Attendance: {report.attendance}</p>

            <p>Issues: {report.issues}</p>

            <p>Description: {report.description}</p>

          </div>
        ))
      }

    </div>
  );
};

export default MyReports;
