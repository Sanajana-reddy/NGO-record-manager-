import { useEffect, useState } from "react";
import {
  Button,
  Card,
  Group,
  NumberInput,
  ScrollArea,
  Select,
  SimpleGrid,
  Skeleton,
  Stack,
  Table,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import API from "../Services/api";

const initialForm = {
  name: "",
  age: "",
  gender: "",
  phone: "",
  region: "",
  village: "",
};

const WorkerBeneficiaries = () => {
  const [beneficiaries, setBeneficiaries] = useState([]);
  const [formData, setFormData] = useState(initialForm);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [search, setSearch] = useState("");

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

  const handleChange = (field, value) => {
    setFormData((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSaving(true);

    try {
      await API.post("/api/beneficiaries", formData);
      setFormData(initialForm);
      await fetchBeneficiaries();
      alert("Beneficiary added");
    } catch (error) {
      console.error("Failed to add beneficiary:", error);
      alert("Failed to add beneficiary");
    } finally {
      setSaving(false);
    }
  };

  useEffect(() => {
    fetchBeneficiaries();
  }, []);

  return (
    <Stack spacing="lg">
      <div>
        <Title order={2}>Beneficiaries</Title>
        <Text c="dimmed" mt="xs">
          Add beneficiaries and review the beneficiaries you registered.
        </Text>
      </div>

      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <Title order={4} mb="md">
          Add Beneficiary
        </Title>

        <form onSubmit={handleSubmit}>
          <SimpleGrid cols={2} spacing="md" breakpoints={[{ maxWidth: 700, cols: 1 }]}>
            <TextInput
              label="Full Name"
              placeholder="Enter beneficiary name"
              required
              value={formData.name}
              onChange={(event) => handleChange("name", event.currentTarget.value)}
            />

            <NumberInput
              label="Age"
              placeholder="Enter age"
              min={0}
              value={formData.age}
              onChange={(value) => handleChange("age", value || "")}
            />

            <Select
              label="Gender"
              placeholder="Select gender"
              data={["Female", "Male", "Other"]}
              value={formData.gender}
              onChange={(value) => handleChange("gender", value || "")}
            />

            <TextInput
              label="Phone Number"
              placeholder="Enter phone number"
              value={formData.phone}
              onChange={(event) => handleChange("phone", event.currentTarget.value)}
            />

            <TextInput
              label="Primary Region"
              placeholder="Enter region"
              value={formData.region}
              onChange={(event) => handleChange("region", event.currentTarget.value)}
            />

            <TextInput
              label="Village / Address"
              placeholder="Enter village or address"
              value={formData.village}
              onChange={(event) => handleChange("village", event.currentTarget.value)}
            />
          </SimpleGrid>

          <Group justify="flex-end" mt="lg">
            <Button type="submit" loading={saving}>
              Add Beneficiary
            </Button>
          </Group>
        </form>
      </Card>

      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <Group justify="space-between" align="flex-start" mb="md">
          <div>
            <Text c="dimmed" size="sm" fw={700}>
              My Beneficiaries
            </Text>
            <Title order={4} mt="xs">
              Recently added beneficiaries
            </Title>
          </div>
          <TextInput
            placeholder="Search by name or region"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            mb="md"
            style={{ maxWidth: 300 }}
          />
        </Group>

        <ScrollArea offsetScrollbars>
          <Table miw={760} verticalSpacing="md" highlightOnHover>
            <Table.Thead>
              <Table.Tr>
                <Table.Th>Name</Table.Th>
                <Table.Th>Age / Gender</Table.Th>
                <Table.Th>Region</Table.Th>
                <Table.Th>Phone</Table.Th>
                <Table.Th>Added On</Table.Th>
                <Table.Th>How helped</Table.Th>
                <Table.Th>Actions</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {loading ? (
                [...Array(4)].map((_, index) => (
                  <Table.Tr key={index}>
                    <Table.Td colSpan={5}>
                      <Skeleton height={24} radius="sm" />
                    </Table.Td>
                  </Table.Tr>
                ))
              ) : beneficiaries.length ? (
                beneficiaries
                  .filter((b) => {
                    const q = search.toLowerCase();
                    return (
                      b.name?.toLowerCase().includes(q) ||
                      b.region?.toLowerCase().includes(q)
                    );
                  })
                  .map((beneficiary) => (
                  <Table.Tr key={beneficiary._id}>
                    <Table.Td>
                      <Text fw={600}>{beneficiary.name || "Unnamed"}</Text>
                    </Table.Td>
                    <Table.Td>
                      {[beneficiary.age ? `${beneficiary.age}y` : "", beneficiary.gender]
                        .filter(Boolean)
                        .join(" / ") || "-"}
                    </Table.Td>
                    <Table.Td>
                      <Text>{beneficiary.region || "-"}</Text>
                      <Text size="sm" c="dimmed">
                        {beneficiary.village || ""}
                      </Text>
                    </Table.Td>
                    <Table.Td>{beneficiary.phone || "-"}</Table.Td>
                    <Table.Td>
                      {beneficiary.createdAt
                        ? new Date(beneficiary.createdAt).toLocaleDateString()
                        : "-"}
                    </Table.Td>
                    <Table.Td>{beneficiary.assistance || "-"}</Table.Td>
                    <Table.Td>
                      <Group spacing="xs">
                        <Button
                          size="xs"
                          variant="outline"
                          onClick={async () => {
                            const newAssistance = window.prompt(
                              "How did the NGO help this person?",
                              beneficiary.assistance || ""
                            );
                            if (newAssistance !== null) {
                              try {
                                await API.put(`/api/beneficiaries/${beneficiary._id}`, { assistance: newAssistance });
                                fetchBeneficiaries();
                              } catch (err) {
                                console.error(err);
                                alert("Failed to update");
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
                            if (window.confirm("Delete this beneficiary?")) {
                              try {
                                await API.delete(`/api/beneficiaries/${beneficiary._id}`);
                                fetchBeneficiaries();
                              } catch (err) {
                                console.error(err);
                                alert("Failed to delete");
                              }
                            }
                          }}
                        >
                          Delete
                        </Button>
                      </Group>
                    </Table.Td>
                  </Table.Tr>
                ))
              ) : (
                <Table.Tr>
                  <Table.Td colSpan={5}>
                    <Text c="dimmed">No beneficiaries added yet.</Text>
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

export default WorkerBeneficiaries;
