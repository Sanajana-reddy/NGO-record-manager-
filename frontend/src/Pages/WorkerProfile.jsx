import { useEffect, useState } from "react";
import {
  Avatar,
  Badge,
  Button,
  Card,
  Divider,
  Group,
  NumberInput,
  Select,
  SimpleGrid,
  Stack,
  Text,
  TextInput,
  Textarea,
  Title,
} from "@mantine/core";
import API from "../Services/api";

import { Paper} from "@mantine/core";

const getStoredUser = () => {
  try {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : {};
  } catch (error) {
    console.error("Invalid user data in localStorage:", error);
    return {};
  }
};

const getInitials = (name = "Worker") =>
  name
    .split(" ")
    .filter(Boolean)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

const WorkerProfile = () => {
  const [user, setUser] = useState(getStoredUser());
  const [formData, setFormData] = useState({
    phone: "",
    address: "",
    age: "",
    gender: "",
    primaryRegion: "",
  });
  const [saving, setSaving] = useState(false);
  const [attendanceDates, setAttendanceDates] = useState([]);

  const joinedDate = user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : "Automatic";

  const syncForm = (profile) => {
    setFormData({
      phone: profile?.phone || "",
      address: profile?.address || "",
      age: profile?.age || "",
      gender: profile?.gender || "",
      primaryRegion: profile?.primaryRegion || profile?.region || "",
    });
  };

  const fetchProfile = async () => {
    try {
      const response = await API.get("/api/auth/profile");
      setUser(response.data);
      syncForm(response.data);
      localStorage.setItem("user", JSON.stringify(response.data));
    } catch (error) {
      console.error("Failed to load profile:", error);
      syncForm(user);
    }
  };

  const fetchAttendanceDates = async () => {
    try {
      const res = await API.get("/api/reports/dates");
      // res.data is array of {date: 'YYYY-MM-DD', count}
      setAttendanceDates(res.data.map((d) => d.date));
    } catch (error) {
      console.error("Failed to load attendance dates", error);
      setAttendanceDates([]);
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
      const response = await API.put("/api/auth/profile", formData);
      setUser(response.data);
      syncForm(response.data);
      localStorage.setItem("user", JSON.stringify(response.data));
      alert("Profile updated");
    } catch (error) {
      console.error("Failed to update profile:", error);
      alert("Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

  useEffect(() => {
    fetchProfile();
    fetchAttendanceDates();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Stack spacing="lg">
      <div>
        <Title order={2}>Profile</Title>
        <Text c="dimmed" mt="xs">
          Complete your worker profile for field assignments.
        </Text>
      </div>

      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <Group justify="space-between" align="flex-start">
          <div>
            <Title order={3}>{user?.name || "Field Worker"}</Title>
            <Text c="dimmed" mt="xs">
              {user?.email || "No email provided"}
            </Text>
          </div>
          <Avatar color="blue" radius="xl" size="lg">
            {getInitials(user?.name)}
          </Avatar>
        </Group>

        <Divider my="md" />

        <SimpleGrid cols={3} spacing="md" breakpoints={[{ maxWidth: 900, cols: 1 }]}>
          <div>
            <Text c="dimmed" size="sm">
              Role
            </Text>
            <Badge color="blue" variant="light" mt={6}>
              {user?.role || "Field Worker"}
            </Badge>
          </div>
          <div>
            <Text c="dimmed" size="sm">
              Date Joined
            </Text>
            <Text fw={600} mt={4}>
              {joinedDate}
            </Text>
          </div>
          <div>
            <Text c="dimmed" size="sm">
              Email
            </Text>
            <Text fw={600} mt={4}>
              {user?.email || "No email provided"}
            </Text>
          </div>
        </SimpleGrid>
      </Card>

      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <Title order={4} mb="md">
          Complete Profile
        </Title>

        <form onSubmit={handleSubmit}>
          <SimpleGrid cols={2} spacing="md" breakpoints={[{ maxWidth: 700, cols: 1 }]}>
            <TextInput
              label="Phone Number"
              placeholder="Enter phone number"
              value={formData.phone}
              onChange={(event) => handleChange("phone", event.currentTarget.value)}
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
              label="Primary Region"
              placeholder="Enter primary region"
              value={formData.primaryRegion}
              onChange={(event) => handleChange("primaryRegion", event.currentTarget.value)}
            />

            <Textarea
              label="Address"
              placeholder="Enter full address"
              autosize
              minRows={3}
              value={formData.address}
              onChange={(event) => handleChange("address", event.currentTarget.value)}
              style={{ gridColumn: "1 / -1" }}
            />
          </SimpleGrid>

          <Group justify="flex-end" mt="lg">
            <Button type="submit" loading={saving}>
              Save Profile
            </Button>
          </Group>
        </form>
      </Card>

      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <Title order={4} mb="md">
          Attendance (last 30 days)
        </Title>

        <SimpleGrid cols={7} spacing="xs">
          {
            // build last 30 days
            Array.from({ length: 30 }).map((_, i) => {
              const day = new Date();
              day.setDate(day.getDate() - (29 - i));
              const key = day.toISOString().slice(0, 10);
              const attended = attendanceDates.includes(key);
              return (
                <Paper
                  key={key}
                  shadow="xs"
                  p="xs"
                  style={{
                    textAlign: "center",
                    background: attended ? "#4caf50" : "#f1f3f5",
                    color: attended ? "white" : "#333",
                    borderRadius: 6,
                  }}
                >
                  <div style={{ fontSize: 12 }}>{day.getDate()}</div>
                </Paper>
              );
            })
          }
        </SimpleGrid>
      </Card>
    </Stack>
  );
};

export default WorkerProfile;
