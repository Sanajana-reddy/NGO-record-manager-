import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Card,
  Group,
  ScrollArea,
  SimpleGrid,
  Skeleton,
  Stack,
  Table,
  Text,
  Title,
} from "@mantine/core";
import API from "../Services/api";

const Dashboard = () => {
  const navigate = useNavigate();
  const [reports, setReports] = useState([]);
  const [loadingReports, setLoadingReports] = useState(true);

  const user = useMemo(() => {
    try {
      return JSON.parse(localStorage.getItem("user")) || {};
    } catch {
      return {};
    }
  }, []);

  const stats = useMemo(() => {
    const totalReports = reports.length;
    const latestRegion = reports[0]?.region || "No report submitted yet";

    return {
      totalReports,
      latestRegion,
    };
  }, [reports]);

  const recentReports = useMemo(() => reports.slice(0, 5), [reports]);

  const fetchReports = async () => {
    setLoadingReports(true);
    try {
      const response = await API.get("/api/reports");
      setReports(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error("Failed to load reports:", error);
      setReports([]);
    } finally {
      setLoadingReports(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  return (
    <Stack spacing="lg">
      <Card shadow="sm" padding="xl" radius="md" withBorder>
        <Text c="dimmed" size="sm" fw={700} tt="uppercase">
          Worker Dashboard
        </Text>
        <Title order={2} mt="xs">
          Welcome, {user?.name ? user.name.split(" ")[0] : "Team"}
        </Title>
        <Text c="dimmed" mt="xs">
          Use the sidebar to open your profile, submit reports, review reports, or add
          beneficiaries.
        </Text>
      </Card>

      <SimpleGrid cols={3} spacing="lg" breakpoints={[{ maxWidth: 900, cols: 1 }]}>
        <Card shadow="sm" padding="lg" radius="md" withBorder>
          <Text c="dimmed" size="sm" fw={700}>
            Total Reports
          </Text>
          <Text size="xl" fw={700} mt="md">
            {loadingReports ? <Skeleton width={70} height={28} radius="xl" /> : stats.totalReports}
          </Text>
        </Card>

        <Card shadow="sm" padding="lg" radius="md" withBorder>
          <Text c="dimmed" size="sm" fw={700}>
            Latest Region
          </Text>
          <Text size="xl" fw={700} mt="md">
            {loadingReports ? <Skeleton width={130} height={28} radius="xl" /> : stats.latestRegion}
          </Text>
        </Card>

        <Card shadow="sm" padding="lg" radius="md" withBorder>
          <Text c="dimmed" size="sm" fw={700}>
            Next Step
          </Text>
          <Button mt="md" onClick={() => navigate("/dashboard/submit-report")}>
            Submit Report
          </Button>
        </Card>
      </SimpleGrid>

      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <Group justify="space-between" align="flex-start" mb="md" wrap="wrap">
          <div>
            <Text c="dimmed" size="sm" fw={700}>
              Recent Reports
            </Text>
            <Title order={4} mt="xs">
              Your latest submissions
            </Title>
          </div>
          <Button size="sm" variant="outline" onClick={() => navigate("/dashboard/my-reports")}>
            View All
          </Button>
        </Group>

        <ScrollArea offsetScrollbars>
          <Table miw={760} verticalSpacing="md" highlightOnHover>
            <Table.Thead>
              <Table.Tr>
                <Table.Th style={{ width: "35%" }}>Activity</Table.Th>
                <Table.Th style={{ width: "25%" }}>Region</Table.Th>
                <Table.Th style={{ width: "20%", textAlign: "center" }}>Attendance</Table.Th>
                <Table.Th style={{ width: "20%", textAlign: "right" }}>Date</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {loadingReports ? (
                [...Array(5)].map((_, index) => (
                  <Table.Tr key={index}>
                    <Table.Td colSpan={4}>
                      <Skeleton height={24} radius="sm" />
                    </Table.Td>
                  </Table.Tr>
                ))
              ) : recentReports.length ? (
                recentReports.map((report) => (
                  <Table.Tr key={report._id}>
                    <Table.Td>
                      <Text fw={600}>{report.activityType || "N/A"}</Text>
                    </Table.Td>
                    <Table.Td>{report.region || "N/A"}</Table.Td>
                    <Table.Td style={{ textAlign: "center" }}>
                      {report.attendance != null ? `${report.attendance}%` : "-"}
                    </Table.Td>
                    <Table.Td style={{ textAlign: "right" }}>
                      {report.createdAt ? new Date(report.createdAt).toLocaleDateString() : "-"}
                    </Table.Td>
                  </Table.Tr>
                ))
              ) : (
                <Table.Tr>
                  <Table.Td colSpan={4}>
                    <Text c="dimmed">No reports have been submitted yet.</Text>
                  </Table.Td>
                </Table.Tr>
              )}
            </Table.Tbody>
          </Table>
        </ScrollArea>
      </Card>
    </Stack>
  );
};

export default Dashboard;
