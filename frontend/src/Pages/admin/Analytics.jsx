import { useEffect, useState } from "react";

import { Card, Text, Title } from "@mantine/core";
import { BarChart } from "@mantine/charts";

import API from "../../Services/api";

const Analytics = () => {
  const [regionData, setRegionData] = useState([]);

  const fetchReports = async () => {
    try {
      const response = await API.get("/api/admin/reports");
      const reports = Array.isArray(response.data) ? response.data : [];

      const dataByRegion = reports.reduce((acc, report) => {
        const region = report?.region || "Unknown";
        acc[region] = (acc[region] || 0) + 1;
        return acc;
      }, {});

      setRegionData(
        Object.entries(dataByRegion).map(([region, count]) => ({
          region,
          count,
        }))
      );
    } catch (error) {
      console.error("Failed to fetch analytics reports:", error);
      setRegionData([]);
    }
  };

  useEffect(() => {
    // Data is loaded from the backend once when this route mounts.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchReports();
  }, []);

  return (
    <Card
      shadow="sm"
      padding="lg"
      radius="md"
      withBorder
    >

      <Title order={3} mb={20}>
        Reports by Region
      </Title>

      <div
        style={{
          width: "100%",
          minHeight: "400px",
        }}
      >
        {regionData.length > 0 ? (
          <BarChart
            h={350}
            data={regionData}
            dataKey="region"
            series={[
              {
                name: "count",
                color: "blue",
              },
            ]}
          />
        ) : (
          <Text c="dimmed">No report data available yet.</Text>
        )}

      </div>

    </Card>
  );
};

export default Analytics;
