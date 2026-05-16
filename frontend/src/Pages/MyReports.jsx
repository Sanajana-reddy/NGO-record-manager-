import { useEffect, useState } from "react";
import { Table, Button, Group, ScrollArea, Title, Text } from "@mantine/core";
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
    fetchReports();
  }, []);

  return (
    <div style={{ padding: "30px" }}>
      <Title order={2}>My Reports</Title>

      <ScrollArea>
        <Table highlightOnHover verticalSpacing="md">
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Activity</Table.Th>
              <Table.Th>Region</Table.Th>
              <Table.Th>Beneficiaries</Table.Th>
              
              <Table.Th>Issues</Table.Th>
              <Table.Th>Description</Table.Th>
              <Table.Th>Actions</Table.Th>
            </Table.Tr>
          </Table.Thead>

          <Table.Tbody>
            {reports.map((report) => (
              <Table.Tr key={report._id}>
                <Table.Td>{report.activityType}</Table.Td>
                <Table.Td>{report.region}</Table.Td>
                <Table.Td>{report.beneficiariesCount}</Table.Td>
                
                <Table.Td>{report.issues}</Table.Td>
                <Table.Td>
                  <Text size="sm">{report.description}</Text>
                </Table.Td>
                <Table.Td>
                  <Group spacing="xs">
                    <Button
                      size="xs"
                      variant="outline"
                      onClick={async () => {
                        const newDesc = window.prompt("Edit description", report.description || "");
                        if (newDesc !== null) {
                          try {
                            await API.put(`/api/reports/${report._id}`, { description: newDesc });
                            fetchReports();
                          } catch (err) {
                            console.error(err);
                            alert("Failed to update report");
                          }
                        }
                      }}
                    >
                      Edit
                    </Button>

                    <Button
                      size="xs"
                      color="red"
                      variant="outline"
                      onClick={async () => {
                        if (window.confirm("Delete this report?")) {
                          try {
                            await API.delete(`/api/reports/${report._id}`);
                            fetchReports();
                          } catch (err) {
                            console.error(err);
                            alert("Failed to delete report");
                          }
                        }
                      }}
                    >
                      Delete
                    </Button>
                  </Group>
                </Table.Td>
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table>
      </ScrollArea>
    </div>
  );
};

export default MyReports;
