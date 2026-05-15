import { useEffect, useState } from "react";

import {
Card,
Text,
Title,
SimpleGrid,
} from "@mantine/core";

import API from "../../Services/api";

const AdminOverview = () => {

const [stats, setStats] =
useState({
  totalReports: 0,
  totalBeneficiaries: 0,
  totalAttendance: 0,
});

const fetchStats = async () => {


try {

  const response =
    await API.get(
      "/api/admin/stats"
    );

  setStats(response.data || {
    totalReports: 0,
    totalBeneficiaries: 0,
    totalAttendance: 0,
  });

} catch (error) {

  console.error("Failed to fetch admin stats:", error);

}


};

useEffect(() => {


// Data is loaded from the backend once when this route mounts.
// eslint-disable-next-line react-hooks/set-state-in-effect
fetchStats();


}, []);

return (


<div>

  <Title order={1} mb={30}>
    Admin Overview
  </Title>

  <SimpleGrid cols={3}>

    <Card
      shadow="sm"
      padding="lg"
      radius="md"
      withBorder
    >

      <Title order={4}>
        Total Reports
      </Title>

      <Text size="xl" fw={700}>
        {stats?.totalReports}
      </Text>

    </Card>

    <Card
      shadow="sm"
      padding="lg"
      radius="md"
      withBorder
    >

      <Title order={4}>
        Total Beneficiaries
      </Title>

      <Text size="xl" fw={700}>
        {stats?.totalBeneficiaries}
      </Text>

    </Card>

    <Card
      shadow="sm"
      padding="lg"
      radius="md"
      withBorder
    >

      <Title order={4}>
        Total Attendance
      </Title>

      <Text size="xl" fw={700}>
        {stats?.totalAttendance}
      </Text>

    </Card>

  </SimpleGrid>

</div>


);
};

export default AdminOverview;
