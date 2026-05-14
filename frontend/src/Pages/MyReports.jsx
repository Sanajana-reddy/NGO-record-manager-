import { useEffect, useState } from "react";
import axios from "axios";

const MyReports = () => {

  const [reports, setReports] = useState([]);

  const fetchReports = async () => {

    try {

      const token = localStorage.getItem("token");

      const res = await axios.get(
        "http://localhost:5000/api/reports",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setReports(res.data);

    } catch (error) {

      console.log(error);

    }
  };

  useEffect(() => {
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