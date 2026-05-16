import { useEffect, useState } from "react";
import { Card, ScrollArea, Skeleton, Stack, Table, Text, Title } from "@mantine/core";
import API from "../Services/api";

const AssignedBeneficiaries = () => {
  const [beneficiaries, setBeneficiaries] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBeneficiaries = async () => {
    setLoading(true);
    try {
      const response = await API.get("/api/beneficiaries");
      setBeneficiaries(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error("Failed to load beneficiaries:", error);
      setBeneficiaries([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBeneficiaries();
  }, []);

  return (
    <Stack spacing="lg">
      <div>
        <Title order={2}>Assigned Beneficiaries</Title>
        <Text c="dimmed" mt="xs">
          Beneficiaries currently available for your field work.
        </Text>
      </div>

      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <ScrollArea offsetScrollbars>
          <Table verticalSpacing="md" highlightOnHover>
            <thead>
              <tr>
                <th>Name</th>
                <th>Region</th>
                <th>Phone</th>
                <th>Registered</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                [...Array(4)].map((_, index) => (
                  <tr key={index}>
                    <td colSpan={4}>
                      <Skeleton height={24} radius="sm" />
                    </td>
                  </tr>
                ))
              ) : beneficiaries.length ? (
                beneficiaries.map((beneficiary) => (
                  <tr key={beneficiary._id}>
                    <td>
                      <Text fw={600}>{beneficiary.name || "Unnamed"}</Text>
                    </td>
                    <td>{beneficiary.region || "Unknown"}</td>
                    <td>{beneficiary.phone || "-"}</td>
                    <td>
                      {beneficiary.createdAt
                        ? new Date(beneficiary.createdAt).toLocaleDateString()
                        : "-"}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4}>
                    <Text c="dimmed">No assigned beneficiaries are available yet.</Text>
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </ScrollArea>
      </Card>
    </Stack>
  );
};

export default AssignedBeneficiaries;
