import { useEffect, useState } from "react";

import { Card, Text, Title } from "@mantine/core";

import API from "../../Services/api";

const AISummary = () => {
  const [reports, setReports] = useState([]);

  const fetchReports = async () => {
    try {
      const response = await API.get("/api/admin/reports");
      setReports(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error("Failed to fetch reports for AI summary:", error);
      setReports([]);
    }
  };

  useEffect(() => {
    // Data is loaded from the backend once when this route mounts.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchReports();
  }, []);

  const totalReports = reports.length;

  const totalBeneficiaries =
    reports.reduce(
      (sum, report) =>
        sum + (Number(report?.beneficiariesCount) || 0),
      0
    );

  const aiSummary = `
${totalReports} reports submitted.

${totalBeneficiaries} beneficiaries reached.
`;

  return (
    <Card
      shadow="sm"
      padding="lg"
      radius="md"
      withBorder
    >

      <Title order={3} mb={20}>
        AI Summary
      </Title>

      <Text style={{ whiteSpace: "pre-line" }}>
        {aiSummary}
      </Text>

    </Card>
  );
};

export default AISummary;
