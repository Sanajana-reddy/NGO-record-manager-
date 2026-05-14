import { useState } from "react";
import axios from "axios";

const SubmitReport = () => {

  const [formData, setFormData] = useState({
    activityType: "",
    region: "",
    beneficiariesCount: "",
    issues: "",
    description: "",
    attendance: "",
  });

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const token = localStorage.getItem("token");

      const res = await axios.post(
        "http://localhost:5000/api/reports",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Report Submitted");

      console.log(res.data);

    } catch (error) {

      console.log(error);

    }
  };

  return (
    <div style={{ padding: "30px" }}>

      <h1>Submit NGO Report</h1>

      <form onSubmit={handleSubmit}>

        <input
          type="text"
          name="activityType"
          placeholder="Activity Type"
          onChange={handleChange}
        />

        <br /><br />

        <input
          type="text"
          name="region"
          placeholder="Region"
          onChange={handleChange}
        />

        <br /><br />

        <input
          type="number"
          name="beneficiariesCount"
          placeholder="Beneficiaries Count"
          onChange={handleChange}
        />

        <br /><br />

        <input
          type="number"
          name="attendance"
          placeholder="Attendance"
          onChange={handleChange}
        />

        <br /><br />

        <textarea
          name="issues"
          placeholder="Issues"
          onChange={handleChange}
        />

        <br /><br />

        <textarea
          name="description"
          placeholder="Description"
          onChange={handleChange}
        />

        <br /><br />

        <button type="submit">
          Submit Report
        </button>

      </form>

    </div>
  );
};

export default SubmitReport;